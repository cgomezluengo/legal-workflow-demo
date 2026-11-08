/**
 * Gestor de Persistencia y Repositorio Multi-Tenant
 * Almacena causas, sub-causas, notificaciones diarias y logs inmutables de auditoría
 * aislados en el directorio de cada estudio jurídico.
 */

const fs = require('fs');
const path = require('path');
const { calculateBusinessDaysDeadline, checkPeremptionWatchdog, checkPrescriptionWatchdog } = require('./deadlines');

const TENANTS_METADATA = [
  {
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
    specialty: 'Derecho Civil, Comercial, Daños y Sucesiones',
    badgeText: 'Sede Central Resistencia'
  },
  {
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
    specialty: 'Derecho Laboral, ART, Despidos y Empresas',
    badgeText: 'Estudio Asociado Chaco'
  }
];

function getTenantDir(tenantId) {
  const dir = path.join(__dirname, '..', 'tenants', tenantId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function getSeedCauses() {
  const today = new Date().toISOString().split('T')[0];
  
  // Fecha de hace 2 días para el caso laboral
  const dateLaboral = new Date();
  dateLaboral.setDate(dateLaboral.getDate() - 2);
  const dateLaboralStr = dateLaboral.toISOString().split('T')[0];

  // Fecha de hace 78 días para el caso de caducidad
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
      plazo: calculateBusinessDaysDeadline(today, 5),
      watchdogCaducidad: checkPeremptionWatchdog(today, 90),
      borradoresGenerados: [],
      readyAction: 'GENERAR_PAGO_SIMPLE'
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
      plazo: calculateBusinessDaysDeadline(dateLaboralStr, 5),
      watchdogCaducidad: checkPeremptionWatchdog(dateLaboralStr, 90),
      borradoresGenerados: [],
      readyAction: 'COPILOTO_IA_IMPUGNACION'
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
      watchdogCaducidad: checkPeremptionWatchdog(dateCaducidadStr, 90),
      borradoresGenerados: [],
      readyAction: 'WATCHDOG_CADUCIDAD_ACCION'
    }
  ];
}

function getSeedNotifications() {
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
}

function getSeedPrescriptions() {
  return [
    {
      id: 'presc-001',
      caratula: 'MARTINEZ ROBERTO C/ TRANSPORTES DEL CHACO S.R.L. S/ DAÑOS (Siniestro Vial)',
      cliente: 'Martínez, Roberto Carlos',
      fechaHecho: '2023-11-20',
      plazoPrescripcionAnios: 3,
      materia: 'Responsabilidad Civil Extracontractual (Art. 2561 CCCN)',
      estado: 'Etapa prejudicial / Negociación con aseguradora',
      watchdog: checkPrescriptionWatchdog('2023-11-20', 3, 'Daños y Perjuicios (CCN 2561)')
    }
  ];
}

class TenantStorage {
  constructor(tenantId) {
    this.tenantId = tenantId;
    this.dir = getTenantDir(tenantId);
    this.causesFile = path.join(this.dir, 'causes.json');
    this.notificationsFile = path.join(this.dir, 'notifications.json');
    this.auditFile = path.join(this.dir, 'audit_log.json');
    this.prescriptionsFile = path.join(this.dir, 'prescriptions.json');
    this.init();
  }

  init() {
    if (!fs.existsSync(this.causesFile)) {
      fs.writeFileSync(this.causesFile, JSON.stringify(getSeedCauses(), null, 2), 'utf8');
    }
    if (!fs.existsSync(this.notificationsFile)) {
      fs.writeFileSync(this.notificationsFile, JSON.stringify(getSeedNotifications(), null, 2), 'utf8');
    }
    if (!fs.existsSync(this.prescriptionsFile)) {
      fs.writeFileSync(this.prescriptionsFile, JSON.stringify(getSeedPrescriptions(), null, 2), 'utf8');
    }
    if (!fs.existsSync(this.auditFile)) {
      const initialLog = [
        {
          id: 'log-seed-1',
          timestamp: new Date().toISOString(),
          user: 'Sistema Multi-Tenant Chaco',
          role: 'ADMIN',
          action: 'INIT_TENANT',
          details: `Estudio inicializado con repositorio aislado en tenants/${this.tenantId}`,
          ip: '127.0.0.1'
        }
      ];
      fs.writeFileSync(this.auditFile, JSON.stringify(initialLog, null, 2), 'utf8');
    }
  }

  getCauses() {
    try {
      const data = JSON.parse(fs.readFileSync(this.causesFile, 'utf8'));
      // Recalcular watchdogs dinámicamente según la fecha de consulta
      return data.map(c => {
        if (c.fechaUltimoMovimiento) {
          c.watchdogCaducidad = checkPeremptionWatchdog(c.fechaUltimoMovimiento, 90);
        }
        return c;
      });
    } catch (e) {
      return [];
    }
  }

  getCause(id) {
    const causes = this.getCauses();
    return causes.find(c => c.id === id || c.expteNo === id);
  }

  saveCause(cause) {
    const causes = this.getCauses();
    const idx = causes.findIndex(c => c.id === cause.id);
    if (idx >= 0) {
      causes[idx] = cause;
    } else {
      causes.unshift(cause);
    }
    fs.writeFileSync(this.causesFile, JSON.stringify(causes, null, 2), 'utf8');
    return cause;
  }

  addSubcause(causeId, subcause) {
    const cause = this.getCause(causeId);
    if (!cause) return null;
    if (!cause.subcausas) cause.subcausas = [];
    subcause.id = subcause.id || `sub-${Date.now()}`;
    subcause.fecha = subcause.fecha || new Date().toISOString().split('T')[0];
    cause.subcausas.push(subcause);
    this.saveCause(cause);
    return subcause;
  }

  getNotifications() {
    try {
      return JSON.parse(fs.readFileSync(this.notificationsFile, 'utf8'));
    } catch (e) {
      return [];
    }
  }

  addNotification(notif) {
    const notifs = this.getNotifications();
    notif.id = notif.id || `notif-${Date.now()}`;
    notif.fecha = notif.fecha || new Date().toLocaleTimeString('es-AR') + ' hs';
    notif.leido = false;
    notifs.unshift(notif);
    fs.writeFileSync(this.notificationsFile, JSON.stringify(notifs, null, 2), 'utf8');
    return notif;
  }

  markNotificationRead(id) {
    const notifs = this.getNotifications();
    const item = notifs.find(n => n.id === id);
    if (item) {
      item.leido = true;
      fs.writeFileSync(this.notificationsFile, JSON.stringify(notifs, null, 2), 'utf8');
    }
    return item;
  }

  getPrescriptions() {
    try {
      const data = JSON.parse(fs.readFileSync(this.prescriptionsFile, 'utf8'));
      return data.map(p => {
        p.watchdog = checkPrescriptionWatchdog(p.fechaHecho, p.plazoPrescripcionAnios, p.materia);
        return p;
      });
    } catch (e) {
      return [];
    }
  }

  logAuditEvent({ user = 'Abogado Titular', role = 'ADMIN', action, details, ip = '127.0.0.1' }) {
    let logs = [];
    try {
      logs = JSON.parse(fs.readFileSync(this.auditFile, 'utf8'));
    } catch (e) {
      logs = [];
    }

    const entry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      user,
      role,
      action,
      details,
      ip
    };

    logs.unshift(entry);
    // Conservar hasta 1000 eventos de auditoría
    if (logs.length > 1000) logs = logs.slice(0, 1000);
    fs.writeFileSync(this.auditFile, JSON.stringify(logs, null, 2), 'utf8');
    return entry;
  }

  getAuditLog() {
    try {
      return JSON.parse(fs.readFileSync(this.auditFile, 'utf8'));
    } catch (e) {
      return [];
    }
  }

  reset() {
    fs.writeFileSync(this.causesFile, JSON.stringify(getSeedCauses(), null, 2), 'utf8');
    fs.writeFileSync(this.notificationsFile, JSON.stringify(getSeedNotifications(), null, 2), 'utf8');
    fs.writeFileSync(this.prescriptionsFile, JSON.stringify(getSeedPrescriptions(), null, 2), 'utf8');
    this.logAuditEvent({
      user: 'Administrador',
      role: 'ADMIN',
      action: 'RESET_DATABASE',
      details: 'Base de datos del estudio reiniciada con causas y notificaciones testigo.'
    });
  }
}

const storageInstances = new Map();

function getStorage(tenantId) {
  if (!storageInstances.has(tenantId)) {
    storageInstances.set(tenantId, new TenantStorage(tenantId));
  }
  return storageInstances.get(tenantId);
}

function getTenantsList() {
  return TENANTS_METADATA;
}

function getTenantMeta(id) {
  return TENANTS_METADATA.find(t => t.id === id) || TENANTS_METADATA[0];
}

module.exports = {
  getStorage,
  getTenantsList,
  getTenantMeta
};
