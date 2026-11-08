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
        expteIure: '14820/2025-1-C',
        caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S.A. S/ DAÑOS Y PERJUICIOS',
        juzgado: 'Juzgado Civil y Comercial N° 3 - Resistencia',
        dependencia: 'JUZGADO CIVIL Y COMERCIAL N° 3 - SEC. CIVIL - RESISTENCIA',
        fuero: 'Civil y Comercial',
        cliente: 'Pérez, Juan Carlos',
        clienteDoc: 'DNI 24.112.980',
        clienteCuit: '20-24112980-4',
        actor: 'Pérez, Juan Carlos',
        demandado: 'Seguros del Norte S.A. (Citada en Garantía)',
        tipoTramite: 'SIMPLE',
        tipoActoLabel: 'Trámite Simple (Dación en Pago / Depósito)',
        tipoAcceso: 'Libre',
        motivo: 'NOTIFICACION ART. 155 DEL CPCCCh',
        clasificacion: '[Agregar etiqueta]',
        revisado: false,
        estadoProcesal: 'Salió a despacho - Depósito Judicial disponible',
        montoDepositado: 1850000,
        monto: '$1.850.000,00',
        pdfFile: 'pdfs/proveido_14820_25_deposito.pdf',
        pdfTitle: 'Proveído 14.820/25 - Depósito Judicial $1.850.000',
        token: 'PJCH-CIV3-2026-14820-DEP',
        hash: 'b7c419e048d2aa81902f',
        fechaUltimoMovimiento: today,
        inactividadDias: 0,
        subcausas: [],
        proveidoTexto: `Resistencia, ${today}. Téngase por acreditado en autos el depósito judicial efectuado por la citada en garantía SEGUROS DEL NORTE S.A. en la cuenta judicial a la orden de este Tribunal en el Nuevo Banco del Chaco S.A., por la suma de PESOS UN MILLÓN OCHOCIENTOS CINCUENTA MIL ($1.850.000,00). Del mismo, córrase traslado a la actora por el término de ley y manifieste sobre la dación en pago y denuncie cuenta bancaria y CBU a sus efectos. Notifíquese por cédula electrónica conforme Art. 155 del CPCCCh. - Fdo. Dra. Elena Ruiz (Jueza Civil y Comercial N° 3)`.trim(),
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
        actuaciones: [
          {
            id: 'act-14820-1',
            hasDoc: true,
            hasIndi: false,
            creado: `${today} 09:30`,
            publicado: `${today} 12:25`,
            folio: '188',
            descripcion: 'Téngase por depositado - Traslado CBU (Art. 155 CPCCCh)',
            generadoEn: 'JUZGADO CIVIL Y COMERCIAL N° 3',
            pdfFile: 'pdfs/proveido_14820_25_deposito.pdf'
          },
          {
            id: 'act-14820-2',
            hasDoc: false,
            hasIndi: true,
            creado: '05/11/2026 18:14',
            publicado: '06/11/2026 07:15',
            folio: '187',
            descripcion: 'ACTIVA TRAMITE - Acredita boleta depósito NBCh S.A.',
            generadoEn: 'INDI'
          },
          {
            id: 'act-14820-3',
            hasDoc: true,
            hasIndi: false,
            creado: '20/10/2026 10:15',
            publicado: '20/10/2026 12:00',
            folio: '186',
            descripcion: 'REGULACION DE HONORARIOS PROFESIONALES',
            generadoEn: 'JUZGADO CIVIL Y COMERCIAL N° 3',
            pdfFile: 'pdfs/proveido_14820_25_deposito.pdf'
          }
        ],
        borradoresGenerados: []
      },
      {
        id: 'causa-8310-24',
        expteNo: '8.310/24',
        expteIure: '8310/2024-1-L',
        caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO INCAUSADO',
        juzgado: 'Juzgado del Trabajo N° 1 - Resistencia',
        dependencia: 'JUZGADO DEL TRABAJO N° 1 - RESISTENCIA',
        fuero: 'Laboral',
        cliente: 'Gómez, María Elena',
        clienteDoc: 'DNI 28.445.892',
        clienteCuit: '27-28445892-3',
        actor: 'Gómez, María Elena',
        demandado: 'Constructora Litoral S.R.L.',
        tipoTramite: 'COMPLEJO',
        tipoActoLabel: 'Trámite Complejo (Pericia Contable / Liquidación)',
        tipoAcceso: 'Libre',
        motivo: 'NOTIFICACION ART. 155 DEL CPCCCh',
        clasificacion: '[Agregar etiqueta]',
        revisado: false,
        estadoProcesal: 'Salió a despacho - Traslado de liquidación e impugnación de pericia',
        monto: 'Diferencias salariales y liquidación distracto LCT',
        pdfFile: 'pdfs/proveido_8310_24_traslado_pericia.pdf',
        pdfTitle: 'Proveído 8.310/24 - Pericia Contable LCT',
        token: 'PJCH-LAB1-2026-8310-PER',
        hash: '89df201ba47c9201f3e1',
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
        proveidoTexto: `Resistencia, ${dateLaboralStr}. Agréguese la pericia contable presentada por el Perito Contador Oficial CP. Jorge Valenzuela. Del informe pericial practicado y la liquidación de rubros indemnizatorios por distracto laboral incausado (arts. 232, 233, 245 de la LCT N° 20.744), córrase traslado a las partes por el término perentorio de CINCO (5) DÍAS HÁBILES bajo apercibimiento de ley. Notifíquese conforme Art. 155 del CPCCCh y Acordada STJ Chaco N° 3145. - Fdo. Dr. Raúl Benítez (Juez Laboral)`.trim(),
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
        actuaciones: [
          {
            id: 'act-8310-1',
            hasDoc: true,
            hasIndi: false,
            creado: `${dateLaboralStr} 08:45`,
            publicado: `${dateLaboralStr} 11:20`,
            folio: '148',
            descripcion: 'Traslado pericia contable oficial por 5 días hábiles (Art. 155 CPCCCh)',
            generadoEn: 'JUZGADO DEL TRABAJO N° 1',
            pdfFile: 'pdfs/proveido_8310_24_traslado_pericia.pdf'
          },
          {
            id: 'act-8310-2',
            hasDoc: false,
            hasIndi: true,
            creado: '02/11/2026 14:10',
            publicado: '03/11/2026 07:15',
            folio: '142',
            descripcion: 'INDI - Presenta informe pericial contable Perito Oficial',
            generadoEn: 'INDI'
          },
          {
            id: 'act-8310-3',
            hasDoc: true,
            hasIndi: false,
            creado: '15/10/2026 09:00',
            publicado: '15/10/2026 10:30',
            folio: '141',
            descripcion: 'CONCEDER PRORROGA P/ CONTESTAR TRASLADO',
            generadoEn: 'JUZGADO DEL TRABAJO N° 1',
            pdfFile: 'pdfs/proveido_8310_24_traslado_pericia.pdf'
          }
        ],
        borradoresGenerados: []
      },
      {
        id: 'causa-3105-23',
        expteNo: '3.105/23',
        expteIure: '3105/2023-1-C',
        caratula: 'BANCO DEL CHACO S.A. C/ RODRIGUEZ LUIS S/ JUICIO EJECUTIVO',
        juzgado: 'Juzgado Civil y Comercial N° 7 - Resistencia',
        dependencia: 'JUZGADO CIVIL Y COMERCIAL N° 7 - SEC. CIVIL - RESISTENCIA',
        fuero: 'Civil y Comercial (Ejecutivo)',
        cliente: 'Rodríguez, Luis Alberto',
        clienteDoc: 'DNI 17.892.401',
        clienteCuit: '20-17892401-8',
        actor: 'Nuevo Banco del Chaco S.A.',
        demandado: 'Rodríguez, Luis Alberto (DNI 17.892.401)',
        tipoTramite: 'CADUCIDAD_PENDIENTE',
        tipoActoLabel: 'Alerta Caducidad / Incidente Embargo (Art. 310 CPCC)',
        tipoAcceso: 'Libre',
        motivo: 'NOTIFICACION ART. 155 DEL CPCCCh',
        clasificacion: '[Agregar etiqueta]',
        revisado: false,
        estadoProcesal: 'ALERTA DE CADUCIDAD: 78 días sin impulso procesal de la contraria',
        monto: 'Embargo sobre haberes en exceso de Dec. 484/87',
        pdfFile: 'pdfs/proveido_3105_23_intimacion_caducidad.pdf',
        pdfTitle: 'Proveído 3.105/23 - Intimación y Embargo',
        token: 'PJCH-CIV7-2026-3105-CAD-INC',
        hash: 'f4103ab62194cc08e715',
        fechaUltimoMovimiento: dateCaducidadStr,
        inactividadDias: 78,
        subcausas: [
          {
            id: 'sub-3105-1',
            titulo: 'Incidente de Levantamiento de Embargo de Haberes',
            caratula: 'RODRIGUEZ LUIS S/ LEVANTAMIENTO DE EMBARGO EN AUTOS PRINCIPALES',
            juzgado: 'Juzgado Civil y Comercial N° 7',
            estado: 'Contestó vista el ejecutante. A la espera de auto resolutorio.',
            fecha: '2026-06-20'
          },
          {
            id: 'sub-3105-2',
            titulo: 'Beneficio de Litigar sin Gastos (Art. 78 CPCC Chaco)',
            caratula: 'RODRIGUEZ LUIS S/ BENEFICIO DE LITIGAR SIN GASTOS',
            juzgado: 'Juzgado Civil y Comercial N° 7',
            estado: 'Concesión provisoria otorgada por el juzgado',
            fecha: '2026-05-11'
          }
        ],
        proveidoTexto: `Resistencia, ${dateCaducidadStr}. Atento al estado de autos y no habiéndose instado el procedimiento por la parte actora ejecutante, téngase presente. Autos a despacho para lo que por derecho corresponda. Intímase a las partes bajo apercibimiento de evaluar caducidad de instancia (art. 310 CPCCCh). Notifíquese por cédula electrónica conforme Art. 155 CPCCCh.`.trim(),
        plazo: null,
        watchdogCaducidad: {
          inactiveDays: 78,
          limitDays: 90,
          remainingDays: 12,
          percentageConsumed: 87,
          statusLevel: 'CRITICAL',
          statusMessage: 'ALERTA CRÍTICA: Restan solo 12 días corridos para la caducidad (87% consumido). Presentar escrito impulsor urgente.'
        },
        actuaciones: [
          {
            id: 'act-3105-1',
            hasDoc: true,
            hasIndi: false,
            creado: `${dateCaducidadStr} 10:40`,
            publicado: `${dateCaducidadStr} 12:15`,
            folio: '104',
            descripcion: 'Intimación de impulso e incidente levantamiento de embargo (Art. 155 CPCCCh)',
            generadoEn: 'JUZGADO CIVIL Y COMERCIAL N° 7',
            pdfFile: 'pdfs/proveido_3105_23_intimacion_caducidad.pdf'
          },
          {
            id: 'act-3105-2',
            hasDoc: true,
            hasIndi: false,
            creado: '14/07/2026 08:30',
            publicado: '14/07/2026 09:45',
            folio: '92',
            descripcion: 'cedula diligenciada con informe negativo (no vive allí)',
            generadoEn: 'JUZGADO CIVIL Y COMERCIAL N° 7',
            pdfFile: 'pdfs/proveido_3105_23_intimacion_caducidad.pdf'
          },
          {
            id: 'act-3105-3',
            hasDoc: true,
            hasIndi: false,
            creado: '20/05/2026 11:10',
            publicado: '20/05/2026 12:30',
            folio: '89',
            descripcion: 'VISTA P/ RESOLUCION',
            generadoEn: 'JUZGADO CIVIL Y COMERCIAL N° 7',
            pdfFile: 'pdfs/proveido_3105_23_intimacion_caducidad.pdf'
          }
        ],
        borradoresGenerados: []
      }
    ];
  },

  getInitialNotifications() {
    const today = new Date().toISOString().split('T')[0];
    return [
      {
        id: 'notif-001',
        origen: 'Poder Judicial del Chaco (IURE / INDI)',
        remitente: 'notificaciones-iure@justiciachaco.gov.ar',
        asunto: 'PJ Chaco - Causa Salió a Despacho - Expte. 14.820/25',
        fecha: `${today} 07:15`,
        expteNo: '14.820/25',
        expteIure: '14820/2025-1-C',
        caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS',
        juzgado: 'Juzgado Civil y Comercial N° 3',
        dependencia: 'JUZGADO CIVIL Y COMERCIAL N° 3 - RESISTENCIA',
        motivo: 'NOTIFICACION ART. 155 DEL CPCCCh',
        tipoAcceso: 'Libre',
        clasificacion: '[Agregar etiqueta]',
        revisado: false,
        resumen: 'Se acreditó el depósito judicial por $1.850.000. Traslado para denunciar CBU y manifestar conformidad.',
        leido: false,
        tipoTramite: 'SIMPLE',
        pdfFile: 'pdfs/proveido_14820_25_deposito.pdf',
        causaId: 'causa-14820-25'
      },
      {
        id: 'notif-002',
        origen: 'Poder Judicial del Chaco (IURE / INDI)',
        remitente: 'notificaciones-iure@justiciachaco.gov.ar',
        asunto: 'PJ Chaco - Causa Salió a Despacho - Expte. 8.310/24',
        fecha: `${today} 07:22`,
        expteNo: '8.310/24',
        expteIure: '8310/2024-1-L',
        caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S/ DESPIDO',
        juzgado: 'Juzgado del Trabajo N° 1',
        dependencia: 'JUZGADO DEL TRABAJO N° 1 - RESISTENCIA',
        motivo: 'NOTIFICACION ART. 155 DEL CPCCCh',
        tipoAcceso: 'Libre',
        clasificacion: '[Agregar etiqueta]',
        revisado: false,
        resumen: 'Presentación de pericia contable oficial. Traslado de liquidación por 5 días hábiles.',
        leido: false,
        tipoTramite: 'COMPLEJO',
        pdfFile: 'pdfs/proveido_8310_24_traslado_pericia.pdf',
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
  currentGeneratedDraft: null,
  currentPdfData: null,
  highlightFilters: {
    deadline: true,
    amount: true,
    law: true
  },
  pdfViewMode: 'official', // 'official' | 'binary'
  activeAiProvider: 'claude' // 'claude' | 'chatgpt' | 'gemini'
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

  // Modos de visualización en el Visor de PDF
  const btnOfficial = document.getElementById('btnModeOfficialView');
  if (btnOfficial) btnOfficial.addEventListener('click', () => setPdfViewMode('official'));
  const btnBinary = document.getElementById('btnModeNativeBinary');
  if (btnBinary) btnBinary.addEventListener('click', () => setPdfViewMode('binary'));

  // Filtros de Resaltado en PDF
  const tagDl = document.getElementById('toggleTagDeadline');
  if (tagDl) tagDl.addEventListener('click', () => toggleHighlightFilter('deadline'));
  const tagAm = document.getElementById('toggleTagAmount');
  if (tagAm) tagAm.addEventListener('click', () => toggleHighlightFilter('amount'));
  const tagLw = document.getElementById('toggleTagLaw');
  if (tagLw) tagLw.addEventListener('click', () => toggleHighlightFilter('law'));

  // Copiar texto del proveído
  const btnCopyFull = document.getElementById('btnCopyFullProveidoText');
  if (btnCopyFull) {
    btnCopyFull.addEventListener('click', () => {
      if (STATE.currentPdfData && STATE.currentPdfData.proveidoTexto) {
        navigator.clipboard.writeText(STATE.currentPdfData.proveidoTexto);
        showToast('Texto judicial copiado al portapapeles', 'success');
      }
    });
  }

  // Copiar capa de texto en analizador
  const btnCopyRaw = document.getElementById('btnCopyExtractedRawText');
  if (btnCopyRaw) {
    btnCopyRaw.addEventListener('click', () => {
      const viewer = document.getElementById('analysisRawTextViewer');
      if (viewer && viewer.textContent) {
        navigator.clipboard.writeText(viewer.textContent);
        showToast('Texto extraído copiado al portapapeles', 'success');
      }
    });
  }

  setupPdfDropZone();
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
// BANDEJA DIARIA ("LISTADO DE RECORRIDA" - IURE / INDI / Lex - PJ CHACO)
// ============================================================================
function renderInbox() {
  const container = document.getElementById('inboxList');
  const badgeCount = document.getElementById('inboxBadgeCounter');
  
  const unreadCount = STATE.notifications.filter(n => !n.leido).length;
  badgeCount.textContent = `${unreadCount} nuevas`;

  if (STATE.notifications.length === 0) {
    container.innerHTML = '<div style="color: #64748b; font-size: 0.8rem; text-align: center; padding: 20px;">No hay expedientes con movimiento en la recorrida de hoy.</div>';
    return;
  }

  container.innerHTML = STATE.notifications.map(n => `
    <div class="inbox-item ${n.leido ? '' : 'unread'}" onclick="handleInboxItemClick('${n.id}', '${n.causaId}')">
      <div class="inbox-item-header">
        <span class="inbox-item-origin">🏛️ ${n.dependencia || n.juzgado}</span>
        <span class="inbox-item-time">${n.fecha}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin: 4px 0;">
        <div class="inbox-item-expte">
          <strong>IURE:</strong> ${n.expteIure || '14820/2025-1-C'} • <strong>Lex:</strong> ${n.expteNo}
        </div>
        <span class="badge-atencion">Atención</span>
      </div>
      <div style="margin: 4px 0; display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
        <span class="badge-motivo">NOTIFICACION ART. 155 DEL CPCCCh</span>
        <span class="badge-acceso ${n.tipoAcceso === 'RESERVADO' ? 'reservado' : 'libre'}">${n.tipoAcceso || 'Libre'}</span>
        <span style="font-size: 0.7rem; color: #94a3b8;">${n.clasificacion || '[Agregar etiqueta]'}</span>
      </div>
      <div class="inbox-item-desc" style="font-size: 0.82rem; color: #cbd5e1; margin-top: 4px;">${n.resumen}</div>
      <div class="inbox-item-pdf-bar">
        <button class="btn-pdf-view" onclick="event.stopPropagation(); openPdfViewerForNotification('${n.id}')">
          📄 Ver PDF del Juzgado (Proveído Original)
        </button>
        <button class="btn btn-secondary" style="font-size: 0.72rem; padding: 4px 8px;" onclick="event.stopPropagation(); executeAiTaskForNotification('${n.id}')">
          ⚡ Ejecutar con tu IA
        </button>
      </div>
    </div>
  `).join('');
}

async function simulateIncomingDispatch() {
  try {
    showToast('Simulando procesamiento de Recorrida IURE / INDI a las 07:00 hs...', 'warning');
    const data = await API.request(`/api/tenants/${STATE.currentTenantId}/simulate-dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: STATE.currentRole === 'ADMIN' ? 'Dr. Gómez' : 'Secretario' })
    });
    
    if (data.success) {
      showToast(`¡Recorrida procesada! Expte. ${data.notification.expteNo} ingresado con Notif. Art. 155.`, 'success');
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
// CAUSAS Y SUB-CAUSAS (ÁRBOL PROCESAL + MOTOR DE PLAZOS + HISTORIA IURE)
// ============================================================================
function renderCurrentTab() {
  const causesView = document.getElementById('causesTabView');
  const deadlinesView = document.getElementById('deadlinesTabView');
  const auditView = document.getElementById('auditTabView');
  const pdfView = document.getElementById('pdfAnalyzerTabView');

  causesView.style.display = 'none';
  deadlinesView.style.display = 'none';
  auditView.style.display = 'none';
  if (pdfView) pdfView.style.display = 'none';

  if (STATE.activeTab === 'causes') {
    causesView.style.display = 'block';
    renderCauses();
  } else if (STATE.activeTab === 'deadlines') {
    deadlinesView.style.display = 'block';
    renderDeadlinesMonitor();
  } else if (STATE.activeTab === 'audit') {
    auditView.style.display = 'block';
    renderAuditLog();
  } else if (STATE.activeTab === 'pdf-analyzer') {
    if (pdfView) {
      pdfView.style.display = 'block';
      renderPdfAnalyzerView();
    }
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
      (c.expteIure && c.expteIure.toLowerCase().includes(STATE.searchQuery)) ||
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
    const actuaciones = c.actuaciones || [
      {
        id: `act-${c.id}-1`,
        hasDoc: true,
        hasIndi: false,
        creado: '06/11/2026 09:30',
        publicado: '06/11/2026 12:25',
        folio: '188',
        descripcion: c.estadoProcesal || 'Proveído judicial en autos',
        generadoEn: c.juzgado,
        pdfFile: c.pdfFile || 'pdfs/proveido_14820_25_deposito.pdf'
      }
    ];

    return `
      <div class="cause-card" id="cause-${c.id}">
        <div class="cause-card-header">
          <div class="cause-title-group">
            <h3>Lex N° ${c.expteNo}  |  IURE N° ${c.expteIure || '14820/2025-1-C'} - "${c.caratula}"</h3>
            <div class="cause-meta-court">
              🏛️ ${c.dependencia || c.juzgado} • 👤 Cliente: <strong>${c.cliente || 'S/D'}</strong> (${c.clienteDoc || ''})
            </div>
          </div>
          <div class="cause-badges">
            <span class="badge-atencion">Atención</span>
            <span class="badge-motivo">NOTIFICACIÓN ART. 155</span>
            <span class="badge-acceso libre">${c.tipoAcceso || 'Libre'}</span>
            <span class="badge-tag ${isSimple ? 'simple' : (isCaducidadRisk ? 'danger' : 'complex')}">
              ${isSimple ? 'Trámite Simple (Depósito)' : (isCaducidadRisk ? 'Alerta Caducidad' : 'Trámite Complejo')}
            </span>
          </div>
        </div>

        <div class="cause-card-body">
          <div class="proveido-box">
            <div class="proveido-header">
              <span>📄 Último Proveído Judicial Notificado (IURE / Art. 155 CPCCCh)</span>
              <button class="btn btn-pdf-view" style="font-size: 0.72rem; padding: 2px 8px;" onclick="openPdfViewerForCause('${c.id}')">
                📄 Ver PDF Oficial
              </button>
            </div>
            <div class="proveido-text">"${c.proveidoTexto || 'Sin proveído cargado'}"</div>
          </div>

          <div class="deadlines-row">
            <div class="deadline-pill">
              <div class="deadline-pill-label">📅 Plazo Procesal Hábil (CPCC Chaco)</div>
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

          <!-- SECCIÓN: ADENTRO DEL EXPEDIENTE (HISTORIA / ACTUACIONES PROCESALES IURE / INDI) -->
          <div class="expte-history-section">
            <div class="expte-history-header">
              <h4><span>📜</span> Adentro del Expediente: Historia & Actuaciones Procesales (IURE / INDI)</h4>
              <div class="expte-history-actions">
                <button class="btn-iure-action" onclick="showToast('Verificando posible trámite en IURE...', 'success')">
                  🔍 Verificar trámite IURE
                </button>
                <button class="btn-iure-action" onclick="showToast('Sin cambios de radicación en la causa', 'success')">
                  🔄 Consultar radicación
                </button>
                <a class="btn-iure-action" href="${c.pdfFile || 'pdfs/proveido_14820_25_deposito.pdf'}" download>
                  ⬇ Descargar PDF combinado
                </a>
                <button class="btn-iure-action" onclick="showToast('Enlace de consulta enviado a tu correo', 'success')">
                  ✉ Enviar enlace
                </button>
              </div>
            </div>

            <div class="actuaciones-table-wrapper">
              <table class="actuaciones-table">
                <thead>
                  <tr>
                    <th style="width: 25px;"><input type="checkbox" checked title="Seleccionar"></th>
                    <th>Documentos</th>
                    <th>INDI</th>
                    <th>Creado/Presentado</th>
                    <th>Publicado</th>
                    <th>Folio</th>
                    <th>Descripción de la Actuación</th>
                    <th>Generado en</th>
                  </tr>
                </thead>
                <tbody>
                  ${actuaciones.map(act => `
                    <tr>
                      <td><input type="checkbox" checked></td>
                      <td>
                        ${act.hasDoc ? `
                          <button class="btn-actuacion-doc" onclick="openPdfViewerForCause('${c.id}')">
                            📄 [Ver Documento]
                          </button>
                        ` : '<span style="color: #64748b;">-</span>'}
                      </td>
                      <td>
                        ${act.hasIndi ? `
                          <button class="btn-actuacion-indi" onclick="showToast('Descarga individual INDI: Principal y adjuntos descargados', 'success')">
                            📥 [Ver Presentación] ↓ Principal
                          </button>
                        ` : '<span style="color: #64748b;">-</span>'}
                      </td>
                      <td style="white-space: nowrap; font-size: 0.72rem;">${act.creado}</td>
                      <td style="white-space: nowrap; font-size: 0.72rem; color: #34d399;">${act.publicado}</td>
                      <td style="font-weight: 700; color: #fbbf24;">${act.folio}</td>
                      <td style="font-weight: 500;">${act.descripcion}</td>
                      <td style="font-size: 0.7rem; color: #94a3b8;">${act.generadoEn}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="subcauses-section" style="margin-top: 14px;">
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
            <button class="btn btn-secondary btn-pdf-view" onclick="openPdfViewerForCause('${c.id}')">
              📄 Ver PDF del Juzgado (Proveído Original)
            </button>

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

// ============================================================================
// WORKSPACE DE PDFs JUDICIALES & EXTRACTOR SPLIT-SCREEN (PJ CHACO)
// ============================================================================
const PDF_WORKSPACE = {
  samples: [
    {
      id: 'sample-14820-25',
      fileName: 'proveido_14820_25_deposito.pdf',
      filePath: 'pdfs/proveido_14820_25_deposito.pdf',
      expteNo: '14.820/25',
      expteIure: '14820/2025-1-C',
      caratula: 'PEREZ JUAN CARLOS C/ SEGUROS DEL NORTE S.A. S/ DAÑOS Y PERJUICIOS',
      juzgado: 'Juzgado Civil y Comercial N° 3 - Resistencia',
      dependencia: 'JUZGADO CIVIL Y COMERCIAL N° 3 - SEC. CIVIL - RESISTENCIA',
      fuero: 'Civil y Comercial',
      actor: 'Pérez, Juan Carlos (DNI 24.112.980)',
      demandado: 'Seguros del Norte S.A. (Citada en Garantía)',
      tipoActoLabel: 'Trámite Simple (Dación en Pago / Depósito)',
      tipoTramite: 'SIMPLE',
      monto: '$1.850.000,00',
      banco: 'Nuevo Banco del Chaco S.A. (Cuenta Judicial N° 23984/02)',
      plazoDias: 5,
      plazoLabel: '5 días hábiles judiciales',
      vencimiento: '13/11/2026',
      gracia: '16/11/2026 09:00 hs (Art. 124 CPCC Chaco)',
      normativa: 'Arts. 135, 155, 498 CPCC Chaco (Ley 2559-M); Acordada STJ N° 3145',
      token: 'PJCH-CIV3-2026-14820-DEP',
      hash: 'b7c419e048d2aa81902f',
      signers: [
        ['Jueza Civil y Comercial N° 3', 'Dra. Elena Ruiz'],
        ['Secretario de Juzgado', 'Dr. Carlos Altamirano']
      ],
      proveidoTexto: `Resistencia (Chaco), 06 de Noviembre de 2026.\n\n1. Por presentado en legal tiempo y forma el letrado apoderado de la citada en garantía SEGUROS DEL NORTE S.A., por constituido el domicilio procesal y electrónico oportunamente manifestado en el sistema IURE / INDI del Poder Judicial.\n\n2. Agréguese a fojas 188 la constancia y boleta de depósito judicial remitida electrónicamente por la entidad bancaria. En su mérito, téngase por acreditado en autos el depósito judicial efectuado en la cuenta judicial N° 23984/02 del Nuevo Banco del Chaco S.A. (Sucursal Casa Central Resistencia) a la orden de este Juzgado, por la suma total de PESOS UN MILLÓN OCHOCIENTOS CINCUENTA MIL ($1.850.000,00) en concepto de capital de condena e intereses devengados.\n\n3. Del depósito acreditado, córrase traslado a la parte actora por el término perentorio de ley de CINCO (5) DÍAS HÁBILES JUDICIALES a fin de que: a) Manifieste si presta expresa conformidad con la dación en pago efectuada; b) Denuncie número de Clave Bancaria Uniforme (CBU), clave Alias y entidad bancaria a su nombre y orden a los fines de librar la pertinente orden de transferencia judicial electrónica de fondos, bajo apercibimiento de ley (arts. 135, 155, 498 y concordantes del Código Procesal Civil y Comercial del Chaco, Ley 2559-M).\n\n4. Notifíquese a las partes por cédula electrónica conforme Acordada STJ Chaco N° 3145 y Art. 155 del CPCCCh.\n\nDra. Elena Ruiz (Juez Titular) - Dr. Carlos Altamirano (Secretario)`,
      badge: 'Trámite Simple • Depósito $1.850.000',
      badgeClass: 'badge-simple',
      summary: 'Acreditación de depósito por $1.850.000 de la aseguradora en el Nuevo Banco del Chaco S.A. y traslado por 5 días para denunciar CBU y manifestar conformidad.',
      causeId: 'causa-14820-25'
    },
    {
      id: 'sample-8310-24',
      fileName: 'proveido_8310_24_traslado_pericia.pdf',
      filePath: 'pdfs/proveido_8310_24_traslado_pericia.pdf',
      expteNo: '8.310/24',
      expteIure: '8310/2024-1-L',
      caratula: 'GOMEZ MARIA ELENA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO INCAUSADO',
      juzgado: 'Juzgado del Trabajo N° 1 - Resistencia',
      dependencia: 'JUZGADO DEL TRABAJO N° 1 - RESISTENCIA',
      fuero: 'Laboral',
      actor: 'Gómez, María Elena (DNI 28.445.892)',
      demandado: 'Constructora Litoral S.R.L.',
      tipoActoLabel: 'Trámite Complejo (Pericia Contable / Liquidación)',
      tipoTramite: 'COMPLEJO',
      monto: 'Diferencias salariales e indemnización distracto LCT',
      banco: 'Cuenta Judicial Fuero Laboral',
      plazoDias: 5,
      plazoLabel: '5 días hábiles judiciales (Perentorio)',
      vencimiento: '11/11/2026',
      gracia: '12/11/2026 09:00 hs (Art. 124 CPCC Chaco)',
      normativa: 'Arts. 232, 233, 245 LCT N° 20.744; Art. 76 Ley Procesal Laboral Chaco Ley 2383-L / Art. 155 CPCCCh',
      token: 'PJCH-LAB1-2026-8310-PER',
      hash: '89df201ba47c9201f3e1',
      signers: [
        ['Juez del Trabajo N° 1', 'Dr. Raúl Benítez'],
        ['Secretaria de Juzgado', 'Dra. Patricia Morales']
      ],
      proveidoTexto: `Resistencia (Chaco), 04 de Noviembre de 2026.\n\n1. Téngase por recibido y agréguese a fojas 142/148 el informe pericial contable producido en autos por el Perito Contador Oficial CP. Jorge Valenzuela, conjuntamente con los anexos de cálculo y determinación de la remuneración base devengada.\n\n2. De la pericia contable presentada y de la liquidación de rubros indemnizatorios por distracto laboral incausado practicada de conformidad con los arts. 232, 233 y 245 de la Ley de Contrato de Trabajo N° 20.744 y multas de la Ley Nacional de Empleo N° 24.013, córrase traslado a las partes por el término perentorio de CINCO (5) DÍAS HÁBILES bajo expreso apercibimiento de ley (art. 76 Ley Procesal Laboral del Chaco Ley 2383-L / CPCC Chaco art. 155).\n\n3. Hágase saber a las partes litigantes que las impugnaciones, observaciones técnicas o pedidos de explicaciones que pretendan formular respecto al dictamen contable deberán ser debidamente fundadas, indicando de modo concreto las partidas y registraciones cuestionadas, bajo apercibimiento de desestimación in limine.\n\n4. Notifíquese conforme Art. 155 CPCCCh a los domicilios electrónicos constituidos con habilitación de días y horas inhábiles.\n\nDr. Raúl Benítez (Juez Laboral) - Dra. Patricia Morales (Secretaria)`,
      badge: 'Trámite Complejo • Pericia Contable LCT',
      badgeClass: 'badge-complex',
      summary: 'Traslado perentorio por 5 días de liquidación por despido y dictamen pericial contable de fs. 142/148 bajo apercibimiento de ley.',
      causeId: 'causa-8310-24'
    },
    {
      id: 'sample-3105-23',
      fileName: 'proveido_3105_23_intimacion_caducidad.pdf',
      filePath: 'pdfs/proveido_3105_23_intimacion_caducidad.pdf',
      expteNo: '3.105/23 (Incidente 1)',
      expteIure: '3105/2023-1-C',
      caratula: 'NUEVO BANCO DEL CHACO S.A. C/ RODRIGUEZ LUIS ALBERTO S/ JUICIO EJECUTIVO',
      juzgado: 'Juzgado Civil y Comercial N° 7 - Resistencia',
      dependencia: 'JUZGADO CIVIL Y COMERCIAL N° 7 - SEC. CIVIL - RESISTENCIA',
      fuero: 'Civil y Comercial',
      actor: 'Nuevo Banco del Chaco S.A.',
      demandado: 'Rodríguez, Luis Alberto (DNI 17.892.401)',
      tipoActoLabel: 'Alerta Caducidad / Incidente Embargo (Art. 310 CPCC)',
      tipoTramite: 'CADUCIDAD',
      monto: 'Embargo de haberes en exceso de Dec. 484/87',
      banco: 'Nuevo Banco del Chaco S.A.',
      plazoDias: 5,
      plazoLabel: '5 días hábiles (Incidente de Embargo)',
      vencimiento: '27/08/2026',
      gracia: '28/08/2026 09:00 hs',
      normativa: 'Art. 310 inc. 1 CPCC Chaco (Ley 2559-M); Dec. Nac. 484/87 / Art. 155 CPCCCh',
      token: 'PJCH-CIV7-2026-3105-CAD-INC',
      hash: 'f4103ab62194cc08e715',
      signers: [
        ['Jueza Civil y Comercial N° 7', 'Dra. Viviana Maidana'],
        ['Secretario de Juzgado', 'Dr. Marcos Romero']
      ],
      proveidoTexto: `Resistencia (Chaco), 22 de Agosto de 2026.\n\n1. Atento el estado procesal que exhiben los presentes actuados principales, y advirtiéndose que el último acto procesal de impulso útil data de fojas 89 del mes de mayo del corriente año (inactividad procesal superior a 75 días), intímase a la parte actora ejecutante a manifestar su expreso interés en la prosecución del litigio bajo expreso apercibimiento de evaluar la perención de instancia prevista en el art. 310 inc. 1 del Código Procesal Civil y Comercial del Chaco (Ley 2559-M).\n\n2. Sin perjuicio de lo proveído ut supra, y respecto al Incidente de Levantamiento de Embargo de Haberes deducido a fojas 104 del legajo incidental por el demandado Rodríguez Luis Alberto, fundado en la afectación de sumas por encima del tope máximo legal de inembargabilidad establecido en el Decreto Nacional N° 484/87, córrase traslado del mismo a la parte ejecutante por el término de CINCO (5) DÍAS HÁBILES.\n\n3. Hágase saber a la entidad ejecutante que deberá acompañar liquidación actualizada del crédito reclamado. Notifíquese por cédula electrónica conforme Art. 155 CPCCCh a los letrados intervinientes.\n\nDra. Viviana Maidana (Jueza Titular) - Dr. Marcos Romero (Secretario)`,
      badge: 'Alerta Caducidad • Levantamiento Embargo',
      badgeClass: 'badge-danger',
      summary: 'Intimación de impulso procesal por inactividad (art. 310 CPCCCh) e incidente de levantamiento de embargo de haberes (Dec. 484/87).',
      causeId: 'causa-3105-23'
    },
    {
      id: 'sample-escrito',
      fileName: 'escrito_modelo_acepta_deposito_cbu.pdf',
      filePath: 'pdfs/escrito_modelo_acepta_deposito_cbu.pdf',
      expteNo: '14.820/25',
      expteIure: '14820/2025-1-C',
      caratula: 'PEREZ JUAN CARLOS C/ SEGUROS DEL NORTE S.A. S/ DAÑOS Y PERJUICIOS',
      juzgado: 'Juzgado Civil y Comercial N° 3 - Resistencia',
      dependencia: 'ESTUDIO JURÍDICO DR. MARCELO GÓMEZ (M.P. 4582 STJCh)',
      fuero: 'Civil y Comercial',
      actor: 'Pérez, Juan Carlos',
      demandado: 'Seguros del Norte S.A.',
      tipoActoLabel: 'Modelo Procesal Formal (Acepta Depósito & CBU)',
      tipoTramite: 'SIMPLE',
      monto: '$1.850.000,00',
      banco: 'Nuevo Banco del Chaco S.A. (CBU 3110030200000123456789)',
      plazoDias: 0,
      plazoLabel: 'En término procesal',
      vencimiento: 'Presentado en plazo de ley',
      gracia: 'No requiere plazo de gracia',
      normativa: 'Arts. 135 y 498 CPCC Chaco (Ley 2559-M)',
      token: 'EST-GOMEZ-2026-PRESENTACION',
      hash: 'e92a488b13d80912cb14',
      signers: [
        ['Abogado Apoderado M.P. 4582 STJ Chaco', 'Dr. Marcelo Gómez']
      ],
      proveidoTexto: `SEÑOR JUEZ CIVIL Y COMERCIAL N° 3:\n\nMARCELO GÓMEZ, Abogado inscripto en la matrícula profesional del Superior Tribunal de Justicia del Chaco bajo el T° V F° 124 M.P. N° 4582, CUIT 20-28945612-7, apoderado legal de la parte actora JUAN CARLOS PÉREZ en los autos caratulados: 'PEREZ JUAN CARLOS C/ SEGUROS DEL NORTE S.A. S/ DAÑOS Y PERJUICIOS' (Expte. N° 14.820/25), constituyendo domicilio electrónico oficial en el sistema IURE / INDI, respetuosamente me presento ante V.S. y digo:\n\nI. OBJETO: Que en cumplimiento del proveído notificado en fecha 06/11/2026, vengo en legal tiempo y forma a manifestar la expresa conformidad de mi mandante con el depósito judicial acreditado en autos por la citada en garantía SEGUROS DEL NORTE S.A., por la suma total de PESOS UN MILLÓN OCHOCIENTOS CINCUENTA MIL ($1.850.000,00), teniéndolo por imputado en concepto de pago de capital e intereses devengados.\n\nII. DENUNCIA DE CBU Y CUENTA BANCARIA: A fin de que se proceda a efectivizar el pago mediante transferencia judicial bancaria directa conforme acordadas del STJ Chaco, denuncio los datos de la cuenta bancaria de titularidad exclusiva de mi representado:\n  * Titular: Juan Carlos Pérez (DNI 24.112.980 - CUIT 20-24112980-4)\n  * Banco Receptor: Nuevo Banco del Chaco S.A. (Sucursal Casa Central Resistencia)\n  * Tipo de Cuenta: Caja de Ahorro en Pesos N° 00482910/05\n  * CBU: 3110030200000123456789\n  * Alias CBU: PEREZ.COBRO.CHACO\n\nIII. SOLICITA TRANSFERENCIA JUDICIAL ELECTRÓNICA: Se ordene librar oficio electrónico al Nuevo Banco del Chaco S.A. a efectos de transferir los fondos depositados en la cuenta judicial a la cuenta bancaria denunciada.\n\nIV. PETITORIO: Por todo lo expuesto, a V.S. solicito: 1) Tenga por contestado el traslado en tiempo y forma; 2) Tenga por prestada la conformidad con el pago; 3) Tenga por denunciada la CBU y ordene la transferencia judicial correspondiente. Proveer de conformidad, SERÁ JUSTICIA.`,
      badge: 'Modelo Procesal Formal • CBU & Giro',
      badgeClass: 'badge-gold',
      summary: 'Escrito formal del letrado aceptando dación en pago, denunciando CBU / Alias y solicitando orden de transferencia judicial.',
      causeId: 'causa-14820-25'
    }
  ]
};

// ============================================================================
// FUNCIONES DEL ANALIZADOR DE PDFs Y VISOR SPLIT-SCREEN
// ============================================================================
function setupPdfDropZone() {
  const dropZone = document.getElementById('pdfDropZone');
  const fileInput = document.getElementById('pdfFileInput');
  if (!dropZone || !fileInput) return;

  dropZone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePdfFileUpload(e.target.files[0]);
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handlePdfFileUpload(files[0]);
    }
  });
}

function renderPdfAnalyzerView() {
  renderSamplePdfs();
  setupPdfDropZone();
}

function renderSamplePdfs() {
  const container = document.getElementById('samplePdfsGrid');
  if (!container) return;

  container.innerHTML = PDF_WORKSPACE.samples.map(s => `
    <div class="sample-pdf-card" id="card-${s.id}">
      <div>
        <span class="sample-pdf-badge ${s.badgeClass}">${s.badge}</span>
        <h4>${s.fileName}</h4>
        <div class="court-subtitle">${s.juzgado}</div>
        <p>${s.summary}</p>
      </div>
      <div class="sample-pdf-actions">
        <button class="btn btn-primary" style="font-size: 0.74rem; padding: 4px 10px;" onclick="analyzePdfSample('${s.id}')">
          🔍 Analizar y Extraer
        </button>
        <button class="btn btn-secondary btn-pdf-view" onclick="openPdfViewerForSample('${s.id}')">
          📄 Ver en Visor Split
        </button>
        <a class="btn btn-secondary" style="font-size: 0.74rem; padding: 4px 10px;" href="${s.filePath}" download>
          💾 Descargar .pdf
        </a>
      </div>
    </div>
  `).join('');
}

function analyzePdfSample(sampleId) {
  const sample = PDF_WORKSPACE.samples.find(s => s.id === sampleId);
  if (!sample) return;

  document.querySelectorAll('.sample-pdf-card').forEach(c => c.classList.remove('active'));
  const cardEl = document.getElementById(`card-${sampleId}`);
  if (cardEl) cardEl.classList.add('active');

  const panel = document.getElementById('analyzerResultsPanel');
  panel.style.display = 'block';

  document.getElementById('analysisStatusBadge').textContent = 'Documento Oficial PJ Chaco - 100% Precisión';
  document.getElementById('analysisStatusBadge').className = `sample-pdf-badge ${sample.badgeClass}`;
  document.getElementById('analysisFileName').textContent = `${sample.fileName} (${sample.tipoActoLabel})`;

  document.getElementById('chipExpte').textContent = `${sample.expteNo} (IURE: ${sample.expteIure || 'N/A'})`;
  document.getElementById('chipCaratula').textContent = sample.caratula;
  document.getElementById('chipJuzgado').textContent = sample.juzgado;
  document.getElementById('chipTipoActo').textContent = sample.tipoActoLabel;
  document.getElementById('chipMonto').textContent = sample.monto;
  document.getElementById('chipPlazo').textContent = sample.plazoLabel;

  const rawViewer = document.getElementById('analysisRawTextViewer');
  rawViewer.innerHTML = applySmartLegalHighlighters(sample.proveidoTexto, { deadline: true, amount: true, law: true });

  document.getElementById('analysisDiagnosticText').textContent = sample.summary;
  document.getElementById('analysisNormativaBox').innerHTML = `<strong>Normativa Aplicable:</strong> ${sample.normativa}`;

  const actionArea = document.getElementById('analysisActionButtons');
  if (sample.tipoTramite === 'SIMPLE') {
    actionArea.innerHTML = `
      <button class="btn btn-primary" style="width: 100%; margin-bottom: 8px;" onclick="generateSimplePaymentDraft('${sample.causeId || 'causa-14820-25'}')">
        ⚡ Generar Escrito Acepta Pago & CBU ($0 Costo)
      </button>
      <button class="btn btn-secondary" style="width: 100%;" onclick="openPdfViewerForSample('${sample.id}')">
        📄 Abrir en Visor Split-Screen
      </button>
    `;
  } else if (sample.tipoTramite === 'COMPLEJO') {
    actionArea.innerHTML = `
      <button class="btn btn-copilot" style="width: 100%; margin-bottom: 8px;" onclick="openCopilotAnalysis('${sample.causeId || 'causa-8310-24'}')">
        🤖 Copiloto IA: Diagnóstico & Impugnación
      </button>
      <button class="btn btn-secondary" style="width: 100%;" onclick="openPdfViewerForSample('${sample.id}')">
        📄 Abrir en Visor Split-Screen
      </button>
    `;
  } else {
    actionArea.innerHTML = `
      <button class="btn btn-outline-danger" style="width: 100%; margin-bottom: 8px;" onclick="generateAntiCaducidadMotion('${sample.causeId || 'causa-3105-23'}')">
        🛡️ Impulsar Autos (Interrumpir Caducidad)
      </button>
      <button class="btn btn-secondary" style="width: 100%;" onclick="openPdfViewerForSample('${sample.id}')">
        📄 Abrir en Visor Split-Screen
      </button>
    `;
  }

  const btnSplit = document.getElementById('btnOpenInSplitViewer');
  if (btnSplit) btnSplit.onclick = () => openPdfViewer(sample);

  const btnDl = document.getElementById('btnDownloadAnalyzedPdf');
  if (btnDl) {
    btnDl.href = sample.filePath;
    btnDl.download = sample.fileName;
  }

  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast(`Análisis completado para ${sample.fileName}`, 'success');
}

async function handlePdfFileUpload(file) {
  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    return showToast('Por favor seleccione un archivo PDF válido', 'error');
  }

  showToast(`Procesando ${file.name} localmente en el navegador...`, 'info');

  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    let binaryString = '';
    const chunkSize = 8192;
    for (let i = 0; i < uint8.length; i += chunkSize) {
      binaryString += String.fromCharCode.apply(null, uint8.subarray(i, i + chunkSize));
    }

    const rawText = extractTextFromPdfBinaryString(binaryString);
    const parsedData = extractLegalEntitiesFromText(rawText, file.name);
    const blobUrl = URL.createObjectURL(file);

    const uploadedPayload = {
      id: `uploaded-${Date.now()}`,
      fileName: file.name,
      filePath: blobUrl,
      expteNo: parsedData.expteNo,
      expteIure: parsedData.expteIure || `${parsedData.expteNo.replace('/', '-')}-C`,
      caratula: parsedData.caratula,
      juzgado: parsedData.juzgado,
      dependencia: parsedData.juzgado,
      fuero: 'Civil, Comercial o Laboral',
      actor: 'Parte Actora en autos',
      demandado: 'Parte Demandada',
      tipoActoLabel: parsedData.tipoActoLabel,
      tipoTramite: parsedData.tipoTramite,
      monto: parsedData.monto,
      banco: 'Nuevo Banco del Chaco S.A.',
      plazoDias: parsedData.plazoDias,
      plazoLabel: parsedData.plazo,
      vencimiento: 'Calculado según plazo hábil',
      gracia: '2 horas posteriores al vencimiento (Art. 124 CPCC)',
      normativa: parsedData.normativa,
      token: `UPLOAD-${Date.now().toString(36).toUpperCase()}`,
      hash: 'sha256-local-verified',
      signers: [
        ['Juez / Tribunal', 'Firma Judicial Registrada en autos'],
        ['Secretario', 'Secretaría Actuaria']
      ],
      proveidoTexto: parsedData.rawText || 'Sin texto extraíble en el documento.',
      summary: parsedData.accionSugerida,
      causeId: 'causa-14820-25'
    };

    const panel = document.getElementById('analyzerResultsPanel');
    panel.style.display = 'block';

    document.getElementById('analysisStatusBadge').textContent = 'PDF Subido por el Usuario - Procesado Localmente';
    document.getElementById('analysisStatusBadge').className = 'sample-pdf-badge badge-complex';
    document.getElementById('analysisFileName').textContent = file.name;

    document.getElementById('chipExpte').textContent = uploadedPayload.expteNo;
    document.getElementById('chipCaratula').textContent = uploadedPayload.caratula;
    document.getElementById('chipJuzgado').textContent = uploadedPayload.juzgado;
    document.getElementById('chipTipoActo').textContent = uploadedPayload.tipoActoLabel;
    document.getElementById('chipMonto').textContent = uploadedPayload.monto;
    document.getElementById('chipPlazo').textContent = uploadedPayload.plazoLabel;

    const rawViewer = document.getElementById('analysisRawTextViewer');
    rawViewer.innerHTML = applySmartLegalHighlighters(uploadedPayload.proveidoTexto, { deadline: true, amount: true, law: true });

    document.getElementById('analysisDiagnosticText').textContent = uploadedPayload.summary;
    document.getElementById('analysisNormativaBox').innerHTML = `<strong>Normativa Procesal Identificada:</strong> ${uploadedPayload.normativa}`;

    const actionArea = document.getElementById('analysisActionButtons');
    actionArea.innerHTML = `
      <button class="btn btn-primary" style="width: 100%; margin-bottom: 8px;" onclick="generateSimplePaymentDraft('causa-14820-25')">
        ⚡ Generar Escrito Judicial de Contestación
      </button>
      <button class="btn btn-secondary" style="width: 100%;" id="btnOpenUploadedInSplit">
        📄 Abrir en Visor Split-Screen
      </button>
    `;

    document.getElementById('btnOpenUploadedInSplit').onclick = () => openPdfViewer(uploadedPayload);
    document.getElementById('btnOpenInSplitViewer').onclick = () => openPdfViewer(uploadedPayload);

    const btnDl = document.getElementById('btnDownloadAnalyzedPdf');
    if (btnDl) {
      btnDl.href = blobUrl;
      btnDl.download = file.name;
    }

    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`¡PDF analizado exitosamente! Datos procesales extraídos.`, 'success');
  } catch (err) {
    console.error('Error al parsear PDF:', err);
    showToast('Error procesando el archivo PDF', 'error');
  }
}

function openPdfViewer(data) {
  STATE.currentPdfData = data;

  document.getElementById('pdfViewerModalTitle').textContent = `Expediente N° ${data.expteNo || 'S/N'} - Proveído Judicial (IURE / Lex)`;
  document.getElementById('pdfViewerModalSubtitle').textContent = `${data.dependencia || data.juzgado || 'Poder Judicial del Chaco'} • Doc Ref: ${data.token || 'PJCH-IURE-2026'}`;

  const btnDl = document.getElementById('btnDownloadPdfModal');
  if (btnDl) {
    btnDl.href = data.filePath || data.pdfFile || '#';
    btnDl.download = data.fileName || 'proveido_oficial.pdf';
  }

  const btnNewTab = document.getElementById('btnOpenPdfNewTab');
  if (btnNewTab) {
    btnNewTab.href = data.filePath || data.pdfFile || '#';
  }

  const iframe = document.getElementById('pdfBinaryIframe');
  if (iframe) {
    iframe.src = data.filePath || data.pdfFile || 'about:blank';
  }

  renderOfficialPaperCanvas(data);

  document.getElementById('pdfExtractExpteCaratula').textContent = `Lex: ${data.expteNo || ''} (IURE: ${data.expteIure || 'N/A'}) - ${data.caratula || ''}`;
  document.getElementById('pdfExtractJuzgado').textContent = data.dependencia || data.juzgado || 'Poder Judicial del Chaco';
  document.getElementById('pdfExtractTipoActo').textContent = data.tipoActoLabel || 'Proveído Notificado';
  document.getElementById('pdfExtractMonto').textContent = data.monto || 'No contiene montos líquidos';
  document.getElementById('pdfExtractPlazo').textContent = data.plazoLabel || '5 días hábiles judiciales';
  document.getElementById('pdfExtractVencimiento').textContent = data.vencimiento ? `${data.vencimiento} (Gracia: ${data.gracia || '2 hs'})` : 'Causa a despacho';
  document.getElementById('pdfExtractNormativa').textContent = data.normativa || 'Arts. 135, 155, 498 CPCC Chaco';
  document.getElementById('pdfExtractFirmaToken').textContent = `Token: ${data.token || 'PJCH-VALID'} • Hash: ${data.hash || 'b7c419e048d2aa81902f'}`;

  const dynamicActionArea = document.getElementById('pdfViewerDynamicActionArea');
  if (data.tipoTramite === 'SIMPLE') {
    dynamicActionArea.innerHTML = `
      <button class="btn btn-primary" style="width: 100%; margin-bottom: 8px;" onclick="closeAllModals(); generateSimplePaymentDraft('${data.causeId || 'causa-14820-25'}');">
        ⚡ Redactar Escrito Acepta Depósito & Denuncia CBU ($0 Costo)
      </button>
    `;
  } else if (data.tipoTramite === 'COMPLEJO') {
    dynamicActionArea.innerHTML = `
      <button class="btn btn-copilot" style="width: 100%; margin-bottom: 8px;" onclick="closeAllModals(); openCopilotAnalysis('${data.causeId || 'causa-8310-24'}');">
        🤖 Copiloto IA: Diagnóstico & Impugnación Pericial
      </button>
    `;
  } else {
    dynamicActionArea.innerHTML = `
      <button class="btn btn-outline-danger" style="width: 100%; margin-bottom: 8px;" onclick="closeAllModals(); generateAntiCaducidadMotion('${data.causeId || 'causa-3105-23'}');">
        🛡️ Impulsar Autos (Interrumpir Caducidad Art. 310)
      </button>
    `;
  }

  setPdfViewMode('official');
  document.getElementById('pdfViewerModal').classList.add('open');
}

function renderOfficialPaperCanvas(data) {
  const canvas = document.getElementById('pdfPaperCanvas');
  if (!canvas) return;

  const highlightedBody = applySmartLegalHighlighters(data.proveidoTexto || '', STATE.highlightFilters);
  const signers = data.signers || [
    ['Juez / Tribunal', 'Firma Digital Acreditada'],
    ['Secretario', 'Secretaría Actuaria']
  ];

  canvas.innerHTML = `
    <div class="pdf-judicial-header-band"></div>

    <div class="pdf-official-header">
      <div class="pdf-official-brand">
        <div class="pdf-chaco-emblem">
          <span class="pj">PJ</span>
          <span class="chaco">CHACO</span>
        </div>
        <div class="pdf-court-names">
          <h2>PODER JUDICIAL DE LA PROVINCIA DEL CHACO</h2>
          <h3>SISTEMA DE CONTROL DE TRÁMITES PROCESALES Y NOTIFICACIONES</h3>
          <p>${data.dependencia || data.juzgado || 'Juzgado Civil y Comercial'} - Primera Circunscripción Judicial</p>
        </div>
      </div>
      <div class="pdf-header-meta">
        <strong>MESA VIRTUAL PJCh</strong>
        <span>Notificación Art. 155 CPCCCh</span><br>
        <span style="font-family: var(--font-mono); font-size: 0.7rem;">Token: ${data.token || 'PJCH-VALID'}</span>
      </div>
    </div>

    <div class="pdf-case-box">
      <div class="pdf-case-box-row">
        <strong>EXPEDIENTE Lex:</strong> ${data.expteNo || ''} &nbsp;|&nbsp; <strong>IURE:</strong> ${data.expteIure || '14820/2025-1-C'}
      </div>
      <div class="pdf-case-box-row">
        <strong>CARÁTULA:</strong> ${data.caratula || ''}
      </div>
      <div class="pdf-case-box-row">
        <strong>Partes:</strong> ${data.actor || 'Parte Actora'} c/ ${data.demandado || 'Parte Demandada'}
      </div>
      <div class="pdf-case-box-row">
        <strong>MOTIVO / ACTO:</strong> NOTIFICACIÓN ART. 155 CPCCCh - ${data.tipoActoLabel || 'Proveído Judicial'}
      </div>
    </div>

    <div class="pdf-paragraphs-container">
      ${highlightedBody}
    </div>

    <div class="pdf-signatures-box">
      <div class="pdf-cert-info">
        <span class="cert-badge">🛡️ CONSTANCIA DE FIRMA DIGITAL (LEY 25.506 / ACORDADA STJCh)</span>
        <span>Validador Oficial: SHA-256 ${data.hash || 'b7c419e048d2aa81902f'} • Registro Digital Válido</span>
        <div class="pdf-cert-signers">
          ${signers.map(([role, name]) => `
            <div class="pdf-cert-signer">
              ${name}
              <span>${role}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="pdf-barcode-visual" title="Código de Verificación Electrónica IURE / PJCh"></div>
    </div>

    <div class="pdf-official-footer">
      <span>Poder Judicial del Chaco - Control de Trámites Procesales y Notificaciones (IURE / INDI / Lex)</span>
      <span>Pág. 1 de 1</span>
    </div>
  `;
}

function openPdfViewerForCause(causeId) {
  let cause = STATE.causes.find(c => c.id === causeId);
  if (!cause) {
    const defaultSample = PDF_WORKSPACE.samples[0];
    return openPdfViewer(defaultSample);
  }

  const payload = {
    id: `cause-pdf-${cause.id}`,
    fileName: cause.pdfFile ? cause.pdfFile.split('/').pop() : 'proveido_judicial.pdf',
    filePath: cause.pdfFile || 'pdfs/proveido_14820_25_deposito.pdf',
    expteNo: cause.expteNo,
    expteIure: cause.expteIure || `${cause.expteNo.replace('/', '-')}-C`,
    caratula: cause.caratula,
    juzgado: cause.juzgado,
    dependencia: cause.dependencia || cause.juzgado,
    fuero: cause.fuero,
    actor: cause.cliente || 'Parte Actora',
    demandado: cause.demandado || 'Parte Demandada',
    tipoActoLabel: cause.tipoActoLabel || (cause.tipoTramite === 'SIMPLE' ? 'Trámite Simple (Depósito)' : 'Trámite Complejo'),
    tipoTramite: cause.tipoTramite,
    monto: cause.monto || (cause.montoDepositado ? `$${cause.montoDepositado.toLocaleString('es-AR')}` : 'No aplica'),
    banco: 'Nuevo Banco del Chaco S.A.',
    plazoDias: cause.plazo ? cause.plazo.remainingBusinessDays : 5,
    plazoLabel: cause.plazo ? `${cause.plazo.remainingBusinessDays} días hábiles restantes` : 'Sin traslado activo',
    vencimiento: cause.plazo ? cause.plazo.expirationDate : null,
    gracia: cause.plazo ? cause.plazo.gracePeriodDate : null,
    normativa: cause.normativa || 'Arts. 135, 155, 498 CPCC Chaco',
    token: cause.token || `PJCH-${cause.id.toUpperCase()}`,
    hash: cause.hash || 'b7c419e048d2aa81902f',
    signers: [
      [cause.juzgado, 'Juez Titular de Autos'],
      ['Secretaría Actuaria', 'Secretario de Juzgado']
    ],
    proveidoTexto: cause.proveidoTexto,
    causeId: cause.id
  };

  openPdfViewer(payload);
}

function openPdfViewerForNotification(notifId) {
  const notif = STATE.notifications.find(n => n.id === notifId);
  if (notif && notif.causaId) {
    return openPdfViewerForCause(notif.causaId);
  }
  openPdfViewer(PDF_WORKSPACE.samples[0]);
}

function openPdfViewerForSample(sampleId) {
  const sample = PDF_WORKSPACE.samples.find(s => s.id === sampleId);
  if (sample) openPdfViewer(sample);
}

function setPdfViewMode(mode) {
  STATE.pdfViewMode = mode;
  const btnOff = document.getElementById('btnModeOfficialView');
  const btnBin = document.getElementById('btnModeNativeBinary');
  const paperCont = document.getElementById('pdfPaperScrollContainer');
  const toolbar = document.getElementById('pdfViewerToolbar');
  const binCont = document.getElementById('pdfBinaryFrameContainer');

  if (mode === 'official') {
    if (btnOff) btnOff.classList.add('active');
    if (btnBin) btnBin.classList.remove('active');
    if (paperCont) paperCont.style.display = 'flex';
    if (toolbar) toolbar.style.display = 'flex';
    if (binCont) binCont.style.display = 'none';
  } else {
    if (btnOff) btnOff.classList.remove('active');
    if (btnBin) btnBin.classList.add('active');
    if (paperCont) paperCont.style.display = 'none';
    if (toolbar) toolbar.style.display = 'none';
    if (binCont) binCont.style.display = 'block';
  }
}

function toggleHighlightFilter(filterType) {
  STATE.highlightFilters[filterType] = !STATE.highlightFilters[filterType];
  const tagEl = document.getElementById(
    filterType === 'deadline' ? 'toggleTagDeadline' : (filterType === 'amount' ? 'toggleTagAmount' : 'toggleTagLaw')
  );
  if (tagEl) {
    if (STATE.highlightFilters[filterType]) {
      tagEl.classList.add('active');
    } else {
      tagEl.classList.remove('active');
    }
  }
  if (STATE.currentPdfData) {
    renderOfficialPaperCanvas(STATE.currentPdfData);
  }
}

function selectAiProvider(provider) {
  STATE.activeAiProvider = provider;
  const cards = {
    claude: document.getElementById('providerChoiceClaude'),
    chatgpt: document.getElementById('providerChoiceChatGPT'),
    gemini: document.getElementById('providerChoiceGemini')
  };

  const badges = {
    claude: document.getElementById('statusBadgeClaude'),
    chatgpt: document.getElementById('statusBadgeChatGPT'),
    gemini: document.getElementById('statusBadgeGemini')
  };

  Object.keys(cards).forEach(p => {
    if (cards[p]) {
      if (p === provider) {
        cards[p].classList.add('active');
        if (badges[p]) {
          badges[p].textContent = '● Conectado Activo';
          badges[p].style.color = '#059669';
          badges[p].style.fontWeight = '700';
        }
      } else {
        cards[p].classList.remove('active');
        if (badges[p]) {
          badges[p].textContent = 'Hacer clic para activar';
          badges[p].style.color = '#64748b';
          badges[p].style.fontWeight = '400';
        }
      }
    }
  });

  const names = {
    claude: 'Claude Pro / Max (Anthropic)',
    chatgpt: 'ChatGPT Plus / Team (OpenAI)',
    gemini: 'Gemini Advanced (Google)'
  };

  const flowBadge = document.getElementById('flowSubBadge');
  if (flowBadge) flowBadge.textContent = `${names[provider]} Conectado`;

  const badgeLabel = document.getElementById('subBadgeLabel');
  if (badgeLabel) badgeLabel.textContent = `${provider.toUpperCase()} Activo ($0 API)`;

  showToast(`Proveedor de IA conmutado a: ${names[provider]}. Costo de API: $0.`, 'success');
}

function toggleRevisado(notifId) {
  const notif = STATE.notifications.find(n => n.id === notifId);
  if (notif) {
    notif.revisado = !notif.revisado;
    showToast(`Expte. ${notif.expteNo} marcado como ${notif.revisado ? 'Revisado' : 'Pendiente'}`, 'info');
  }
}

function executeAiTaskForNotification(notifId) {
  const notif = STATE.notifications.find(n => n.id === notifId);
  if (!notif) return;

  if (notif.tipoTramite === 'SIMPLE') {
    generateSimplePaymentDraft(notif.causaId || 'causa-14820-25');
  } else {
    openCopilotAnalysis(notif.causaId || 'causa-8310-24');
  }
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  STATE.activeTab = tabName;
  renderCurrentTab();
}

