/**
 * Servidor Legal-Tech Multi-Tenant - Poder Judicial del Chaco
 * Creado sin dependencias externas (utiliza únicamente módulos nativos de Node.js: http, fs, path, child_process)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { getStorage, getTenantsList, getTenantMeta } = require('./lib/storage');
const { getTenantAuthStatus, connectTenantSubscription } = require('./lib/cliBridge');
const { analyzeLegalCase } = require('./lib/copilot');
const { generateAceptaDepositoEscrito, generateImpulsoProcesalEscrito } = require('./lib/templates');
const { calculateBusinessDaysDeadline, checkPeremptionWatchdog } = require('./lib/deadlines');

const PORT = process.env.PORT || 3456;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.doc': 'application/msword',
  '.pdf': 'application/pdf'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-User-Role'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // Límite de 2MB
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res, filePath) {
  const safePath = path.normalize(filePath);
  if (!safePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Acceso denegado');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback a index.html para navegación SPA
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404);
          return res.end('Archivo no encontrado');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(safePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  // Manejo de preflight CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-User-Role'
    });
    return res.end();
  }

  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  // 1. Endpoints de Salud y Verificación
  if (pathname === '/api/health' && method === 'GET') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'Estudio Jurídico Chaco - Sistema de Gestión Procesal e IA Copilot',
      port: PORT,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }

  // 2. Tenants
  if (pathname === '/api/tenants' && method === 'GET') {
    const list = getTenantsList().map(t => {
      const storage = getStorage(t.id);
      const causes = storage.getCauses();
      const notifs = storage.getNotifications();
      return {
        ...t,
        stats: {
          totalCauses: causes.length,
          unreadNotifications: notifs.filter(n => !n.leido).length,
          urgentDeadlines: causes.filter(c => c.plazo && c.plazo.isCritical).length,
          peremptionAlerts: causes.filter(c => c.watchdogCaducidad && c.watchdogCaducidad.statusLevel !== 'NORMAL').length
        }
      };
    });
    return sendJson(res, 200, list);
  }

  // Router de endpoints para un tenant específico
  const tenantMatch = pathname.match(/^\/api\/tenants\/([a-zA-Z0-9_-]+)(.*)/);
  if (tenantMatch) {
    const tenantId = tenantMatch[1];
    const subPath = tenantMatch[2] || '';
    const storage = getStorage(tenantId);
    const tenantMeta = getTenantMeta(tenantId);

    // GET /api/tenants/:tenantId
    if (subPath === '' && method === 'GET') {
      const auth = await getTenantAuthStatus(tenantId);
      return sendJson(res, 200, {
        tenant: tenantMeta,
        authStatus: auth
      });
    }

    // GET /api/tenants/:tenantId/auth-status
    if (subPath === '/auth-status' && method === 'GET') {
      const auth = await getTenantAuthStatus(tenantId);
      return sendJson(res, 200, auth);
    }

    // POST /api/tenants/:tenantId/connect-subscription
    if (subPath === '/connect-subscription' && method === 'POST') {
      const body = await parseBody(req);
      const result = connectTenantSubscription(tenantId, body);
      storage.logAuditEvent({
        user: body.user || 'Abogado Titular',
        role: body.role || 'ADMIN',
        action: 'SUBSCRIPTION_BRIDGE_CHANGE',
        details: `Acción de suscripción: ${body.action || 'toggle_demo'}. Estado: ${result.message}`
      });
      return sendJson(res, 200, result);
    }

    // GET /api/tenants/:tenantId/causes
    if (subPath === '/causes' && method === 'GET') {
      const causes = storage.getCauses();
      return sendJson(res, 200, causes);
    }

    // POST /api/tenants/:tenantId/causes
    if (subPath === '/causes' && method === 'POST') {
      const body = await parseBody(req);
      const newCause = {
        id: `causa-${Date.now()}`,
        expteNo: body.expteNo || `${Math.floor(1000 + Math.random() * 9000)}/26`,
        caratula: body.caratula || 'NUEVA CAUSA JUDICIAL',
        juzgado: body.juzgado || 'Juzgado Civil y Comercial N° 1 - Resistencia',
        fuero: body.fuero || 'Civil y Comercial',
        cliente: body.cliente || 'Cliente General',
        clienteDoc: body.clienteDoc || 'DNI S/N',
        tipoTramite: body.tipoTramite || 'COMPLEJO',
        estadoProcesal: body.estadoProcesal || 'Iniciada / En trámite',
        fechaUltimoMovimiento: new Date().toISOString().split('T')[0],
        inactividadDias: 0,
        subcausas: [],
        proveidoTexto: body.proveidoTexto || 'Sin proveído cargado',
        plazo: body.plazoDias ? calculateBusinessDaysDeadline(new Date().toISOString().split('T')[0], body.plazoDias) : null,
        watchdogCaducidad: checkPeremptionWatchdog(new Date().toISOString().split('T')[0], 90),
        borradoresGenerados: []
      };
      storage.saveCause(newCause);
      storage.logAuditEvent({
        user: body.user || 'Abogado Titular',
        role: body.role || 'ADMIN',
        action: 'CREATE_CAUSE',
        details: `Se dio de alta el Expte. ${newCause.expteNo} - "${newCause.caratula}"`
      });
      return sendJson(res, 201, newCause);
    }

    // GET /api/tenants/:tenantId/causes/:causeId
    const singleCauseMatch = subPath.match(/^\/causes\/([a-zA-Z0-9_-]+)$/);
    if (singleCauseMatch && method === 'GET') {
      const causeId = singleCauseMatch[1];
      const cause = storage.getCause(causeId);
      if (!cause) return sendJson(res, 404, { error: 'Causa no encontrada' });
      return sendJson(res, 200, cause);
    }

    // POST /api/tenants/:tenantId/causes/:causeId/subcauses
    const addSubcauseMatch = subPath.match(/^\/causes\/([a-zA-Z0-9_-]+)\/subcauses$/);
    if (addSubcauseMatch && method === 'POST') {
      const causeId = addSubcauseMatch[1];
      const body = await parseBody(req);
      const sub = storage.addSubcause(causeId, {
        titulo: body.titulo || 'Incidente Procesal',
        caratula: body.caratula || 'Incidente en autos principales',
        juzgado: body.juzgado,
        estado: body.estado || 'En trámite'
      });
      if (!sub) return sendJson(res, 404, { error: 'Causa principal no encontrada' });

      storage.logAuditEvent({
        user: body.user || 'Abogado Titular',
        role: body.role || 'ADMIN',
        action: 'ADD_SUBCAUSE',
        details: `Se vinculó sub-causa / incidente "${sub.titulo}" a la causa principal ${causeId}`
      });
      return sendJson(res, 201, sub);
    }

    // POST /api/tenants/:tenantId/causes/:causeId/generate-deterministic-draft
    const genDraftMatch = subPath.match(/^\/causes\/([a-zA-Z0-9_-]+)\/generate-deterministic-draft$/);
    if (genDraftMatch && method === 'POST') {
      const causeId = genDraftMatch[1];
      const body = await parseBody(req);
      const cause = storage.getCause(causeId);
      if (!cause) return sendJson(res, 404, { error: 'Causa no encontrada' });

      const doc = generateAceptaDepositoEscrito({
        expteNo: cause.expteNo,
        caratula: cause.caratula,
        juzgado: cause.juzgado,
        clienteNombre: cause.cliente,
        clienteDni: cause.clienteDoc,
        monto: cause.montoDepositado || body.monto || 1850000,
        bancoNombre: tenantMeta.bancoDefault,
        cbu: tenantMeta.cbuDefault,
        aliasCbu: tenantMeta.aliasDefault,
        cuitCliente: cause.clienteCuit,
        abogadoNombre: tenantMeta.titular,
        abogadoMatricula: tenantMeta.matricula,
        abogadoCuit: tenantMeta.cuit,
        domicilioProcesal: tenantMeta.domicilio,
        casilleroElectronico: tenantMeta.email
      });

      // Guardar en el historial de la causa
      if (!cause.borradoresGenerados) cause.borradoresGenerados = [];
      const draftRecord = {
        id: `draft-${Date.now()}`,
        titulo: doc.titulo,
        tipo: 'DETERMINISTICO',
        fechaGeneracion: new Date().toISOString(),
        costo: '$0.00',
        estado: 'LISTO_PARA_AUDITAR',
        texto: doc.plainText,
        html: doc.printableHtml,
        filename: doc.filename
      };
      cause.borradoresGenerados.unshift(draftRecord);
      storage.saveCause(cause);

      storage.logAuditEvent({
        user: body.user || 'Abogado Titular',
        role: body.role || 'ADMIN',
        action: 'GENERATE_DETERMINISTIC_DRAFT',
        details: `Generado escrito automático determinístico ($0 costo) de aceptación de depósito para ${cause.expteNo}`
      });

      return sendJson(res, 200, {
        success: true,
        draft: draftRecord,
        downloadUrl: `/api/tenants/${tenantId}/download-draft/${draftRecord.id}`
      });
    }

    // POST /api/tenants/:tenantId/analyze
    if (subPath === '/analyze' && method === 'POST') {
      const body = await parseBody(req);
      const cause = body.causeId ? storage.getCause(body.causeId) : {
        expteNo: body.expteNo || '8.310/24',
        caratula: body.caratula || 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S/ DESPIDO',
        juzgado: body.juzgado || 'Juzgado del Trabajo N° 1',
        fuero: body.fuero || 'Laboral',
        cliente: body.cliente || 'Gómez, María Elena'
      };

      const result = await analyzeLegalCase({
        tenantId,
        cause,
        proveidoText: body.proveidoText || cause.proveidoTexto,
        userPrompt: body.prompt || ''
      });

      // Si hay una causa real, asociar el borrador generado
      if (body.causeId && cause.id) {
        if (!cause.borradoresGenerados) cause.borradoresGenerados = [];
        cause.borradoresGenerados.unshift({
          id: `draft-${Date.now()}`,
          titulo: 'BORRADOR COPILOTO IA - IMPUGNACIÓN / CONTESTACIÓN',
          tipo: result.source === 'cli_subscription' ? 'CLAUDE_CLI_SUBSCRIPTION' : 'COPILOTO_IA_LOCAL',
          fechaGeneracion: new Date().toISOString(),
          costo: result.source === 'cli_subscription' ? '$0.00 (Incluido en Suscripción CLI)' : '$0.00 (Simulador Offline)',
          estado: 'PENDIENTE_AUDITORIA_HUMANA',
          texto: result.borradorEscrito,
          diagnostico: result.diagnostico,
          estrategia: result.estrategia,
          plazoEstimado: result.plazoEstimado
        });
        storage.saveCause(cause);
      }

      storage.logAuditEvent({
        user: body.user || 'Abogado Titular',
        role: body.role || 'ADMIN',
        action: 'RUN_AI_COPILOT',
        details: `Análisis procesal con Copiloto IA (Origen: ${result.sourceBadge}) para Expte. ${cause.expteNo}`
      });

      return sendJson(res, 200, result);
    }

    // POST /api/tenants/:tenantId/audit-action
    // Control de roles, auditoría humana y protección de patrimonio intelectual
    if (subPath === '/audit-action' && method === 'POST') {
      const body = await parseBody(req);
      const { user = 'Usuario', role = 'GUEST', action, causeId, draftId, draftText } = body;

      // 1. Protección de Patrimonio Intelectual (Respuesta 8 de la entrevista)
      // Si el rol es INVITADO / SECRETARIO e intenta exportar masivamente la biblioteca de modelos
      if (role === 'GUEST' && (action === 'MASS_EXPORT_TEMPLATES' || action === 'DELETE_TEMPLATE' || action === 'DELETE_CAUSE')) {
        storage.logAuditEvent({
          user,
          role,
          action: 'SECURITY_BLOCK_IP_PROTECTION',
          details: `BLOQUEADO: Intento de ${action} no autorizado por usuario con perfil Invitado. Se protegió el patrimonio intelectual del titular.`
        });

        return sendJson(res, 403, {
          error: 'Acceso Denegado: Su rol de Invitado / Secretario no tiene autorización para exportar o alterar el patrimonio intelectual (modelos de escritos y causas reservadas). Este evento ha sido notificado al Titular en el registro de auditoría.',
          blocked: true,
          reason: 'PROTECCION_PATRIMONIO_INTELECTUAL'
        });
      }

      // 2. Flujo de Auditoría Humana y Aprobación
      if (action === 'APPROVE_DRAFT') {
        const cause = storage.getCause(causeId);
        if (cause && cause.borradoresGenerados) {
          const draft = cause.borradoresGenerados.find(d => d.id === draftId) || cause.borradoresGenerados[0];
          if (draft) {
            if (role === 'ADMIN') {
              draft.estado = 'APROBADO_PARA_PRESENTACION_JUDICIAL';
              draft.aprobadoPor = `${tenantMeta.titular} (${tenantMeta.matricula})`;
              draft.fechaAprobacion = new Date().toISOString();
              draft.texto = draftText || draft.texto;
            } else {
              draft.estado = 'REVISADO_POR_SECRETARIO_PENDIENTE_VISADO_TITULAR';
              draft.revisadoPor = `${user} (Rol: Invitado / Secretario)`;
              draft.fechaRevision = new Date().toISOString();
              draft.texto = draftText || draftText;
            }
            storage.saveCause(cause);
          }
        }

        storage.logAuditEvent({
          user,
          role,
          action: role === 'ADMIN' ? 'APPROVE_DRAFT_FINAL' : 'DRAFT_REVIEW_SECRETARY',
          details: role === 'ADMIN' 
            ? `Escrito APROBADO formalmente para su presentación judicial en Expte. ${causeId}. Firmado por ${tenantMeta.titular}`
            : `Escrito revisado por Secretario/Invitado. Queda en estado PENDIENTE DE VISADO por el Titular para proteger la responsabilidad profesional.`
        });

        return sendJson(res, 200, {
          success: true,
          status: role === 'ADMIN' ? 'APROBADO' : 'PENDIENTE_TITULAR',
          message: role === 'ADMIN' 
            ? '¡Escrito auditado y visado con éxito! Listo para firma digital e ingreso en INDI/IURIX.' 
            : 'Escrito revisado y guardado. Por protocolo de seguridad, requiere visado del Abogado Titular antes de su presentación.'
        });
      }

      // Guardar edición de borrador
      if (action === 'SAVE_EDITED_DRAFT') {
        const cause = storage.getCause(causeId);
        if (cause && cause.borradoresGenerados) {
          const draft = cause.borradoresGenerados.find(d => d.id === draftId) || cause.borradoresGenerados[0];
          if (draft) {
            draft.texto = draftText;
            draft.ultimaModificacion = new Date().toISOString();
            draft.modificadoPor = `${user} (${role})`;
            storage.saveCause(cause);
          }
        }

        storage.logAuditEvent({
          user,
          role,
          action: 'EDIT_DRAFT',
          details: `Modificación del borrador judicial en Expte. ${causeId}`
        });

        return sendJson(res, 200, { success: true, message: 'Cambios guardados en el borrador judicial.' });
      }

      return sendJson(res, 400, { error: 'Acción de auditoría no reconocida' });
    }

    // GET /api/tenants/:tenantId/audit-log
    if (subPath === '/audit-log' && method === 'GET') {
      const logs = storage.getAuditLog();
      return sendJson(res, 200, logs);
    }

    // GET /api/tenants/:tenantId/notifications
    if (subPath === '/notifications' && method === 'GET') {
      const notifs = storage.getNotifications();
      return sendJson(res, 200, notifs);
    }

    // POST /api/tenants/:tenantId/notifications/:id/read
    const markReadMatch = subPath.match(/^\/notifications\/([a-zA-Z0-9_-]+)\/read$/);
    if (markReadMatch && method === 'POST') {
      const notifId = markReadMatch[1];
      const item = storage.markNotificationRead(notifId);
      return sendJson(res, 200, { success: true, item });
    }

    // POST /api/tenants/:tenantId/simulate-dispatch (Simular llegada de correo Gmail)
    if (subPath === '/simulate-dispatch' && method === 'POST') {
      const body = await parseBody(req);
      const simulatedExpte = `${Math.floor(19000 + Math.random() * 900)}/26`;
      const today = new Date().toISOString().split('T')[0];
      const nowTime = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

      const newNotif = {
        id: `notif-${Date.now()}`,
        origen: 'Poder Judicial del Chaco (Notificación Automática Gmail)',
        remitente: 'notificaciones-iurix@justiciachaco.gov.ar',
        asunto: `PJ Chaco - Causa Salió a Despacho - Expte. ${simulatedExpte}`,
        fecha: `${today} ${nowTime} hs`,
        expteNo: simulatedExpte,
        caratula: 'SILVA ESTEBAN C/ EDIFICIOS CHACO S.A. S/ ACCIÓN INDEMNIZATORIA',
        juzgado: 'Juzgado Civil y Comercial N° 2 - Resistencia',
        resumen: 'Salió a despacho proveído: Traslado de documental agregada por 5 días hábiles.',
        leido: false,
        tipoTramite: 'COMPLEJO',
        causaId: `causa-${simulatedExpte.replace('/', '-')}`
      };

      // Inyectar en causas también
      const newCause = {
        id: newNotif.causaId,
        expteNo: simulatedExpte,
        caratula: newNotif.caratula,
        juzgado: newNotif.juzgado,
        fuero: 'Civil y Comercial',
        cliente: 'Silva, Esteban Marcos (DNI 31.092.114)',
        clienteDoc: 'DNI 31.092.114',
        clienteCuit: '20-31092114-1',
        tipoTramite: 'COMPLEJO',
        estadoProcesal: 'Salió a despacho - Traslado de documental (5 días)',
        fechaUltimoMovimiento: today,
        inactividadDias: 0,
        subcausas: [],
        proveidoTexto: `Resistencia, ${today}. Téngase por recibida la documental arrimada por la parte demandada. De la misma, córrase traslado a la parte actora por el término de CINCO (5) DÍAS HÁBILES bajo apercibimiento de ley. Notifíquese por cédula electrónica. - Fdo. Dra. Claudia Morales (Jueza)`.trim(),
        plazo: calculateBusinessDaysDeadline(today, 5),
        watchdogCaducidad: checkPeremptionWatchdog(today, 90),
        borradoresGenerados: [],
        readyAction: 'COPILOTO_ANALISIS_IMPUGNACION'
      };

      storage.addNotification(newNotif);
      storage.saveCause(newCause);

      storage.logAuditEvent({
        user: body.user || 'Robot Gmail Ingest / IURIX Chaco',
        role: 'SYSTEM',
        action: 'SIMULATED_DISPATCH_RECEIVED',
        details: `Simulación de correo recibido: Causa ${simulatedExpte} salió a despacho. Se generó vinculación de expediente y cálculo automático de vencimiento hábil.`
      });

      return sendJson(res, 201, {
        success: true,
        notification: newNotif,
        cause: newCause
      });
    }

    // GET /api/tenants/:tenantId/prescriptions
    if (subPath === '/prescriptions' && method === 'GET') {
      const prescs = storage.getPrescriptions();
      return sendJson(res, 200, prescs);
    }

    // POST /api/tenants/:tenantId/reset
    if (subPath === '/reset' && method === 'POST') {
      storage.reset();
      return sendJson(res, 200, { success: true, message: 'Datos del estudio reiniciados.' });
    }
  }

  // 3. Servir archivos estáticos de /public
  if (method === 'GET') {
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    return serveStatic(req, res, filePath);
  }

  // 404 por defecto
  sendJson(res, 404, { error: 'Ruta no encontrada' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[LegalTech Chaco Server] Escuchando en http://0.0.0.0:${PORT}`);
  console.log(`[Architecture] Zero-dependencies pure Node.js HTTP server active`);
});

// Manejo de señales para apagado limpio
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
