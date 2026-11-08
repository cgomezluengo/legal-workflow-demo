/**
 * Aplicación de Gestión Procesal y Copiloto Legal - Chaco
 * Funciona de modo híbrido:
 * 1. Conectado al backend Node.js (`/api/...`) en entorno local o VPS.
 * 2. 100% Standalone en GitHub Pages (`*.github.io` o sin backend), con motor procesal
 *    y persistencia completa en localStorage sin llamadas rotas.
 */

// ============================================================================
// MOTOR DE NEGOCIO CLIENT-SIDE (STANDALONE / GITHUB PAGES FALLBACK)
// ============================================================================
const STANDALONE_ENGINE = {
  isStandalone: false,

  tenants: {
    estudio_chaco_central: {
      tenant: {
        id: 'estudio_chaco_central',
        name: 'Estudio Jurídico Dr. Gómez (Chaco)',
        titular: 'Dr. Marcelo Gómez',
        matricula: 'M.P. N° 4582 STJ Chaco - F° 124 T° V',
        cuit: '20-28945612-7',
        domicilio: 'Av. 9 de Julio 345, Piso 4, Of. B, Resistencia, Chaco',
        email: 'dr.gomez@estudiochaco.com.ar',
        telefono: '+54 362 443-8900',
        bancoDefault: 'Nuevo Banco del Chaco S.A.',
        cbuDefault: '3110030200000123456789',
        aliasDefault: 'GOMEZ.ABOGADO.CHACO',
        specialty: 'Derecho Civil, Comercial, Daños y Sucesiones'
      },
      authStatus: {
        loggedIn: true,
        isLiveCli: false,
        isDemoConnected: true,
        mode: 'demo_bridge',
        subscriptionDetails: {
          plan: 'Claude Pro Legal Copilot ($20/mes suscripción)',
          accountEmail: 'dr.gomez@estudiochaco.com.ar'
        }
      }
    },
    estudio_resistencia_asoc: {
      tenant: {
        id: 'estudio_resistencia_asoc',
        name: 'Asociados Resistencia & Cía',
        titular: 'Dra. Sofía Almirón',
        matricula: 'M.P. N° 5120 STJ Chaco - F° 89 T° VI',
        cuit: '30-71458921-9',
        domicilio: 'Hipólito Yrigoyen 520, Resistencia, Chaco',
        email: 'asociados@resistencia-legal.com.ar',
        telefono: '+54 362 445-1212',
        bancoDefault: 'Nuevo Banco del Chaco S.A.',
        cbuDefault: '3110011500000987654321',
        aliasDefault: 'ASOC.RESISTENCIA.LEGAL',
        specialty: 'Derecho Laboral, ART, Despidos y Empresas'
      },
      authStatus: {
        loggedIn: false,
        isLiveCli: false,
        isDemoConnected: false,
        mode: 'unauthenticated'
      }
    }
  },

  getInitialCauses() {
    const today = new Date().toISOString().split('T')[0];
    const dateLaboral = new Date();
    dateLaboral.setDate(dateLaboral.getDate() - 2);
    const dateLaboralStr = dateLaboral.toISOString().split('T')[0];

    const dateCaducidad = new Date();
    dateCaducidad.setDate(dateCaducidad.getDate() - 78);
    const dateCaducidadStr = dateCaducidad.toISOString().split('T')[0];

    return [
      {
        id: 'causa-14820-25',
        expteNo: '14.820/25',
        caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S.A. S/ DAÑOS Y PERJUICIOS',
        juzgado: 'Juzgado Civil y Comercial N° 3 - Resistencia',
        fuero: 'Civil y Comercial',
        cliente: 'Pérez, Juan Carlos',
        clienteDoc: 'DNI 24.112.980',
        clienteCuit: '20-24112980-4',
        tipoTramite: 'SIMPLE',
        estadoProcesal: 'Salió a despacho - Depósito Judicial disponible',
        montoDepositado: 1850000,
        fechaUltimoMovimiento: today,
        inactividadDias: 0,
        subcausas: [],
        proveidoTexto: `Resistencia, ${today}. Téngase por acreditado en autos el depósito judicial efectuado por la citada en garantía SEGUROS DEL NORTE S.A. en la cuenta judicial a la orden de este Tribunal en el Nuevo Banco del Chaco S.A., por la suma de PESOS UN MILLÓN OCHOCIENTOS CINCUENTA MIL ($1.850.000,00). Del mismo, córrase traslado a la actora por el término de ley y manifieste sobre la dación en pago y denuncie cuenta bancaria y CBU a sus efectos. Notifíquese por cédula electrónica. - Fdo. Dra. Elena Ruiz (Jueza Civil y Comercial N° 3)`.trim(),
        plazo: {
          remainingBusinessDays: 5,
          expirationDate: '2026-11-13',
          gracePeriodDate: '2026-11-16 09:00 hs (Plazo de Gracia)',
          isCritical: false
        },
        watchdogCaducidad: {
          inactiveDays: 0,
          limitDays: 90,
          percentageConsumed: 0,
          statusLevel: 'NORMAL',
          statusMessage: 'En término procesal (0 días de inactividad)'
        },
        borradoresGenerados: []
      },
      {
        id: 'causa-8310-24',
        expteNo: '8.310/24',
        caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO INCAUSADO',
        juzgado: 'Juzgado del Trabajo N° 1 - Resistencia',
        fuero: 'Laboral',
        cliente: 'Gómez, María Elena',
        clienteDoc: 'DNI 28.445.892',
        clienteCuit: '27-28445892-3',
        tipoTramite: 'COMPLEJO',
        estadoProcesal: 'Salió a despacho - Traslado de liquidación e impugnación de pericia',
        fechaUltimoMovimiento: dateLaboralStr,
        inactividadDias: 2,
        subcausas: [
          {
            id: 'sub-8310-1',
            titulo: 'Incidente de Medida Cautelar de Embargo Preventivo',
            caratula: 'GOMEZ MARIA S/ MEDIDA CAUTELAR S/ CONSTRUCTORA LITORAL S.R.L.',
            juzgado: 'Juzgado del Trabajo N° 1',
            estado: 'Embargo trabado y efectivizado sobre cuenta corriente bancaria por $3.500.000',
            fecha: '2026-08-14'
          }
        ],
        proveidoTexto: `Resistencia, ${dateLaboralStr}. Agréguese la pericia contable presentada por el Perito Contador Oficial CP. Jorge Valenzuela. Del informe pericial practicado y la liquidación de rubros indemnizatorios por distracto laboral incausado (arts. 232, 233, 245 de la LCT N° 20.744), córrase traslado a las partes por el término perentorio de CINCO (5) DÍAS HÁBILES bajo apercibimiento de ley. Notifíquese conforme Acordada STJ Chaco N° 3145. - Fdo. Dr. Raúl Benítez (Juez Laboral)`.trim(),
        plazo: {
          remainingBusinessDays: 3,
          expirationDate: '2026-11-11',
          gracePeriodDate: '2026-11-12 09:00 hs (Plazo de Gracia)',
          isCritical: true
        },
        watchdogCaducidad: {
          inactiveDays: 2,
          limitDays: 90,
          percentageConsumed: 2,
          statusLevel: 'NORMAL',
          statusMessage: 'En término procesal (2 días de inactividad)'
        },
        borradoresGenerados: []
      },
      {
        id: 'causa-3105-23',
        expteNo: '3.105/23',
        caratula: 'BANCO DEL CHACO S.A. C/ RODRIGUEZ LUIS S/ JUICIO EJECUTIVO',
        juzgado: 'Juzgado Civil y Comercial N° 6 - Resistencia',
        fuero: 'Civil y Comercial (Ejecutivo)',
        cliente: 'Rodríguez, Luis Alberto',
        clienteDoc: 'DNI 17.892.401',
        clienteCuit: '20-17892401-8',
        tipoTramite: 'CADUCIDAD_PENDIENTE',
        estadoProcesal: 'ALERTA DE CADUCIDAD: 78 días sin impulso procesal de la contraria',
        fechaUltimoMovimiento: dateCaducidadStr,
        inactividadDias: 78,
        subcausas: [
          {
            id: 'sub-3105-1',
            titulo: 'Incidente de Levantamiento de Embargo de Haberes',
            caratula: 'RODRIGUEZ LUIS S/ LEVANTAMIENTO DE EMBARGO EN AUTOS PRINCIPALES',
            juzgado: 'Juzgado Civil y Comercial N° 6',
            estado: 'Contestó vista el ejecutante. A la espera de auto resolutorio.',
            fecha: '2026-06-20'
          },
          {
            id: 'sub-3105-2',
            titulo: 'Beneficio de Litigar sin Gastos (Art. 78 CPCC Chaco)',
            caratula: 'RODRIGUEZ LUIS S/ BENEFICIO DE LITIGAR SIN GASTOS',
            juzgado: 'Juzgado Civil y Comercial N° 6',
            estado: 'Concesión provisoria otorgada por el juzgado',
            fecha: '2026-05-11'
          }
        ],
        proveidoTexto: `Resistencia, ${dateCaducidadStr}. Atento al estado de autos y no habiéndose instado el procedimiento por la parte actora ejecutante, téngase presente. Autos a despacho para lo que por derecho corresponda. Notifíquese por nota.`.trim(),
        plazo: null,
        watchdogCaducidad: {
          inactiveDays: 78,
          limitDays: 90,
          remainingDays: 12,
          percentageConsumed: 87,
          statusLevel: 'CRITICAL',
          statusMessage: 'ALERTA CRÍTICA: Restan solo 12 días corridos para la caducidad (87% consumido). Presentar escrito impulsor urgente.'
        },
        borradoresGenerados: []
      }
    ];
  },

  getInitialNotifications() {
    const today = new Date().toISOString().split('T')[0];
    return [
      {
        id: 'notif-001',
        origen: 'Poder Judicial del Chaco (Gmail - IURIX/INDI)',
        remitente: 'notificaciones-iurix@justiciachaco.gov.ar',
        asunto: 'PJ Chaco - Causa Salió a Despacho - Expte. 14.820/25',
        fecha: `${today} 07:15 hs`,
        expteNo: '14.820/25',
        caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS',
        juzgado: 'Juzgado Civil y Comercial N° 3',
        resumen: 'Se acreditó el depósito judicial por $1.850.000. Traslado para denunciar CBU y manifestar conformidad.',
        leido: false,
        tipoTramite: 'SIMPLE',
        causaId: 'causa-14820-25'
      },
      {
        id: 'notif-002',
        origen: 'Poder Judicial del Chaco (Gmail - IURIX/INDI)',
        remitente: 'notificaciones-iurix@justiciachaco.gov.ar',
        asunto: 'PJ Chaco - Causa Salió a Despacho - Expte. 8.310/24',
        fecha: `${today} 07:22 hs`,
        expteNo: '8.310/24',
        caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S/ DESPIDO',
        juzgado: 'Juzgado del Trabajo N° 1',
        resumen: 'Presentación de pericia contable oficial. Traslado de liquidación por 5 días hábiles.',
        leido: false,
        tipoTramite: 'COMPLEJO',
        causaId: 'causa-8310-24'
      }
    ];
  },

  getInitialPrescriptions() {
    return [
      {
        id: 'presc-001',
        caratula: 'MARTINEZ ROBERTO C/ TRANSPORTES DEL CHACO S.R.L. S/ DAÑOS (Siniestro Vial)',
        cliente: 'Martínez, Roberto Carlos',
        fechaHecho: '2023-11-20',
        plazoPrescripcionAnios: 3,
        materia: 'Responsabilidad Civil Extracontractual (Art. 2561 CCCN)',
        estado: 'Etapa prejudicial / Negociación con aseguradora',
        watchdog: {
          remainingDays: 12,
          isAlert: true,
          alertMessage: 'ALERTA DE PRESCRIPCIÓN: Vence en 12 días. Iniciar demanda o interpelación auténtica (art. 2541 CCCN).'
        }
      }
    ];
  },

  getStorageKey(tenantId, resource) {
    return `legaltech_chaco_${tenantId}_${resource}`;
  },

  loadData(tenantId, resource, defaultData) {
    const key = this.getStorageKey(tenantId, resource);
    const stored = localStorage.getItem(key);
    if (!stored) {
      this.saveData(tenantId, resource, defaultData);
      return defaultData;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultData;
    }
  },

  saveData(tenantId, resource, data) {
    const key = this.getStorageKey(tenantId, resource);
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// ============================================================================
// API CLIENT INTELIGENTE CON FALLBACK AUTOMÁTICO
// ============================================================================
const API = {
  async request(endpoint, options = {}) {
    // Si estamos explícitamente en GitHub Pages o file://, ir directo a standalone
    if (window.location.hostname.includes('github.io') || window.location.protocol === 'file:') {
      STANDALONE_ENGINE.isStandalone = true;
      return this.mockRoute(endpoint, options);
    }

    try {
      const res = await fetch(endpoint, options);
      if (!res.ok && res.status === 404) {
        // Backend no responde esta ruta o es un host estático
        STANDALONE_ENGINE.isStandalone = true;
        return this.mockRoute(endpoint, options);
      }
      return await res.json();
    } catch (err) {
      // Fallo de red (servidor apagado o static deployment)
      STANDALONE_ENGINE.isStandalone = true;
      return this.mockRoute(endpoint, options);
    }
  },

  async mockRoute(endpoint, options = {}) {
    const tenantId = STATE.currentTenantId;
    const tenantInfo = STANDALONE_ENGINE.tenants[tenantId] || STANDALONE_ENGINE.tenants.estudio_chaco_central;

    // 1. GET /api/tenants/:tenantId
    if (endpoint === `/api/tenants/${tenantId}` && (!options.method || options.method === 'GET')) {
      return {
        tenant: tenantInfo.tenant,
        authStatus: tenantInfo.authStatus
      };
    }

    // 2. GET /api/tenants/:tenantId/auth-status
    if (endpoint === `/api/tenants/${tenantId}/auth-status`) {
      return tenantInfo.authStatus;
    }

    // 3. GET /api/tenants/:tenantId/causes
    if (endpoint === `/api/tenants/${tenantId}/causes` && (!options.method || options.method === 'GET')) {
      return STANDALONE_ENGINE.loadData(tenantId, 'causes', STANDALONE_ENGINE.getInitialCauses());
    }

    // 4. GET /api/tenants/:tenantId/notifications
    if (endpoint === `/api/tenants/${tenantId}/notifications`) {
      return STANDALONE_ENGINE.loadData(tenantId, 'notifications', STANDALONE_ENGINE.getInitialNotifications());
    }

    // 5. GET /api/tenants/:tenantId/prescriptions
    if (endpoint === `/api/tenants/${tenantId}/prescriptions`) {
      return STANDALONE_ENGINE.loadData(tenantId, 'prescriptions', STANDALONE_ENGINE.getInitialPrescriptions());
    }

    // 6. GET /api/tenants/:tenantId/audit-log
    if (endpoint === `/api/tenants/${tenantId}/audit-log`) {
      return STANDALONE_ENGINE.loadData(tenantId, 'audit_log', [
        {
          id: 'log-seed-1',
          timestamp: new Date().toISOString(),
          user: 'Sistema Local Standalone',
          role: 'ADMIN',
          action: 'INIT_STANDALONE',
          details: 'Modo autónomo activado en el navegador con almacenamiento local inmutable.'
        }
      ]);
    }

    // 7. POST /api/tenants/:tenantId/simulate-dispatch
    if (endpoint === `/api/tenants/${tenantId}/simulate-dispatch`) {
      const expteNo = `${Math.floor(19000 + Math.random() * 900)}/26`;
      const today = new Date().toISOString().split('T')[0];
      const nowTime = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

      const newNotif = {
        id: `notif-${Date.now()}`,
        origen: 'Poder Judicial del Chaco (Gmail - IURIX/INDI)',
        remitente: 'notificaciones-iurix@justiciachaco.gov.ar',
        asunto: `PJ Chaco - Causa Salió a Despacho - Expte. ${expteNo}`,
        fecha: `${today} ${nowTime} hs`,
        expteNo,
        caratula: 'SILVA ESTEBAN C/ EDIFICIOS CHACO S.A. S/ ACCIÓN INDEMNIZATORIA',
        juzgado: 'Juzgado Civil y Comercial N° 2 - Resistencia',
        resumen: 'Salió a despacho proveído: Traslado de documental agregada por 5 días hábiles.',
        leido: false,
        tipoTramite: 'COMPLEJO',
        causaId: `causa-${expteNo.replace('/', '-')}`
      };

      const newCause = {
        id: newNotif.causaId,
        expteNo,
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
        plazo: {
          remainingBusinessDays: 5,
          expirationDate: '2026-11-13',
          gracePeriodDate: '2026-11-16 09:00 hs (Plazo de Gracia)',
          isCritical: false
        },
        watchdogCaducidad: {
          inactiveDays: 0,
          limitDays: 90,
          percentageConsumed: 0,
          statusLevel: 'NORMAL',
          statusMessage: 'En término procesal (0 días de inactividad)'
        },
        borradoresGenerados: []
      };

      const notifs = STANDALONE_ENGINE.loadData(tenantId, 'notifications', STANDALONE_ENGINE.getInitialNotifications());
      notifs.unshift(newNotif);
      STANDALONE_ENGINE.saveData(tenantId, 'notifications', notifs);

      const causes = STANDALONE_ENGINE.loadData(tenantId, 'causes', STANDALONE_ENGINE.getInitialCauses());
      causes.unshift(newCause);
      STANDALONE_ENGINE.saveData(tenantId, 'causes', causes);

      this.logMockAudit(tenantId, {
        user: 'Robot Gmail Ingest / IURIX Chaco',
        role: 'SYSTEM',
        action: 'SIMULATED_DISPATCH_RECEIVED',
        details: `Simulación de correo recibido: Causa ${expteNo} salió a despacho. Vinculación y cálculo de 5 días hábiles realizado.`
      });

      return { success: true, notification: newNotif, cause: newCause };
    }

    // 8. POST /generate-deterministic-draft
    if (endpoint.includes('/generate-deterministic-draft')) {
      const causes = STANDALONE_ENGINE.loadData(tenantId, 'causes', STANDALONE_ENGINE.getInitialCauses());
      const cause = causes.find(c => endpoint.includes(c.id)) || causes[0];
      const meta = tenantInfo.tenant;

      const plainText = `
ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA LIBRAMIENTO DE ORDEN DE TRANSFERENCIA

Señor Juez:

${meta.titular}, abogado inscripto en la Matrícula Profesional N° ${meta.matricula} del Superior Tribunal de Justicia del Chaco, CUIT N° ${meta.cuit}, en representación de la parte actora, con domicilio procesal constituido en ${meta.domicilio} y casillero electrónico ${meta.email}, en los autos caratulados: "${cause.caratula}", Expte. N° ${cause.expteNo}, en trámite por ante el ${cause.juzgado}, a V.S. respetuosamente digo:

I. OBJETO:
Que por el presente acto vengo en tiempo y forma oportuna a manifestar que mi mandante, ${cause.cliente}, ACEPTA EN PAGO el depósito judicial acreditado en autos en la cuenta de este Tribunal en el Nuevo Banco del Chaco S.A., por la suma de PESOS UN MILLÓN OCHOCIENTOS CINCUENTA MIL ($1.850.000,00), imputándose íntegramente la misma a cuenta de capital e intereses devengados.

II. DENUNCIA CUENTA BANCARIA Y CBU:
A efectos del libramiento judicial electrónico conforme Acordadas del STJ Chaco, denuncio los datos bancarios:
- Titular: ${cause.cliente}
- Documento: ${cause.clienteDoc}
- Entidad: ${meta.bancoDefault}
- CBU: ${meta.cbuDefault}
- Alias: ${meta.aliasDefault}

III. PETITORIO:
Por todo lo manifestado, a V.S. solicito:
1. Tenga por aceptado en pago el depósito judicial de $1.850.000,00.
2. Tenga por denunciada la cuenta bancaria precedentemente individualizada.
3. Ordene el libramiento de la pertinente Orden de Transferencia Electrónica Judicial a la cuenta denunciada.

Proveer de conformidad,
SERÁ JUSTICIA.

Resistencia (Chaco), ${new Date().toLocaleDateString('es-AR')}.
`.trim();

      const html = `
<div style="font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.6; color: #111; padding: 25px;">
  <div style="text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 24px; font-size: 14pt;">
    ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA LIBRAMIENTO DE TRANSFERENCIA
  </div>
  <p><strong>Señor Juez:</strong></p>
  <p style="text-align: justify; text-indent: 40px;">
    <strong>${meta.titular}</strong>, letrado apoderado de la parte actora, en los autos caratulados <em>"${cause.caratula}"</em>, Expte. N° <strong>${cause.expteNo}</strong> (${cause.juzgado}), a V.S. respetuosamente digo:
  </p>
  <p style="text-align: justify; text-indent: 40px;">
    <strong>I. OBJETO:</strong> Vengo a manifestar que mi mandante ACEPTA EN PAGO el depósito judicial efectuado por la contraria por la suma de <strong>$1.850.000,00</strong>, imputándose a capital e intereses.
  </p>
  <p style="text-align: justify; text-indent: 40px;">
    <strong>II. DENUNCIA CBU:</strong> A efectos de la transferencia electrónica judicial en el Nuevo Banco del Chaco S.A., denuncio:<br>
    - Titular: <strong>${cause.cliente}</strong> (${cause.clienteDoc})<br>
    - CBU: <code>${meta.cbuDefault}</code><br>
    - Alias: <code>${meta.aliasDefault}</code>
  </p>
  <p style="text-align: justify; text-indent: 40px;">
    <strong>III. PETITORIO:</strong> Se tenga por aceptado el pago, por denunciada la cuenta y se ordene la transferencia judicial.
  </p>
  <div style="text-align: center; font-weight: bold; margin-top: 30px;">SERÁ JUSTICIA.</div>
  <div style="text-align: right; margin-top: 40px; font-size: 11pt;">
    <strong>${meta.titular}</strong><br>${meta.matricula}<br>Resistencia (Chaco)
  </div>
</div>`;

      const draftRecord = {
        id: `draft-${Date.now()}`,
        titulo: 'ACEPTA DEPÓSITO JUDICIAL Y DENUNCIA CBU',
        tipo: 'DETERMINISTICO',
        fechaGeneracion: new Date().toISOString(),
        costo: '$0.00 (Motor Determinístico)',
        estado: 'LISTO_PARA_AUDITAR',
        texto: plainText,
        html,
        filename: `Escrito_Acepta_Deposito_Expte_${cause.expteNo.replace('/', '_')}.doc`
      };

      this.logMockAudit(tenantId, {
        user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario',
        role: STATE.currentRole,
        action: 'GENERATE_DETERMINISTIC_DRAFT',
        details: `Generado escrito automático determinístico ($0 costo) para Expte. ${cause.expteNo}`
      });

      return { success: true, draft: draftRecord };
    }

    // 9. POST /analyze (Copiloto IA)
    if (endpoint === `/api/tenants/${tenantId}/analyze`) {
      const causes = STANDALONE_ENGINE.loadData(tenantId, 'causes', STANDALONE_ENGINE.getInitialCauses());
      const body = options.body ? JSON.parse(options.body) : {};
      const cause = causes.find(c => c.id === body.causeId) || causes[1];

      const analysis = {
        source: 'demo_bridge',
        sourceBadge: 'Claude Pro Copilot (Motor Standalone / Chaco)',
        isCliLive: false,
        diagnostico: 'El Juzgado Laboral confiere traslado de la pericia contable practicada por el Perito Contador Oficial por 5 días hábiles perentorios. Se constatan discrepancias en la mejor remuneración mensual normal y habitual (MRMNH art. 245 LCT) y omisión del rubro SAC sobre diferencias salariales.',
        estrategia: '1. Impugnar la pericia contable en el plazo legal de 5 días hábiles.\n2. Intimar al perito contador a rectificar la liquidación con la escala salarial vigente.\n3. Formular reserva expresa del caso federal (art. 14 Ley 48).',
        plazoEstimado: '5 DÍAS HÁBILES (Vence el 11/11/2026 + Plazo de Gracia)',
        nivelAlerta: 'ALTA',
        borradorEscrito: `IMPUGNA PERICIA CONTABLE - MANIFIESTA DISCONFORMIDAD CON LIQUIDACIÓN DE RUBROS - FORMULA RESERVA DEL CASO FEDERAL

Señor Juez:

Dr. Titular, por la representación acreditada de la actora en los autos "${cause.caratula}", Expte. N° ${cause.expteNo}, en trámite por ante el ${cause.juzgado}, a V.S. digo:

I. OBJETO: Vengo en legal tiempo y forma a IMPUGNAR la pericia contable presentada por el Perito Contador Oficial, por apartarse de las constancias de autos y aplicar erróneamente la base de cálculo del art. 245 LCT.

II. FUNDAMENTOS:
1. El perito excluyó rubros remunerativos habituales reconocidos por jurisprudencia del STJ Chaco.
2. Aplicó una tasa de interés pasiva que vulnera el principio protectorio laboral.

III. PETITORIO:
1. Se tenga por presentada la impugnación a la pericia.
2. Se corra traslado al perito contador para rectificación en 3 días.
3. Se tenga presente la reserva del Caso Federal (art. 14 Ley 48).

SERÁ JUSTICIA.`
      };

      this.logMockAudit(tenantId, {
        user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario',
        role: STATE.currentRole,
        action: 'RUN_AI_COPILOT',
        details: `Análisis procesal con Copiloto IA para Expte. ${cause.expteNo}`
      });

      return analysis;
    }

    // 10. POST /audit-action
    if (endpoint === `/api/tenants/${tenantId}/audit-action`) {
      const body = options.body ? JSON.parse(options.body) : {};
      const { user = 'Usuario', role = 'GUEST', action, causeId, draftText } = body;

      // Protección de Patrimonio Intelectual
      if (role === 'GUEST' && action === 'MASS_EXPORT_TEMPLATES') {
        this.logMockAudit(tenantId, {
          user,
          role,
          action: 'SECURITY_BLOCK_IP_PROTECTION',
          details: 'BLOQUEADO: Intento de exportación masiva de biblioteca de modelos por usuario Invitado.'
        });

        return {
          error: 'Acceso Denegado: Su rol de Invitado / Secretario no tiene autorización para exportar o alterar el patrimonio intelectual (modelos de escritos y causas reservadas). Este evento ha sido notificado al Titular en el registro de auditoría.',
          blocked: true
        };
      }

      if (action === 'APPROVE_DRAFT') {
        this.logMockAudit(tenantId, {
          user,
          role,
          action: role === 'ADMIN' ? 'APPROVE_DRAFT_FINAL' : 'DRAFT_REVIEW_SECRETARY',
          details: role === 'ADMIN'
            ? `Escrito APROBADO formalmente para su presentación judicial en Expte. ${causeId}. Firmado por titular.`
            : `Escrito revisado por Secretario/Invitado. Queda en estado PENDIENTE DE VISADO por el Titular.`
        });

        return {
          success: true,
          status: role === 'ADMIN' ? 'APROBADO' : 'PENDIENTE_TITULAR',
          message: role === 'ADMIN'
            ? '¡Escrito auditado y visado con éxito! Listo para firma digital e ingreso en INDI/IURIX.'
            : 'Escrito revisado y guardado. Por protocolo de seguridad, requiere visado del Abogado Titular antes de su presentación.'
        };
      }

      return { success: true };
    }

    // 11. POST /connect-subscription
    if (endpoint === `/api/tenants/${tenantId}/connect-subscription`) {
      tenantInfo.authStatus.loggedIn = !tenantInfo.authStatus.loggedIn;
      tenantInfo.authStatus.isDemoConnected = tenantInfo.authStatus.loggedIn;
      return {
        success: true,
        active: tenantInfo.authStatus.loggedIn,
        message: tenantInfo.authStatus.loggedIn ? '¡Suscripción de Claude Copilot Legal conectada!' : 'Suscripción desvinculada.'
      };
    }

    // 12. POST /causes/:id/subcauses
    if (endpoint.includes('/subcauses')) {
      const body = options.body ? JSON.parse(options.body) : {};
      const causes = STANDALONE_ENGINE.loadData(tenantId, 'causes', STANDALONE_ENGINE.getInitialCauses());
      const cause = causes.find(c => endpoint.includes(c.id));
      if (cause) {
        if (!cause.subcausas) cause.subcausas = [];
        const newSub = {
          id: `sub-${Date.now()}`,
          titulo: body.titulo || 'Incidente Procesal',
          estado: body.estado || 'En trámite',
          fecha: new Date().toISOString().split('T')[0]
        };
        cause.subcausas.push(newSub);
        STANDALONE_ENGINE.saveData(tenantId, 'causes', causes);
        return { success: true, subcause: newSub };
      }
    }

    // 13. POST /notifications/:id/read
    if (endpoint.includes('/read')) {
      const notifs = STANDALONE_ENGINE.loadData(tenantId, 'notifications', STANDALONE_ENGINE.getInitialNotifications());
      const item = notifs.find(n => endpoint.includes(n.id));
      if (item) item.leido = true;
      STANDALONE_ENGINE.saveData(tenantId, 'notifications', notifs);
      return { success: true };
    }

    return { success: true };
  },

  logMockAudit(tenantId, entry) {
    const logs = STANDALONE_ENGINE.loadData(tenantId, 'audit_log', []);
    logs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: entry.user || 'Abogado Titular',
      role: entry.role || 'ADMIN',
      action: entry.action,
      details: entry.details,
      ip: '127.0.0.1 (Local Browser)'
    });
    STANDALONE_ENGINE.saveData(tenantId, 'audit_log', logs.slice(0, 500));
  }
};

// ============================================================================
// ESTADO GLOBAL DE LA INTERFAZ
// ============================================================================
const STATE = {
  currentTenantId: 'estudio_chaco_central',
  currentRole: 'ADMIN', // 'ADMIN' | 'GUEST'
  tenantMeta: null,
  authStatus: null,
  causes: [],
  notifications: [],
  prescriptions: [],
  auditLogs: [],
  activeTab: 'causes',
  activeFilter: 'all',
  searchQuery: '',
  selectedCauseForCopilot: null,
  currentGeneratedDraft: null
};

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadTenantData(STATE.currentTenantId);
});

function setupEventListeners() {
  // Selector de Estudio
  document.getElementById('tenantSelector').addEventListener('change', async (e) => {
    STATE.currentTenantId = e.target.value;
    await loadTenantData(STATE.currentTenantId);
    showToast(`Cambiado al estudio: ${STATE.tenantMeta ? STATE.tenantMeta.name : e.target.value}`, 'success');
  });

  // Switch de Rol
  document.getElementById('roleAdminBtn').addEventListener('click', () => setRole('ADMIN'));
  document.getElementById('roleGuestBtn').addEventListener('click', () => setRole('GUEST'));

  // Botón de Protección de Patrimonio Intelectual
  document.getElementById('btnIpProtection').addEventListener('click', handleIpProtectionClick);

  // Botón de Suscripción CLI
  document.getElementById('cliSubBadge').addEventListener('click', openSubscriptionModal);

  // Botón Simular correo Gmail
  document.getElementById('btnSimulateEmail').addEventListener('click', simulateIncomingDispatch);

  // Pestañas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const targetTab = btn.getAttribute('data-tab');
      btn.classList.add('active');
      STATE.activeTab = targetTab;
      renderCurrentTab();
    });
  });

  // Filtros de Causas
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.activeFilter = btn.getAttribute('data-filter');
      renderCauses();
    });
  });

  // Búsqueda
  document.getElementById('searchCausesInput').addEventListener('input', (e) => {
    STATE.searchQuery = e.target.value.toLowerCase();
    renderCauses();
  });

  // Modales de cierre
  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => closeAllModals());
  });

  // Botón toggle de suscripción
  document.getElementById('btnToggleSubModal').addEventListener('click', toggleSubscription);
}

// ============================================================================
// CARGA DE DATOS DESDE EL BACKEND / CLIENT MOCK
// ============================================================================
async function loadTenantData(tenantId) {
  try {
    const [tData, authData, causesData, notifsData, prescsData, auditData] = await Promise.all([
      API.request(`/api/tenants/${tenantId}`),
      API.request(`/api/tenants/${tenantId}/auth-status`),
      API.request(`/api/tenants/${tenantId}/causes`),
      API.request(`/api/tenants/${tenantId}/notifications`),
      API.request(`/api/tenants/${tenantId}/prescriptions`),
      API.request(`/api/tenants/${tenantId}/audit-log`)
    ]);

    STATE.tenantMeta = tData.tenant;
    STATE.authStatus = authData;
    STATE.causes = causesData || [];
    STATE.notifications = notifsData || [];
    STATE.prescriptions = prescsData || [];
    STATE.auditLogs = auditData || [];

    updateHeaderUI();
    updateStatsBanner();
    renderInbox();
    renderPrescriptions();
    renderCurrentTab();
  } catch (error) {
    console.error('Error cargando datos del estudio:', error);
    showToast('Error cargando datos del estudio', 'error');
  }
}

// ============================================================================
// RENDERIZADO DE INTERFAZ Y CONTROL DE ROLES
// ============================================================================
function setRole(role) {
  STATE.currentRole = role;
  const adminBtn = document.getElementById('roleAdminBtn');
  const guestBtn = document.getElementById('roleGuestBtn');

  if (role === 'ADMIN') {
    adminBtn.classList.add('active', 'admin');
    guestBtn.classList.remove('active', 'guest');
    showToast('Modo activo: Administrador (Abogado Titular) - Acceso total concedido', 'success');
  } else {
    guestBtn.classList.add('active', 'guest');
    adminBtn.classList.remove('active', 'admin');
    showToast('Modo activo: Invitado / Secretario (Acceso Limitado - IP Protegida)', 'warning');
  }
  updateHeaderUI();
  renderCurrentTab();
}

function updateHeaderUI() {
  if (!STATE.tenantMeta) return;

  document.getElementById('currentTenantName').textContent = STATE.tenantMeta.name;
  document.getElementById('currentTenantSubtitle').textContent = `${STATE.tenantMeta.titular} • ${STATE.tenantMeta.matricula}`;

  const pulseDot = document.getElementById('subPulseDot');
  const subLabel = document.getElementById('subBadgeLabel');
  
  if (STATE.authStatus && STATE.authStatus.loggedIn) {
    pulseDot.classList.add('active');
    subLabel.textContent = STATE.authStatus.isLiveCli 
      ? 'Claude CLI (Live Pro)' 
      : 'Claude Copilot (Suscripción Conectada)';
    subLabel.style.color = '#34d399';
  } else {
    pulseDot.classList.remove('active');
    subLabel.textContent = 'CLI Sin Conectar ($0 Demo)';
    subLabel.style.color = '#94a3b8';
  }
}

function updateStatsBanner() {
  document.getElementById('statTotalCauses').textContent = STATE.causes.length;
  const unreadCount = STATE.notifications.filter(n => !n.leido).length;
  document.getElementById('statUnreadInbox').textContent = unreadCount;
  
  const urgentCount = STATE.causes.filter(c => c.plazo && c.plazo.isCritical).length;
  document.getElementById('statUrgentDeadlines').textContent = urgentCount;

  const caducidadAlerts = STATE.causes.filter(c => c.watchdogCaducidad && c.watchdogCaducidad.statusLevel !== 'NORMAL').length;
  document.getElementById('statCaducidadAlerts').textContent = caducidadAlerts;
}

// ============================================================================
// BANDEJA DIARIA ("SALIÓ A DESPACHO" - GMAIL / PJ CHACO)
// ============================================================================
function renderInbox() {
  const container = document.getElementById('inboxList');
  const badgeCount = document.getElementById('inboxBadgeCounter');
  
  const unreadCount = STATE.notifications.filter(n => !n.leido).length;
  badgeCount.textContent = `${unreadCount} nuevas`;

  if (STATE.notifications.length === 0) {
    container.innerHTML = '<div style="color: #64748b; font-size: 0.8rem; text-align: center; padding: 20px;">No hay despachos registrados hoy.</div>';
    return;
  }

  container.innerHTML = STATE.notifications.map(n => `
    <div class="inbox-item ${n.leido ? '' : 'unread'}" onclick="handleInboxItemClick('${n.id}', '${n.causaId}')">
      <div class="inbox-item-header">
        <span class="inbox-item-origin">⚖️ ${n.remitente && n.remitente.includes('justiciachaco') ? 'PJ Chaco (IURIX)' : 'Notificación'}</span>
        <span class="inbox-item-time">${n.fecha}</span>
      </div>
      <div class="inbox-item-expte">Expte. ${n.expteNo}</div>
      <div class="inbox-item-desc">${n.resumen}</div>
    </div>
  `).join('');
}

async function simulateIncomingDispatch() {
  try {
    showToast('Simulando recepción de correo diario desde Poder Judicial del Chaco...', 'warning');
    const data = await API.request(`/api/tenants/${STATE.currentTenantId}/simulate-dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario' })
    });
    
    if (data.success) {
      showToast(`¡Nuevo correo procesado! Expte. ${data.notification.expteNo} ingresado a despacho.`, 'success');
      await loadTenantData(STATE.currentTenantId);
    }
  } catch (err) {
    showToast('Error al simular despacho', 'error');
  }
}

async function handleInboxItemClick(notifId, causaId) {
  await API.request(`/api/tenants/${STATE.currentTenantId}/notifications/${notifId}/read`, { method: 'POST' });
  const notif = STATE.notifications.find(n => n.id === notifId);
  if (notif) notif.leido = true;
  renderInbox();
  updateStatsBanner();

  if (causaId) {
    const el = document.getElementById(`cause-${causaId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.borderColor = '#3b82f6';
      el.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
      setTimeout(() => {
        el.style.boxShadow = 'none';
      }, 2000);
    }
  }
}

// ============================================================================
// WATCHDOG DE PRESCRIPCIÓN
// ============================================================================
function renderPrescriptions() {
  const container = document.getElementById('prescriptionList');
  if (!STATE.prescriptions || STATE.prescriptions.length === 0) {
    container.innerHTML = '<div style="color: #64748b; font-size: 0.78rem;">Sin alertas de prescripción activas.</div>';
    return;
  }

  container.innerHTML = STATE.prescriptions.map(p => `
    <div class="prescription-item">
      <div class="prescription-title">⚠️ ${p.caratula}</div>
      <div class="prescription-desc">
        <strong>Cliente:</strong> ${p.cliente}<br>
        <strong>Materia:</strong> ${p.materia}<br>
        <span style="color: #f87171; font-weight: 600;">${p.watchdog ? p.watchdog.alertMessage : 'Prescripción en control'}</span>
      </div>
    </div>
  `).join('');
}

// ============================================================================
// CAUSAS Y SUB-CAUSAS (ÁRBOL PROCESAL + MOTOR DE PLAZOS)
// ============================================================================
function renderCurrentTab() {
  const causesView = document.getElementById('causesTabView');
  const deadlinesView = document.getElementById('deadlinesTabView');
  const auditView = document.getElementById('auditTabView');

  causesView.style.display = 'none';
  deadlinesView.style.display = 'none';
  auditView.style.display = 'none';

  if (STATE.activeTab === 'causes') {
    causesView.style.display = 'block';
    renderCauses();
  } else if (STATE.activeTab === 'deadlines') {
    deadlinesView.style.display = 'block';
    renderDeadlinesMonitor();
  } else if (STATE.activeTab === 'audit') {
    auditView.style.display = 'block';
    renderAuditLog();
  }
}

function renderCauses() {
  const container = document.getElementById('causesListContainer');
  let list = STATE.causes;

  if (STATE.activeFilter === 'simple') {
    list = list.filter(c => c.tipoTramite === 'SIMPLE');
  } else if (STATE.activeFilter === 'complex') {
    list = list.filter(c => c.tipoTramite === 'COMPLEJO');
  } else if (STATE.activeFilter === 'caducidad') {
    list = list.filter(c => c.watchdogCaducidad && c.watchdogCaducidad.statusLevel !== 'NORMAL');
  }

  if (STATE.searchQuery) {
    list = list.filter(c => 
      c.caratula.toLowerCase().includes(STATE.searchQuery) ||
      c.expteNo.toLowerCase().includes(STATE.searchQuery) ||
      c.juzgado.toLowerCase().includes(STATE.searchQuery) ||
      (c.cliente && c.cliente.toLowerCase().includes(STATE.searchQuery))
    );
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: #64748b;">No se encontraron causas para el filtro seleccionado.</div>';
    return;
  }

  container.innerHTML = list.map(c => {
    const isSimple = c.tipoTramite === 'SIMPLE';
    const isCaducidadRisk = c.watchdogCaducidad && c.watchdogCaducidad.statusLevel !== 'NORMAL';

    return `
      <div class="cause-card" id="cause-${c.id}">
        <div class="cause-card-header">
          <div class="cause-title-group">
            <h3>Expte. N° ${c.expteNo} - "${c.caratula}"</h3>
            <div class="cause-meta-court">🏛️ ${c.juzgado} • 👤 Cliente: <strong>${c.cliente || 'S/D'}</strong> (${c.clienteDoc || ''})</div>
          </div>
          <div class="cause-badges">
            <span class="badge-tag ${isSimple ? 'simple' : (isCaducidadRisk ? 'danger' : 'complex')}">
              ${isSimple ? 'Trámite Simple (Depósito)' : (isCaducidadRisk ? 'Alerta Caducidad' : 'Trámite Complejo')}
            </span>
          </div>
        </div>

        <div class="cause-card-body">
          <div class="proveido-box">
            <div class="proveido-header">
              <span>📄 Último Proveído Judicial Notificado (PJ Chaco)</span>
            </div>
            <div class="proveido-text">"${c.proveidoTexto || 'Sin proveído cargado'}"</div>
          </div>

          <div class="deadlines-row">
            <div class="deadline-pill">
              <div class="deadline-pill-label">📅 Plazo Procesal Hábil (CPCC)</div>
              <div class="deadline-pill-value">
                ${c.plazo ? `
                  <span style="color: ${c.plazo.isCritical ? '#f87171' : '#34d399'};">
                    ⏳ ${c.plazo.remainingBusinessDays} días hábiles restantes
                  </span>
                ` : '<span style="color: #94a3b8;">Sin traslado activo</span>'}
              </div>
              <div class="deadline-pill-sub">
                ${c.plazo ? `Vence el ${c.plazo.expirationDate} (Gracia: ${c.plazo.gracePeriodDate})` : 'Causa a la espera de resolución'}
              </div>
            </div>

            <div class="deadline-pill">
              <div class="deadline-pill-label">⏱️ Watchdog Caducidad de Instancia (Art. 310)</div>
              <div class="deadline-pill-value">
                <span style="color: ${c.watchdogCaducidad.statusLevel === 'NORMAL' ? '#34d399' : (c.watchdogCaducidad.statusLevel === 'WARNING' ? '#fbbf24' : '#ef4444')};">
                  ${c.watchdogCaducidad.inactiveDays} / 90 días inactivos
                </span>
              </div>
              <div class="caducidad-progress-wrapper">
                <div class="progress-bar-track">
                  <div class="progress-bar-fill ${c.watchdogCaducidad.statusLevel ? c.watchdogCaducidad.statusLevel.toLowerCase() : 'normal'}" style="width: ${c.watchdogCaducidad.percentageConsumed || 0}%;"></div>
                </div>
                <div class="deadline-pill-sub" style="margin-top: 4px;">
                  ${c.watchdogCaducidad.statusMessage || ''}
                </div>
              </div>
            </div>
          </div>

          <div class="subcauses-section">
            <div class="subcauses-header">
              <span>🌳 Árbol Procesal: Causa Principal y Sub-causas / Incidentes (${c.subcausas ? c.subcausas.length : 0})</span>
              <button class="btn btn-secondary" style="font-size: 0.72rem; padding: 3px 8px;" onclick="openAddSubcauseModal('${c.id}')">+ Vincular Incidente</button>
            </div>
            ${c.subcausas && c.subcausas.length > 0 ? c.subcausas.map(s => `
              <div class="subcause-tree-item">
                <span class="tree-branch-icon">└── 📁</span>
                <div class="subcause-info">
                  <h5>${s.titulo}</h5>
                  <p>Estado: ${s.estado} • Fecha: ${s.fecha || '2026'}</p>
                </div>
              </div>
            `).join('') : '<div style="font-size: 0.75rem; color: #64748b;">No posee incidentes o recursos vinculados.</div>'}
          </div>

          <div class="cause-actions-bar">
            ${isSimple ? `
              <button class="btn btn-primary" onclick="generateSimplePaymentDraft('${c.id}')">
                ⚡ Generar Escrito Acepta Pago y Denuncia CBU ($0 Costo)
              </button>
            ` : ''}

            <button class="btn btn-copilot" onclick="openCopilotAnalysis('${c.id}')">
              🤖 Copiloto IA: Diagnóstico & Borrador
            </button>

            ${isCaducidadRisk ? `
              <button class="btn btn-outline-danger" onclick="generateAntiCaducidadMotion('${c.id}')">
                🛡️ Impulsar Autos (Interrumpir Caducidad)
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// GENERADOR DETERMINÍSTICO ($0 COSTO)
// ============================================================================
async function generateSimplePaymentDraft(causeId) {
  try {
    showToast('Generando escrito judicial determinístico con datos bancarios...', 'info');
    const data = await API.request(`/api/tenants/${STATE.currentTenantId}/causes/${causeId}/generate-deterministic-draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario',
        role: STATE.currentRole
      })
    });
    if (data.success) {
      STATE.currentGeneratedDraft = data.draft;
      openDocumentViewerModal(data.draft);
      showToast('¡Escrito formal generado con éxito a costo cero!', 'success');
      await loadTenantData(STATE.currentTenantId);
    }
  } catch (e) {
    showToast('Error generando escrito', 'error');
  }
}

function openDocumentViewerModal(draft) {
  const modal = document.getElementById('docViewerModal');
  const paper = document.getElementById('docViewerPaper');
  const title = document.getElementById('docViewerTitle');

  title.textContent = `Escrito Judicial Formal - ${draft.titulo}`;
  paper.innerHTML = draft.html || `<pre style="font-family: monospace; white-space: pre-wrap;">${draft.texto}</pre>`;

  document.getElementById('btnCopyDraft').onclick = () => {
    navigator.clipboard.writeText(draft.texto);
    showToast('Texto judicial copiado al portapapeles', 'success');
  };

  document.getElementById('btnDownloadWord').onclick = () => {
    downloadHtmlAsWord(draft.html, draft.filename || 'Escrito_Judicial.doc');
  };

  modal.classList.add('open');
}

function downloadHtmlAsWord(htmlContent, filename) {
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Descargando documento Word: ${filename}`, 'success');
}

// ============================================================================
// COPILOTO IA Y AUDITORÍA HUMANA
// ============================================================================
async function openCopilotAnalysis(causeId) {
  const cause = STATE.causes.find(c => c.id === causeId);
  if (!cause) return;
  STATE.selectedCauseForCopilot = cause;

  const modal = document.getElementById('copilotModal');
  modal.classList.add('open');

  document.getElementById('copilotExpteTitle').textContent = `Expte. ${cause.expteNo} - ${cause.caratula}`;
  document.getElementById('copilotProveidoReview').textContent = `"${cause.proveidoTexto}"`;
  document.getElementById('copilotDiagnosticText').innerHTML = '⏳ <em>Analizando proveído del juzgado con Copiloto Legal...</em>';
  document.getElementById('copilotStrategyText').innerHTML = '';
  document.getElementById('copilotDraftEditor').value = '';

  try {
    const analysis = await API.request(`/api/tenants/${STATE.currentTenantId}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        causeId: cause.id,
        user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario',
        role: STATE.currentRole
      })
    });

    document.getElementById('copilotDiagnosticText').innerHTML = `
      <div style="margin-bottom: 6px;"><strong style="color: #60a5fa;">Fuente:</strong> ${analysis.sourceBadge}</div>
      <div>${analysis.diagnostico}</div>
    `;
    document.getElementById('copilotStrategyText').innerHTML = `
      <div style="margin-bottom: 6px;"><strong style="color: #fbbf24;">Estrategia Procesal:</strong></div>
      <div style="white-space: pre-line;">${analysis.estrategia}</div>
      <div style="margin-top: 6px; color: #f87171;"><strong>Plazo fatal:</strong> ${analysis.plazoEstimado}</div>
    `;
    document.getElementById('copilotDraftEditor').value = analysis.borradorEscrito;

    const approveBtn = document.getElementById('btnApproveDraft');
    if (STATE.currentRole === 'ADMIN') {
      approveBtn.innerHTML = '⚖️ Auditar y Aprobar Escrito (Firma Titular)';
      approveBtn.className = 'btn btn-primary';
    } else {
      approveBtn.innerHTML = '📝 Guardar Revisión (Enviar a Visado de Titular)';
      approveBtn.className = 'btn btn-secondary';
    }

    approveBtn.onclick = () => executeAuditApproval(cause.id);
  } catch (e) {
    document.getElementById('copilotDiagnosticText').textContent = 'Error al ejecutar copiloto IA.';
  }
}

async function executeAuditApproval(causeId) {
  const draftText = document.getElementById('copilotDraftEditor').value;
  try {
    const data = await API.request(`/api/tenants/${STATE.currentTenantId}/audit-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: STATE.currentRole === 'ADMIN' ? STATE.tenantMeta.titular : 'Secretario Letrado',
        role: STATE.currentRole,
        action: 'APPROVE_DRAFT',
        causeId,
        draftText
      })
    });
    if (data.success) {
      showToast(data.message, 'success');
      closeAllModals();
      await loadTenantData(STATE.currentTenantId);
    }
  } catch (e) {
    showToast('Error al auditar escrito', 'error');
  }
}

async function generateAntiCaducidadMotion(causeId) {
  const cause = STATE.causes.find(c => c.id === causeId);
  if (!cause) return;

  const motionText = `SOLICITA SE PASE A DESPACHO PARA RESOLVER - IMPULSA PROCEDIMIENTO

Señor Juez:
${STATE.tenantMeta ? STATE.tenantMeta.titular : 'Dr. Gómez'}, por la representación que tengo acreditada en los autos caratulados "${cause.caratula}", Expte. N° ${cause.expteNo}, a V.S. digo:

Que atento al estado de autos, vengo a solicitar se pase el presente expediente a despacho a fin de resolver, sirviendo la presente de formal impulso procesal a tenor del art. 310 y concordantes del CPCC del Chaco.

SERÁ JUSTICIA.`;

  openDocumentViewerModal({
    titulo: 'IMPULSO PROCESAL CONTRA CADUCIDAD DE INSTANCIA',
    texto: motionText,
    filename: `Impulso_Caducidad_Expte_${cause.expteNo.replace('/', '_')}.doc`,
    html: `<div style="font-family: 'Times New Roman'; padding: 30px;"><pre style="white-space: pre-wrap; font-family: inherit;">${motionText}</pre></div>`
  });
}

// ============================================================================
// PROTECCIÓN DE PATRIMONIO INTELECTUAL (RESPUESTA 8)
// ============================================================================
async function handleIpProtectionClick() {
  if (STATE.currentRole === 'GUEST') {
    try {
      const data = await API.request(`/api/tenants/${STATE.currentTenantId}/audit-action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'Secretario / Invitado',
          role: 'GUEST',
          action: 'MASS_EXPORT_TEMPLATES'
        })
      });
      
      const modal = document.getElementById('ipShieldModal');
      document.getElementById('ipShieldReason').textContent = data.error || 'Acceso Denegado: Su rol de Invitado / Secretario no tiene autorización para exportar la biblioteca de modelos procesales.';
      modal.classList.add('open');
      await loadTenantData(STATE.currentTenantId);
    } catch (e) {
      console.error(e);
    }
  } else {
    const modal = document.getElementById('modelLibraryModal');
    modal.classList.add('open');
  }
}

// ============================================================================
// SUSCRIPCIÓN CLI Y ORCA/CLI BRIDGE MODAL
// ============================================================================
function openSubscriptionModal() {
  const modal = document.getElementById('subscriptionModal');
  const details = document.getElementById('subModalDetails');
  const toggleBtn = document.getElementById('btnToggleSubModal');
  const cliCmd = document.getElementById('subCliCommand');

  const auth = STATE.authStatus;
  cliCmd.textContent = `HOME="/home/uptime404/proyecto_abogado/app/tenants/${STATE.currentTenantId}" claude auth login --claudeai`;

  if (auth && auth.loggedIn) {
    toggleBtn.textContent = 'Desconectar Suscripción de este Estudio';
    toggleBtn.className = 'btn btn-outline-danger';
    details.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #34d399;">✅ Suscripción Activa en este Tenant</strong><br>
        Plan: <strong>${auth.subscriptionDetails ? auth.subscriptionDetails.plan : 'Claude Pro'}</strong><br>
        Cuenta: <strong>${auth.subscriptionDetails ? auth.subscriptionDetails.accountEmail : 'titular@estudio.com.ar'}</strong><br>
        Modo: <em>${auth.mode === 'live_cli' ? 'Claude CLI Nativo (Live)' : 'Puente Demo Conectado'}</em><br>
        Directorio Aislado de Credenciales: <code>/home/uptime404/proyecto_abogado/app/tenants/${STATE.currentTenantId}</code>
      </div>
    `;
  } else {
    toggleBtn.textContent = '⚡ Conectar Suscripción Claude Pro (Demo Bridge)';
    toggleBtn.className = 'btn btn-primary';
    details.innerHTML = `
      <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid #f59e0b; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #fbbf24;">ℹ️ Sin Suscripción Vinculada</strong><br>
        Actualmente las consultas usan el motor especializado procesal sin costo.<br>
        Puede alternar el puente demo o vincular su cuenta de Claude Pro por terminal usando el comando inferior.
      </div>
    `;
  }

  modal.classList.add('open');
}

async function toggleSubscription() {
  try {
    const data = await API.request(`/api/tenants/${STATE.currentTenantId}/connect-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'toggle_demo',
        user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario',
        role: STATE.currentRole
      })
    });
    showToast(data.message, 'success');
    closeAllModals();
    await loadTenantData(STATE.currentTenantId);
  } catch (e) {
    showToast('Error modificando suscripción', 'error');
  }
}

// ============================================================================
// AUDITORÍA INMUTABLE
// ============================================================================
function renderAuditLog() {
  const container = document.getElementById('auditTableBody');
  if (!STATE.auditLogs || STATE.auditLogs.length === 0) {
    container.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">Sin registros de auditoría.</td></tr>';
    return;
  }

  container.innerHTML = STATE.auditLogs.map(l => {
    const isSecurity = l.action.includes('SECURITY') || l.action.includes('BLOCK');
    return `
      <tr>
        <td style="font-family: monospace; font-size: 0.76rem;">${new Date(l.timestamp).toLocaleString('es-AR')}</td>
        <td><strong>${l.user}</strong></td>
        <td>
          <span class="badge-tag ${l.role === 'ADMIN' ? 'complex' : 'simple'}" style="font-size: 0.68rem;">
            ${l.role}
          </span>
        </td>
        <td style="color: ${isSecurity ? '#f87171' : '#60a5fa'}; font-weight: 600;">${l.action}</td>
        <td>${l.details}</td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// MONITOR GENERAL DE VENCIMIENTOS
// ============================================================================
function renderDeadlinesMonitor() {
  const container = document.getElementById('deadlinesListContainer');
  const causesWithDeadlines = STATE.causes.filter(c => c.plazo || (c.watchdogCaducidad && c.watchdogCaducidad.statusLevel !== 'NORMAL'));

  container.innerHTML = `
    <div style="display: grid; gap: 14px;">
      ${causesWithDeadlines.map(c => `
        <div class="panel-card" style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #fff; font-size: 0.95rem;">Expte. ${c.expteNo} - ${c.caratula}</strong>
            <span class="badge-tag ${c.watchdogCaducidad && c.watchdogCaducidad.statusLevel === 'NORMAL' ? 'simple' : 'danger'}">
              ${c.juzgado}
            </span>
          </div>
          <div style="display: flex; gap: 20px; font-size: 0.82rem; color: #cbd5e1; flex-wrap: wrap;">
            ${c.plazo ? `<div>⏳ <strong>Traslado:</strong> Vence el ${c.plazo.expirationDate} (${c.plazo.remainingBusinessDays} días hábiles)</div>` : ''}
            <div>⏱️ <strong>Inactividad:</strong> ${c.watchdogCaducidad ? c.watchdogCaducidad.inactiveDays : 0} días (${c.watchdogCaducidad ? c.watchdogCaducidad.statusMessage : ''})</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// MODAL DE VINCULAR SUB-CAUSA
// ============================================================================
function openAddSubcauseModal(causeId) {
  const modal = document.getElementById('addSubcauseModal');
  document.getElementById('addSubcauseTargetExpte').textContent = `Causa N° ${causeId}`;
  document.getElementById('btnConfirmAddSubcause').onclick = async () => {
    const title = document.getElementById('inputSubcauseTitle').value;
    const desc = document.getElementById('inputSubcauseDesc').value;
    if (!title) return showToast('Ingrese un título para la sub-causa', 'warning');

    try {
      await API.request(`/api/tenants/${STATE.currentTenantId}/causes/${causeId}/subcauses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: title,
          estado: desc,
          user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario',
          role: STATE.currentRole
        })
      });
      showToast('Sub-causa vinculada con éxito', 'success');
      closeAllModals();
      await loadTenantData(STATE.currentTenantId);
    } catch (e) {
      showToast('Error vinculando sub-causa', 'error');
    }
  };
  modal.classList.add('open');
}

// ============================================================================
// HELPERS & TOASTS
// ============================================================================
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : (type === 'error' ? '❌' : (type === 'warning' ? '⚠️' : 'ℹ️'))}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
