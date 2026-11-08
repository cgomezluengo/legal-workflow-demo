/* ==========================================================================
   LEXFLOW — Motor Interactivo de Automatización Procesal & Análisis de PDFs
   Funciona 100% en GitHub Pages y en Servidor Local
   ========================================================================== */

const TENANTS = {
  estudio_principal: {
    name: 'Estudio Jurídico titular',
    subtitle: 'Automatización de Recorrida Judicial (IURE / INDI) & Copiloto Legal',
    titular: 'Dr. Titular del Estudio (Mat. Prof. STJ)',
    provider: 'Claude Pro (Suscripción Mensual)'
  },
  estudio_asociados: {
    name: 'Estudio Asociados & Cía',
    subtitle: 'Gestión Multi-Fuero Civil, Comercial y Laboral',
    titular: 'Dra. Asociada Titular (Mat. Prof. STJ)',
    provider: 'ChatGPT Plus (Suscripción Mensual)'
  }
};

const PDF_SAMPLES = [
  {
    id: 'pdf-deposito',
    file: 'pdfs/proveido_14820_25_deposito.pdf',
    shortTitle: '1. Proveído de Depósito Judicial',
    subtitle: 'Expte. 14.820/25 — Trámite Simple ($0 IA)',
    typeBadge: 'Trámite Simple — Plantilla Automática',
    badgeClass: 'badge-green',
    expte: '14.820/25 (IURE: 14820/2025-1-C)',
    caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS',
    juzgado: 'Juzgado Civil y Comercial N° 3',
    acto: 'Téngase presente depósito judicial ($1.850.000)',
    plazo: 'Sin vencimiento fatal (Habilita cobro inmediato)',
    monto: '$ 1.850.000,00 (Nuevo Banco del Chaco S.A.)',
    paperHtml: `
      <div class="paper-header">
        <div>
          <h4>PODER JUDICIAL DE LA PROVINCIA DEL CHACO</h4>
          <p>Juzgado Civil y Comercial N° 3 • Secretaría N° 3 • Sistema IURE / INDI</p>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-neutral">Expte. 14.820/25</span>
          <p style="margin-top:4px;">Publicado: Hoy 07:15 hs</p>
        </div>
      </div>
      <p style="margin-bottom:12px;"><strong>AUTOS Y VISTOS:</strong> Para proveer el informe bancario electrónico remitido por el Nuevo Banco del Chaco S.A. en autos caratulados: <strong>"PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS" (Expte. N° 14.820/25)</strong>;</p>
      <p style="margin-bottom:12px;"><strong>RESUELVO:</strong> Téngase presente la boleta de depósito judicial informada por el Nuevo Banco del Chaco S.A. por la suma de <span class="hl-amount">$ 1.850.000,00 (Pesos Un Millón Ochocientos Cincuenta Mil)</span> en concepto de capital de condena, depositada en la cuenta judicial abierta a la orden de este Juzgado y como perteneciente a estos obrados.</p>
      <p style="margin-bottom:16px;">Hágase saber a la parte actora a sus efectos. Previo al libramiento de orden de pago electrónica, denuncie el beneficiario constancia de CBU, CUIT y situación fiscal ante <span class="hl-law">ARCA / AFIP</span>. <span class="hl-law">Notifíquese conforme Art. 155 del CPCCCh</span>.</p>
      <p style="font-size:12px; color:#64748b; border-top:1px solid #e2e8f0; padding-top:10px;">Firmado digitalmente por: Juez Civil y Comercial N° 3 — Actuario/Secretario.</p>
    `,
    draftText: `ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA LIBRAMIENTO DE ORDEN DE PAGO ELECTRÓNICA

Señor Juez en lo Civil y Comercial N° 3:

Dr. Titular del Estudio, por la representación acreditada de la parte actora en los autos caratulados "PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS" (Expte. N° 14.820/25 - IURE 14820/2025-1-C), ante V.S. respetuosamente digo:

I.- ACEPTA PAGO: Que habiendo tomado conocimiento del proveído salido a despacho mediante el cual se hace saber el depósito efectuado por la demandada por la suma de $ 1.850.000,00 en el Nuevo Banco del Chaco S.A., vengo a aceptar el mismo y solicitar su inmediata transferencia.

II.- DENUNCIA DATOS BANCARIOS (CBU): A los fines de la transferencia electrónica, denuncio los datos de la cuenta titularidad de esta parte:
- Banco: Nuevo Banco del Chaco S.A.
- CBU: 31100002-11000045891234
- Alias: ESTUDIO.LEGAL.CHACO
- CUIT: 20-28451920-4 (Monotributista - Constancia ARCA adjunta).

III.- PETITORIO: Solicito se libre oficio electrónico al Nuevo Banco del Chaco S.A. ordenando la transferencia de los fondos depositados.

Proveer de conformidad,
SERÁ JUSTICIA.`
  },
  {
    id: 'pdf-pericia',
    file: 'pdfs/proveido_8310_24_traslado_pericia.pdf',
    shortTitle: '2. Traslado de Pericia Contable (Plazo)',
    subtitle: 'Expte. 8.310/24 — Trámite Complejo (5 días)',
    typeBadge: 'Trámite Complejo — Copiloto IA + Auditoría',
    badgeClass: 'badge-blue',
    expte: '8.310/24 (IURE: 8310/2024-1-L)',
    caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO',
    juzgado: 'Juzgado del Trabajo N° 1',
    acto: 'Traslado de Pericia Contable y Liquidación',
    plazo: '5 días hábiles judiciales (Vence próximo jueves)',
    monto: 'Liquidación pericial practicada: $ 6.420.500,00',
    paperHtml: `
      <div class="paper-header">
        <div>
          <h4>PODER JUDICIAL DE LA PROVINCIA DEL CHACO</h4>
          <p>Juzgado del Trabajo N° 1 • Secretaría Única • Sistema IURE / INDI</p>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-neutral">Expte. 8.310/24</span>
          <p style="margin-top:4px;">Publicado: Hoy 07:42 hs</p>
        </div>
      </div>
      <p style="margin-bottom:12px;"><strong>AUTOS Y VISTOS:</strong> Agréguese el dictamen pericial contable presentado vía <span class="hl-law">INDI</span> por el Perito Contador desinsaculado en autos caratulados: <strong>"GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO" (Expte. N° 8.310/24)</strong>;</p>
      <p style="margin-bottom:12px;"><strong>RESUELVO:</strong> Del informe pericial contable y planilla de liquidación por la suma de <span class="hl-amount">$ 6.420.500,00</span>, córrase traslado a las partes por el término fatal e improrrogable de <span class="hl-deadline">CINCO (5) DÍAS HÁBILES JUDICIALES</span>, bajo apercibimiento de tenerlo por consentido (<span class="hl-law">Art. 473 CPCCCh</span> y Ley Procesal Laboral).</p>
      <p style="margin-bottom:16px;"><span class="hl-law">Notifíquese electrónicamente conforme Art. 155 del CPCCCh</span>.</p>
      <p style="font-size:12px; color:#64748b; border-top:1px solid #e2e8f0; padding-top:10px;">Firmado digitalmente por: Juez del Trabajo N° 1 — Secretaría Laboral.</p>
    `,
    draftText: `CONTESTA TRASLADO DE PERICIA CONTABLE - CONSIENTE PARCIALMENTE - IMPUGNA TASA DE INTERÉS APLICADA

Señor Juez del Trabajo N° 1:

Dr. Titular del Estudio, apoderado de la parte actora en autos "GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO" (Expte. N° 8.310/24), ante V.S. digo:

I.- OBJETO: En legal tiempo y forma (dentro del plazo de 5 días hábiles conferido por proveído notificado conforme Art. 155 CPCCCh), vengo a contestar el traslado del dictamen pericial contable.

II.- CONSIENTE RUBROS INDEMNIZATORIOS: Esta parte consiente la determinación de la mejor remuneración mensual, normal y habitual y el cálculo de los rubros de antigüedad (Art. 245 LCT) y preaviso.

III.- OBSERVA LIQUIDACIÓN DE INTERESES: Solicito al experto aclare y recalcule los intereses moratorios desde la fecha del distracto aplicando la tasa activa nominal anual del Banco de la Nación Argentina conforme doctrina legal vigente del Superior Tribunal de Justicia del Chaco, habiéndose omitido capitalizar el último período.

IV.- PETITORIO: Se tenga por contestado en tiempo y forma el traslado conferido y se corra vista al perito contador.

Proveer de conformidad,
SERÁ JUSTICIA.`
  },
  {
    id: 'pdf-cedula-negativa',
    file: 'pdfs/proveido_3105_23_intimacion_caducidad.pdf',
    shortTitle: '3. Cédula Diligenciada con Informe Negativo',
    subtitle: 'Expte. 1.505/25 — Recorrida INDI / Juzgado',
    typeBadge: 'Trámite Simple — Reitera o Denuncia Domicilio',
    badgeClass: 'badge-amber',
    expte: '1.505/25 (IURE: 1505/2025-2-F)',
    caratula: 'FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS Y CUIDADO PERSONAL',
    juzgado: 'Juzgado de Niñez, Adolescencia y Familia N° 2',
    acto: 'Cédula diligenciada con informe negativo (No atiende / Domicilio cerrado)',
    plazo: 'Impulsar antes de los 90 días (Evitar caducidad)',
    monto: 'No aplica',
    paperHtml: `
      <div class="paper-header">
        <div>
          <h4>PODER JUDICIAL DE LA PROVINCIA DEL CHACO</h4>
          <p>Oficina de Mandamientos y Notificaciones • Juzgado de Familia N° 2</p>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-neutral">Expte. 1.505/25</span>
          <p style="margin-top:4px;">Publicado: Hoy 08:10 hs</p>
        </div>
      </div>
      <p style="margin-bottom:12px;"><strong>INFORME DEL OFICIAL NOTIFICADOR:</strong> En el día de la fecha me constituí en el domicilio denunciado en autos caratulados <strong>"FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS" (Expte. N° 1.505/25)</strong> a fin de diligenciar la cédula de traslado.</p>
      <p style="margin-bottom:12px;">Habiendo llamado en reiteradas oportunidades sin ser atendido y manifestando un vecino que el requerido trabaja en horario matutino, procedo a devolver la presente <span class="hl-deadline">CÉDULA DILIGENCIADA CON INFORME NEGATIVO</span>.</p>
      <p style="margin-bottom:16px;"><strong>PROVEÍDO DEL JUZGADO:</strong> Téngase presente el informe negativo que antecede. Hágase saber a la interesada a fin de que <span class="hl-law">inste lo que por derecho corresponda</span>.</p>
      <p style="font-size:12px; color:#64748b; border-top:1px solid #e2e8f0; padding-top:10px;">Documento generado en: Juzgado de Niñez, Adolescencia y Familia N° 2.</p>
    `,
    draftText: `SOLICITA NUEVA CÉDULA CON HABILITACIÓN DE DÍAS Y HORAS INHÁBILES - ACTIVA TRÁMITE

Señor Juez de Niñez, Adolescencia y Familia N° 2:

Dr. Titular del Estudio, por la parte actora en los autos "FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS" (Expte. N° 1.505/25), a V.S. digo:

I.- Atento al informe negativo del Oficial Notificador obrante en autos —del cual surge que el demandado reside allí pero se ausenta en horario matutino—, vengo a solicitar se libre nueva cédula al mismo domicilio denunciado, con expresa HABILITACIÓN DE DÍAS Y HORAS INHÁBILES (Art. 153 CPCCCh), y en su caso bajo responsabilidad de parte.

II.- Sirva la presente de formal activación de trámite procesal.

Proveer de conformidad,
SERÁ JUSTICIA.`
  },
  {
    id: 'pdf-caducidad',
    file: 'pdfs/escrito_modelo_acepta_deposito_cbu.pdf',
    shortTitle: '4. Alerta de Caducidad (78 días inactivo)',
    subtitle: 'Expte. 3.105/23 — Impulso urgente antes de 3 meses',
    typeBadge: 'Alerta Crítica — Watchdog 90 Días',
    badgeClass: 'badge-red',
    expte: '3.105/23 (IURE: 3105/2023-1-C)',
    caratula: 'CREDITOS DEL NORTE S.A. C/ RODRIGUEZ LUIS S/ EJECUTIVO',
    juzgado: 'Juzgado Civil y Comercial N° 1',
    acto: 'Intimación / Control de inactividad procesal (78 días corridos)',
    plazo: 'Quedan 12 días para cumplir los 3 meses (Art. 310 CPCCCh)',
    monto: 'Capital reclamado: $ 3.200.000,00',
    paperHtml: `
      <div class="paper-header">
        <div>
          <h4>SISTEMA DE CONTROL DE PLAZOS Y CADUCIDAD — LEXFLOW</h4>
          <p>Detección preventiva sobre Listado de Recorrida (Juzgado Civil y Comercial N° 1)</p>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-red">78 / 90 Días Inactivo</span>
          <p style="margin-top:4px;">Último trámite: hace 78 días</p>
        </div>
      </div>
      <p style="margin-bottom:12px;"><strong>REPORTE AUTOMÁTICO DE RIESGO DE CADUCIDAD:</strong> El sistema detectó que en el expediente <strong>"CREDITOS DEL NORTE S.A. C/ RODRIGUEZ LUIS S/ EJECUTIVO" (Expte. N° 3.105/23)</strong> y su sub-causa vinculada <em>"Incidente de Levantamiento de Embargo"</em> han transcurrido <span class="hl-deadline">78 días corridos sin impulso procesal</span> desde la última providencia ("VISTA P/ RESOLUCION").</p>
      <p style="margin-bottom:16px;">A fin de evitar que opere el plazo de <span class="hl-law">caducidad de instancia de TRES (3) MESES (Art. 310 inc. 2 CPCCCh)</span>, tu suscripción de IA redactó el escrito impulsor listo para presentar por INDI hoy mismo.</p>
      <p style="font-size:12px; color:#64748b; border-top:1px solid #e2e8f0; padding-top:10px;">Watchdog Preventivo Automático — Estudio Jurídico.</p>
    `,
    draftText: `ACTIVA TRÁMITE - SOLICITA PASEN AUTOS A DESPACHO PARA RESOLVER

Señor Juez en lo Civil y Comercial N° 1:

Dr. Titular del Estudio, por la representación acreditada en autos "CREDITOS DEL NORTE S.A. C/ RODRIGUEZ LUIS S/ EJECUTIVO" (Expte. N° 3.105/23), a V.S. digo:

Que encontrándose contestada la vista conferida a las partes y atento al estado de los presentes obrados, solicito pasen los autos inmediatamente a despacho para dictar resolución interlocutoria, sirviendo esta presentación de formal acto impulsorio del proceso (Art. 310 CPCCCh).

Proveer de conformidad,
SERÁ JUSTICIA.`
  }
];

const INITIAL_CASES = [
  {
    id: 'c-1',
    expteLex: '14.820/25',
    expteIure: '14820/2025-1-C',
    caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS',
    cliente: 'Pérez, Juan Carlos',
    dependencia: 'Juzgado Civil y Comercial N° 3 - Sec. 3',
    motivo: 'NOTIFICACIÓN ART. 155 DEL CPCCCh',
    fecha: 'Hoy 07:15',
    acceso: 'Libre',
    hasAtencion: false,
    taskSummary: 'Depósito $1.850.000 detectado → Generar escrito Acepta Pago y CBU',
    taskType: 'SIMPLE',
    pdfSampleId: 'pdf-deposito',
    inactiveDays: 2,
    deadlineText: 'Sin plazo fatal (Habilita cobro)',
    subcauses: [
      { title: 'Beneficio de Litigar sin Gastos (Expte. 14.820/25-B)', status: 'Concedido definitivamente' }
    ],
    history: [
      { doc: true, indi: false, fecha: 'Hoy 07:15', folio: '188', desc: 'TENER PRESENTE BOLETA DE DEPÓSITO ($1.850.000) - NOTIF. ART. 155', origen: 'JUZGADO CIVIL Y COM. N° 3' },
      { doc: false, indi: true, fecha: '28/10/2026 11:20', folio: '185', desc: 'PRACTICA PLANILLA LIQUIDACIÓN - Esc. + 1 adjunto', origen: 'INDI (Dr. Titular)' },
      { doc: true, indi: false, fecha: '14/10/2026 12:10', folio: '180', desc: 'SENTENCIA DEFINITIVA HACER LUGAR A LA DEMANDA', origen: 'JUZGADO CIVIL Y COM. N° 3' }
    ]
  },
  {
    id: 'c-2',
    expteLex: '8.310/24',
    expteIure: '8310/2024-1-L',
    caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO',
    cliente: 'Gómez, María Elena',
    dependencia: 'Juzgado del Trabajo N° 1 - Sec. Laboral',
    motivo: 'NOTIFICACIÓN ART. 155 DEL CPCCCh',
    fecha: 'Hoy 07:42',
    acceso: 'Libre',
    hasAtencion: true,
    taskSummary: 'Traslado de Pericia (5 días hábiles) → Borrador de impugnación parcial listo',
    taskType: 'COMPLEJO',
    pdfSampleId: 'pdf-pericia',
    inactiveDays: 5,
    deadlineText: 'Vence en 5 días hábiles (CPCCCh)',
    subcauses: [
      { title: 'Incidente de Embargo Preventivo', status: 'Traba de embargo efectiva sobre cuenta corriente' }
    ],
    history: [
      { doc: true, indi: false, fecha: 'Hoy 07:42', folio: '142', desc: 'TRASLADO DE PERICIA CONTABLE POR 5 DÍAS HÁBILES (ART. 155 CPCCCh)', origen: 'JUZGADO DEL TRABAJO N° 1' },
      { doc: false, indi: true, fecha: '04/11/2026 09:50', folio: '136', desc: 'PRESENTA INFORME PERICIAL CONTABLE - Esc. + 2 adjuntos', origen: 'INDI (Perito Contador)' },
      { doc: true, indi: false, fecha: '19/10/2026 10:15', folio: '132', desc: 'INTÍMASE AL PERITO A PRESENTAR DICTAMEN', origen: 'JUZGADO DEL TRABAJO N° 1' }
    ]
  },
  {
    id: 'c-3',
    expteLex: '1.505/25',
    expteIure: '1505/2025-2-F',
    caratula: 'FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS',
    cliente: 'Fernández, Laura',
    dependencia: 'Juzgado de Niñez, Adolescencia y Familia N° 2',
    motivo: 'CÉDULA DILIGENCIADA',
    fecha: 'Hoy 08:10',
    acceso: 'RESERVADO',
    hasAtencion: true,
    taskSummary: 'Cédula con informe negativo → Generar escrito pidiendo habilitación de día y hora',
    taskType: 'SIMPLE',
    pdfSampleId: 'pdf-cedula-negativa',
    inactiveDays: 11,
    deadlineText: 'Reiterar cédula para audiencia',
    subcauses: [
      { title: 'Incidente de Alimentos Provisorios', status: 'Cuota provisoria fijada y vigente' },
      { title: 'Incidente de Régimen Comunicacional', status: 'A la espera de dictamen de Asesoría de Menores' }
    ],
    history: [
      { doc: true, indi: false, fecha: 'Hoy 08:10', folio: '64', desc: 'CEDULA DILIGENCIADA CON INFORME NEGATIVO', origen: 'JUZGADO DE FAMILIA N° 2' },
      { doc: true, indi: false, fecha: '27/10/2026 12:40', folio: '61', desc: 'SEÑALA NUEVA FECHA DE AUDIENCIA - NOTIFÍQUESE', origen: 'JUZGADO DE FAMILIA N° 2' },
      { doc: false, indi: true, fecha: '21/10/2026 18:15', folio: '59', desc: 'SOLICITA NUEVA AUDIENCIA - ACTIVA TRÁMITE', origen: 'INDI (Dr. Titular)' }
    ]
  },
  {
    id: 'c-4',
    expteLex: '3.105/23',
    expteIure: '3105/2023-1-C',
    caratula: 'CREDITOS DEL NORTE S.A. C/ RODRIGUEZ LUIS S/ EJECUTIVO',
    cliente: 'Rodríguez, Luis Alberto',
    dependencia: 'Juzgado Civil y Comercial N° 1 - Sec. 1',
    motivo: 'ALERTA CADUCIDAD (78 DÍAS)',
    fecha: 'Hace 78 días',
    acceso: 'Libre',
    hasAtencion: true,
    taskSummary: 'Riesgo de Caducidad (78/90 días) → Presentar escrito impulsor urgente',
    taskType: 'CADUCIDAD',
    pdfSampleId: 'pdf-caducidad',
    inactiveDays: 78,
    deadlineText: 'CRÍTICO: Quedan 12 días para los 3 meses',
    subcauses: [
      { title: 'Incidente de Levantamiento de Embargo de Haberes', status: 'Contestó vista ejecutante — Pendiente pedir autos a resolver' }
    ],
    history: [
      { doc: true, indi: false, fecha: '22/08/2026 11:30', folio: '104', desc: 'TÉNGASE POR CONTESTADA LA VISTA - AUTOS SEGÚN SU ESTADO', origen: 'JUZGADO CIVIL Y COM. N° 1' },
      { doc: false, indi: true, fecha: '14/08/2026 10:05', folio: '101', desc: 'CONTESTA TRASLADO INCIDENTE - Esc. + 0 adjuntos', origen: 'INDI (Dr. Titular)' }
    ]
  }
];

const INITIAL_PRESCRIPTIONS = [
  {
    cliente: 'Martínez, Héctor Rubén',
    asunto: 'Reclamo por Accidente de Tránsito (Ruta Nac. 16)',
    plazoLegal: '3 años (Art. 2561 CCCN — Responsabilidad Civil)',
    vencimiento: 'Restan 38 días corridos para interponer demanda',
    estado: 'Falta adjuntar historia clínica certificada para sortear demanda'
  },
  {
    cliente: 'Acosta, Valeria Soledad',
    asunto: 'Diferencias Salariales e Indemnización Art. 245 LCT',
    plazoLegal: '2 años (Art. 256 LCT — Prescripción Laboral)',
    vencimiento: 'Restan 64 días corridos (Telegrama TCL suspensivo enviado)',
    estado: 'Liquidación final lista para iniciar demanda laboral'
  }
];

const STATE = {
  tenantId: 'estudio_principal',
  role: 'ADMIN', // 'ADMIN' | 'GUEST'
  activeProvider: 'Claude Pro (Suscripción Mensual)',
  filterArt155Only: false,
  searchQuery: '',
  selectedPdfId: 'pdf-deposito',
  cases: [...INITIAL_CASES],
  auditLog: [
    { time: 'Hoy 07:16:04', user: 'Sistema Automático (Gmail + IURE)', role: 'SYSTEM', event: 'DESCARGA_PROVEIDO', detail: 'Descargó PDF de Expte. 14.820/25 y detectó depósito judicial por $1.850.000.' },
    { time: 'Hoy 07:43:12', user: 'Suscripción Claude Pro (Contenedor Estudio)', role: 'AI_SUB', event: 'BORRADOR_GENERADO', detail: 'Analizó pericia contable en Expte. 8.310/24 y redactó contestación de traslado (plazo 5 días hábiles).' },
    { time: 'Hoy 08:11:00', user: 'Watchdog Caducidad (Cron Diario)', role: 'SYSTEM', event: 'ALERTA_CADUCIDAD', detail: 'Expte. 3.105/23 alcanzó 78 días de inactividad (límite 90 días Art. 310 CPCCCh).' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  renderAll();
});

function bindEvents() {
  // Selector de estudio
  document.getElementById('tenantSelect').addEventListener('change', (e) => {
    STATE.tenantId = e.target.value;
    const t = TENANTS[STATE.tenantId];
    STATE.activeProvider = t.provider;
    addAudit('CAMBIO_ESTUDIO', `Sesión cambiada a ${t.name}`);
    renderAll();
    showToast(`Estudio activo: ${t.name}`);
  });

  // Cambio de Rol (Admin vs Invitado)
  document.getElementById('btnRoleAdmin').addEventListener('click', () => setRole('ADMIN'));
  document.getElementById('btnRoleGuest').addEventListener('click', () => setRole('GUEST'));

  // Tabs
  document.querySelectorAll('.tab-link').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('btnGoPdfTab').addEventListener('click', () => switchTab('pdfs'));

  // Buscador
  document.getElementById('searchInput').addEventListener('input', (e) => {
    STATE.searchQuery = e.target.value.toLowerCase();
    renderRecorridaTable();
    renderCasesDetail();
  });

  // Filtro Art. 155
  document.getElementById('btnFilterArt155').addEventListener('click', (e) => {
    STATE.filterArt155Only = !STATE.filterArt155Only;
    e.currentTarget.classList.toggle('btn-primary', STATE.filterArt155Only);
    e.currentTarget.classList.toggle('btn-outline', !STATE.filterArt155Only);
    renderRecorridaTable();
  });

  // Simular llegada de nuevo correo Gmail / Despacho
  document.getElementById('btnSimulateSync').addEventListener('click', simulateNewDispatch);
  document.getElementById('btnSimulateSyncTable').addEventListener('click', simulateNewDispatch);

  // Modal de Suscripción
  document.getElementById('btnOpenSubModal').addEventListener('click', openSubModal);
  document.getElementById('btnStepConfigSub').addEventListener('click', openSubModal);

  document.querySelectorAll('#providerSelectorGrid .provider-option').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#providerSelectorGrid .provider-option').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const prov = card.dataset.provider;
      const cmdMap = {
        'Claude Pro (Suscripción Mensual)': `HOME="/srv/tenants/${STATE.tenantId}" claude auth login --claudeai`,
        'ChatGPT Plus (Suscripción Mensual)': `HOME="/srv/tenants/${STATE.tenantId}" codex login`,
        'Gemini Advanced / Google AI': `HOME="/srv/tenants/${STATE.tenantId}" GOOGLE_GENAI_USE_GCA=true gemini`
      };
      document.getElementById('cliCommandPreview').textContent = cmdMap[prov] || cmdMap['Claude Pro (Suscripción Mensual)'];
    });
  });

  document.getElementById('btnConfirmSubConnect').addEventListener('click', () => {
    const selected = document.querySelector('#providerSelectorGrid .provider-option.selected');
    if (selected) {
      STATE.activeProvider = selected.dataset.provider;
      addAudit('VINCULACION_SUSCRIPCION', `Cuenta vinculada: ${STATE.activeProvider} en contenedor aislado /srv/tenants/${STATE.tenantId}`);
      renderHeader();
      renderPdfWorkspace();
      closeModals();
      showToast(`Suscripción vinculada: ${STATE.activeProvider}`);
    }
  });

  // Biblioteca de modelos (Protección de Patrimonio Intelectual)
  document.getElementById('btnModelsVault').addEventListener('click', openModelsModal);

  // Acciones en pestaña PDFs
  document.getElementById('btnCopyPdfDraft').addEventListener('click', () => {
    const text = document.getElementById('pdfDraftTextarea').value;
    navigator.clipboard.writeText(text);
    showToast('Escrito copiado al portapapeles');
  });

  document.getElementById('btnDownloadWordDraft').addEventListener('click', () => {
    const text = document.getElementById('pdfDraftTextarea').value;
    const sample = PDF_SAMPLES.find((s) => s.id === STATE.selectedPdfId) || PDF_SAMPLES[0];
    downloadWordDoc(text, `Escrito_${sample.id}.doc`);
  });

  document.getElementById('btnApprovePdfDraft').addEventListener('click', () => {
    const sample = PDF_SAMPLES.find((s) => s.id === STATE.selectedPdfId) || PDF_SAMPLES[0];
    if (STATE.role === 'GUEST') {
      addAudit('REVISION_SECRETARIO', `Secretario guardó revisión de borrador en ${sample.expte} (Pendiente firma del titular).`);
      showToast('Revisión guardada y enviada para aprobación final del Abogado Titular');
    } else {
      addAudit('APROBACION_TITULAR', `Abogado Titular auditó y aprobó el escrito definitivo para ${sample.expte}.`);
      showToast('Escrito auditado y aprobado por el Abogado Titular (Listo para subir a INDI)');
    }
    renderAuditTab();
  });

  // Subir PDF propio desde la computadora
  document.getElementById('btnUploadCustomPdf').addEventListener('click', () => {
    document.getElementById('customPdfInput').click();
  });

  document.getElementById('customPdfInput').addEventListener('change', handleCustomPdfUpload);

  // Cerrar modales
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeModals);
  });
}

function setRole(role) {
  STATE.role = role;
  document.getElementById('btnRoleAdmin').classList.toggle('active', role === 'ADMIN');
  document.getElementById('btnRoleGuest').classList.toggle('active', role === 'GUEST');
  addAudit('CAMBIO_ROL', `Vista cambiada a perfil: ${role === 'ADMIN' ? 'Administrador (Titular)' : 'Invitado / Secretario (Acceso Limitado)'}`);
  renderAll();
  showToast(role === 'ADMIN' ? 'Modo Administrador (Control total)' : 'Modo Invitado / Secretario (Modelos protegidos contra descarga masiva)');
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-link').forEach((b) => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach((p) => {
    p.style.display = p.id === `tab-${tabId}` ? 'block' : 'none';
  });
}

function renderAll() {
  renderHeader();
  renderRecorridaTable();
  renderCasesDetail();
  renderPdfWorkspace();
  renderAuditTab();
}

function renderHeader() {
  const t = TENANTS[STATE.tenantId];
  document.getElementById('tenantNameTitle').textContent = t.name;
  document.getElementById('tenantSubTitle').textContent = `${t.titular} — ${t.subtitle}`;
  document.getElementById('subStatusText').textContent = `Suscripción: ${STATE.activeProvider.split(' (')[0]} (Activa)`;
  document.getElementById('stepProviderLabel').textContent = `Motor activo: ${STATE.activeProvider.split(' (')[0]}`;

  document.getElementById('kpiTotalCases').textContent = STATE.cases.length;
  document.getElementById('kpiTodayDispatch').textContent = STATE.cases.filter((c) => c.fecha.startsWith('Hoy')).length;
  document.getElementById('kpiActiveDeadlines').textContent = STATE.cases.filter((c) => c.taskType === 'COMPLEJO' || c.taskType === 'SIMPLE').length;
  document.getElementById('kpiCaducidadAlerts').textContent = STATE.cases.filter((c) => c.inactiveDays >= 60).length;
}

function getFilteredCases() {
  return STATE.cases.filter((c) => {
    if (STATE.filterArt155Only && !c.motivo.includes('155')) return false;
    if (STATE.searchQuery) {
      const hay = `${c.expteLex} ${c.expteIure} ${c.caratula} ${c.cliente} ${c.dependencia}`.toLowerCase();
      if (!hay.includes(STATE.searchQuery)) return false;
    }
    return true;
  });
}

function renderRecorridaTable() {
  const tbody = document.getElementById('recorridaTableBody');
  const list = getFilteredCases();

  tbody.innerHTML = list.map((c) => {
    const motivoBadge = c.motivo.includes('155')
      ? `<span class="badge badge-amber">${c.motivo}</span>`
      : (c.motivo.includes('CADUCIDAD') ? `<span class="badge badge-red">${c.motivo}</span>` : `<span class="badge badge-neutral">${c.motivo}</span>`);

    const accesoBadge = c.acceso === 'RESERVADO'
      ? `<span class="badge badge-red">RESERVADO</span>`
      : `<span class="badge badge-green">Libre</span>`;

    return `
      <tr>
        <td>
          <div class="expte-num">${c.expteLex}</div>
          <div style="font-size:11px; color:var(--text-muted);">IURE: ${c.expteIure}</div>
          ${c.hasAtencion ? `<span class="badge badge-amber" style="margin-top:3px;">Atención Lex/IURE</span>` : ''}
        </td>
        <td>
          <div class="caratula-title">${c.caratula}</div>
          <div class="caratula-sub">Cliente: ${c.cliente}</div>
        </td>
        <td>${c.dependencia}</td>
        <td>${motivoBadge}</td>
        <td style="white-space:nowrap;">${c.fecha}</td>
        <td>${accesoBadge}</td>
        <td>
          <div style="font-weight:500; color:var(--text-main);">${c.taskSummary}</div>
          <div style="font-size:11px; color:var(--text-muted);">${c.deadlineText}</div>
        </td>
        <td style="white-space:nowrap;">
          <button type="button" class="btn btn-outline btn-sm" onclick="openPdfSampleFromCase('${c.pdfSampleId}')">Ver PDF y Escrito</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderCasesDetail() {
  const container = document.getElementById('casesDetailContainer');
  const list = getFilteredCases();

  container.innerHTML = list.map((c) => {
    const sample = PDF_SAMPLES.find((s) => s.id === c.pdfSampleId) || PDF_SAMPLES[0];
    const pct = Math.min(100, Math.round((c.inactiveDays / 90) * 100));
    const barColor = c.inactiveDays >= 60 ? 'var(--danger)' : 'var(--success)';

    return `
      <article class="case-card">
        <div class="case-top">
          <div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <span class="badge badge-neutral">Lex: ${c.expteLex}</span>
              <span class="badge badge-blue">IURE: ${c.expteIure}</span>
              <span class="badge ${c.acceso === 'RESERVADO' ? 'badge-red' : 'badge-green'}">Acceso ${c.acceso}</span>
            </div>
            <h3 class="case-title">${c.caratula}</h3>
            <div class="case-meta">${c.dependencia} · Cliente: <strong>${c.cliente}</strong></div>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <a href="${sample.file}" download class="btn btn-outline btn-sm">Descargar PDF Combinado</a>
            <button type="button" class="btn btn-primary btn-sm" onclick="openPdfSampleFromCase('${c.pdfSampleId}')">Abrir en Visor y Auditar Escrito</button>
          </div>
        </div>

        <div class="case-columns">
          <div>
            <div class="proveido-panel">
              <div class="panel-label">
                <span>Últimas Actuaciones adentro del Expediente (Juzgado vs. Presentaciones INDI)</span>
                <span>Sincronizado hoy</span>
              </div>
              <div class="table-wrap">
                <table class="data-table" style="background:#fff; border:1px solid var(--border);">
                  <thead>
                    <tr>
                      <th>Documento / INDI</th>
                      <th>Publicado</th>
                      <th>Folio</th>
                      <th>Descripción de la Actuación</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${c.history.map((h) => `
                      <tr>
                        <td style="white-space:nowrap;">
                          ${h.doc ? `<button type="button" class="btn btn-subtle btn-sm" onclick="openPdfSampleFromCase('${c.pdfSampleId}')">[Ver Documento]</button>` : ''}
                          ${h.indi ? `<span class="badge badge-blue">[INDI Presentación]</span>` : ''}
                        </td>
                        <td style="white-space:nowrap; font-size:12px;">${h.fecha}</td>
                        <td style="font-family:var(--font-mono); font-size:12px;">${h.folio}</td>
                        <td style="font-size:12.5px; color:var(--text-main);">${h.desc}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="task-panel">
            <div>
              <div class="panel-label">
                <span>Sub-causas / Incidentes Vinculados (${c.subcauses.length})</span>
                <span>Árbol de la Causa</span>
              </div>
              ${c.subcauses.map((sub) => `
                <div style="padding:8px 10px; background:var(--bg-page); border:1px solid var(--border); border-radius:var(--radius-sm); margin-bottom:8px; font-size:12.5px;">
                  <strong style="color:var(--text-main); display:block;">↳ ${sub.title}</strong>
                  <span style="color:var(--text-muted);">${sub.status}</span>
                </div>
              `).join('')}

              <div class="deadline-bar" style="margin-top:12px;">
                <span>Plazo Procesal / Vencimiento:</span>
                <strong style="color:var(--text-main);">${c.deadlineText}</strong>
              </div>

              <div style="margin-top:12px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary);">
                  <span>Control de Caducidad de Instancia (Límite 90 días / 3 meses)</span>
                  <strong>${c.inactiveDays} / 90 días</strong>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width:${pct}%; background:${barColor};"></div>
                </div>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px; border-top:1px solid var(--border);">
              <span style="font-size:12px; color:var(--text-muted);">Procesado con ${STATE.activeProvider.split(' (')[0]}</span>
              <button type="button" class="btn btn-accent btn-sm" onclick="openPdfSampleFromCase('${c.pdfSampleId}')">Ver Borrador Redactado →</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderPdfWorkspace() {
  const grid = document.getElementById('pdfSamplesGrid');
  grid.innerHTML = PDF_SAMPLES.map((s) => `
    <div class="pdf-sample-item ${s.id === STATE.selectedPdfId ? 'active' : ''}" onclick="selectPdfSample('${s.id}')">
      <span class="badge ${s.badgeClass}">${s.typeBadge.split(' — ')[0]}</span>
      <h4>${s.shortTitle}</h4>
      <p>${s.subtitle}</p>
    </div>
  `).join('');

  const current = PDF_SAMPLES.find((s) => s.id === STATE.selectedPdfId) || PDF_SAMPLES[0];

  document.getElementById('btnDownloadCurrentPdf').href = current.file;
  document.getElementById('pdfPaperView').innerHTML = current.paperHtml;
  document.getElementById('pdfTaskHeaderTitle').textContent = current.shortTitle;
  document.getElementById('pdfTaskHeaderSub').textContent = `Analizado con tu cuenta vinculada: ${STATE.activeProvider}`;
  document.getElementById('pdfTaskTypeBadge').textContent = current.typeBadge;
  document.getElementById('pdfTaskTypeBadge').className = `badge ${current.badgeClass}`;
  document.getElementById('pdfAiSourceTag').textContent = `Vía ${STATE.activeProvider.split(' (')[0]} ($0 API)`;

  document.getElementById('pdfExtractedFields').innerHTML = `
    <div class="extracted-box">
      <span>Expediente Detectado</span>
      <strong>${current.expte}</strong>
    </div>
    <div class="extracted-box">
      <span>Juzgado / Radicación</span>
      <strong>${current.juzgado}</strong>
    </div>
    <div class="extracted-box">
      <span>Plazo / Vencimiento Calculado</span>
      <strong>${current.plazo}</strong>
    </div>
    <div class="extracted-box">
      <span>Monto / Importe Detectado</span>
      <strong>${current.monto}</strong>
    </div>
  `;

  document.getElementById('pdfDraftTextarea').value = current.draftText;
  document.getElementById('btnApprovePdfDraft').textContent = STATE.role === 'ADMIN'
    ? 'Auditar y Aprobar Escrito (Firma Titular)'
    : 'Guardar Revisión para el Abogado Titular';
}

window.selectPdfSample = function(sampleId) {
  STATE.selectedPdfId = sampleId;
  renderPdfWorkspace();
};

window.openPdfSampleFromCase = function(sampleId) {
  STATE.selectedPdfId = sampleId;
  switchTab('pdfs');
  renderPdfWorkspace();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function handleCustomPdfUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const customId = 'pdf-custom-upload';
  const customSample = {
    id: customId,
    file: 'pdfs/proveido_14820_25_deposito.pdf',
    shortTitle: `PDF Subido: ${file.name}`,
    subtitle: `Tamaño: ${(file.size / 1024).toFixed(1)} KB — Analizado en el navegador`,
    typeBadge: 'Análisis Personalizado con tu Suscripción',
    badgeClass: 'badge-blue',
    expte: 'Detectado del documento subido',
    caratula: file.name.replace(/\.pdf$/i, '').toUpperCase(),
    juzgado: 'Poder Judicial del Chaco (IURE / INDI)',
    acto: 'Proveído / Actuación procesal importada manualmente',
    plazo: '5 días hábiles judiciales desde notificación Art. 155 CPCCCh',
    monto: 'Verificación automática de planilla / depósito',
    paperHtml: `
      <div class="paper-header">
        <div>
          <h4>DOCUMENTO PDF CARGADO LOCALMENTE EN EL NAVEGADOR</h4>
          <p>Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB) — Privacidad 100% local</p>
        </div>
        <span class="badge badge-green">Leído correctamente</span>
      </div>
      <p style="margin-bottom:12px;">El archivo <strong>${file.name}</strong> fue leído directamente en tu sesión local sin subir información confidencial a terceros.</p>
      <p style="margin-bottom:12px;">En el sistema conectado, el motor extrae el texto completo del PDF, identifica menciones a <span class="hl-law">Notificaciones Art. 155 CPCCCh</span>, <span class="hl-deadline">plazos para contestar traslados o vistas</span> y <span class="hl-amount">montos depositados o regulaciones de honorarios</span>, enviando el contexto a tu suscripción vinculada (${STATE.activeProvider.split(' (')[0]}) para redactar el borrador.</p>
    `,
    draftText: `CONTESTA TRASLADO / PRESENTA ESCRITO SOBRE "${file.name.toUpperCase()}"

Señor Juez:

Dr. Titular del Estudio, por la participación acordada en los autos de referencia, ante V.S. respetuosamente digo:

I.- Que habiendo sido notificado de la providencia que antecede (documento "${file.name}"), vengo en legal tiempo y forma a contestar el traslado conferido y solicitar se provea lo que por derecho corresponda.

Proveer de conformidad,
SERÁ JUSTICIA.`
  };

  const existingIdx = PDF_SAMPLES.findIndex((s) => s.id === customId);
  if (existingIdx >= 0) {
    PDF_SAMPLES[existingIdx] = customSample;
  } else {
    PDF_SAMPLES.unshift(customSample);
  }

  STATE.selectedPdfId = customId;
  addAudit('CARGA_PDF_LOCAL', `Se analizó localmente el archivo PDF "${file.name}" con la suscripción activa.`);
  renderPdfWorkspace();
  renderAuditTab();
  showToast(`PDF "${file.name}" analizado con éxito`);
}

function simulateNewDispatch() {
  const newCase = {
    id: `c-${Date.now()}`,
    expteLex: '2.410/26',
    expteIure: '2410/2026-1-C',
    caratula: 'MORALES DIEGO C/ TRANSPORTE DEL LITORAL S.A. S/ DAÑOS Y PERJUICIOS',
    cliente: 'Morales, Diego Hernán',
    dependencia: 'Juzgado Civil y Comercial N° 2 - Sec. 2',
    motivo: 'NOTIFICACIÓN ART. 155 DEL CPCCCh',
    fecha: 'Hoy (Recién ingresado)',
    acceso: 'Libre',
    hasAtencion: false,
    taskSummary: 'Nuevo depósito judicial detectado → Escrito Acepta Pago y CBU listo para auditar',
    taskType: 'SIMPLE',
    pdfSampleId: 'pdf-deposito',
    inactiveDays: 0,
    deadlineText: 'Recién salido a despacho hoy',
    subcauses: [
      { title: 'Incidente de Beneficio de Litigar sin Gastos', status: 'En trámite' }
    ],
    history: [
      { doc: true, indi: false, fecha: 'Hoy (Recién)', folio: '94', desc: 'SALIÓ A DESPACHO: TÉNGASE PRESENTE DEPÓSITO JUDICIAL - NOTIF. ART. 155', origen: 'JUZGADO CIVIL Y COM. N° 2' }
    ]
  };

  STATE.cases.unshift(newCase);
  addAudit('INGESTA_GMAIL_DESPACHO', `Correo de Gmail detectado ("Salió a despacho" Expte. 2.410/26). PDF descargado y borrador preparado.`);
  renderAll();
  showToast('Nuevo correo de despacho procesado: Expte. 2.410/26 (PDF descargado y borrador listo)');
}

function renderAuditTab() {
  const cadContainer = document.getElementById('caducidadWatchdogList');
  cadContainer.innerHTML = STATE.cases.map((c) => {
    const pct = Math.min(100, Math.round((c.inactiveDays / 90) * 100));
    const isCrit = c.inactiveDays >= 60;
    return `
      <div style="margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid var(--border);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <strong style="font-size:13px; color:var(--text-main);">Expte. ${c.expteLex} — ${c.caratula}</strong>
          <span class="badge ${isCrit ? 'badge-red' : 'badge-green'}">${c.inactiveDays} / 90 días</span>
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px;">${c.dependencia} · Último movimiento: ${c.fecha}</div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%; background:${isCrit ? 'var(--danger)' : 'var(--success)'};"></div>
        </div>
      </div>
    `;
  }).join('');

  const prescContainer = document.getElementById('prescripcionWatchdogList');
  prescContainer.innerHTML = INITIAL_PRESCRIPTIONS.map((p) => `
    <div style="margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid var(--border);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <strong style="font-size:13px; color:var(--text-main);">${p.asunto}</strong>
        <span class="badge badge-amber">${p.plazoLegal}</span>
      </div>
      <div style="font-size:12px; color:var(--text-secondary);">Cliente: <strong>${p.cliente}</strong> · <span style="color:var(--danger); font-weight:600;">${p.vencimiento}</span></div>
      <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Estado: ${p.estado}</div>
    </div>
  `).join('');

  const auditTbody = document.getElementById('auditTableBody');
  auditTbody.innerHTML = STATE.auditLog.map((log) => `
    <tr>
      <td style="white-space:nowrap; font-family:var(--font-mono); font-size:12px;">${log.time}</td>
      <td style="font-weight:500; color:var(--text-main);">${log.user}</td>
      <td><span class="badge ${log.role === 'GUEST' ? 'badge-amber' : 'badge-neutral'}">${log.role}</span></td>
      <td><span class="expte-num">${log.event}</span></td>
      <td>${log.detail}</td>
    </tr>
  `).join('');
}

function openSubModal() {
  document.getElementById('subscriptionModal').classList.add('open');
}

function openModelsModal() {
  const modal = document.getElementById('modelsModal');
  const body = document.getElementById('modelsModalBody');

  if (STATE.role === 'GUEST') {
    addAudit('BLOQUEO_SEGURIDAD_IP', 'Usuario Invitado/Secretario intentó acceder o exportar la biblioteca completa de modelos exclusivos.');
    renderAuditTab();
    body.innerHTML = `
      <div style="background:var(--danger-soft); border:1px solid var(--danger-border); padding:16px; border-radius:var(--radius-md); color:var(--danger);">
        <h4 style="margin-bottom:6px;">Acceso Restringido — Protección de Patrimonio Intelectual</h4>
        <p style="font-size:13px;">El perfil <strong>Invitado / Secretario</strong> puede redactar y auditar borradores en las causas asignadas, pero no tiene permisos para descargar ni exportar la biblioteca de modelos exclusivos del Abogado Titular. Este intento quedó registrado en el Libro de Auditoría.</p>
      </div>
    `;
  } else {
    body.innerHTML = `
      <p style="font-size:13px; color:var(--text-secondary); margin-bottom:14px;">
        Estos modelos exclusivos de Word (.docx) son utilizados por tu suscripción conectada como base para redactar escritos manteniendo el estilo exacto del estudio:
      </p>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div style="padding:12px; border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px;">1. Modelo: Acepta Depósito Judicial, Denuncia CBU y Solicita Orden de Pago</strong>
            <div style="font-size:12px; color:var(--text-muted);">Automatización determinística ($0 costo) · Fuero Civil y Laboral</div>
          </div>
          <span class="badge badge-green">Activo</span>
        </div>
        <div style="padding:12px; border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px;">2. Modelo: Contestación de Traslado e Impugnación de Pericia / Planilla</strong>
            <div style="font-size:12px; color:var(--text-muted);">Base RAG para Copiloto IA · Art. 473 CPCCCh</div>
          </div>
          <span class="badge badge-green">Activo</span>
        </div>
        <div style="padding:12px; border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px;">3. Modelo: Solicita Nueva Cédula con Habilitación de Días y Horas Inhábiles</strong>
            <div style="font-size:12px; color:var(--text-muted);">Disparo automático ante Cédula con Informe Negativo</div>
          </div>
          <span class="badge badge-green">Activo</span>
        </div>
        <div style="padding:12px; border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px;">4. Modelo: Escrito Impulsorio contra Caducidad de Instancia (Art. 310 CPCCCh)</strong>
            <div style="font-size:12px; color:var(--text-muted);">Vinculado al Watchdog de 90 días</div>
          </div>
          <span class="badge badge-green">Activo</span>
        </div>
      </div>
    `;
  }

  modal.classList.add('open');
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('open'));
}

function addAudit(event, detail) {
  const now = new Date().toTimeString().split(' ')[0];
  STATE.auditLog.unshift({
    time: `Hoy ${now}`,
    user: STATE.role === 'ADMIN' ? TENANTS[STATE.tenantId].titular : 'Secretario / Operador',
    role: STATE.role,
    event,
    detail
  });
}

function downloadWordDoc(text, filename) {
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"></head><body style="font-family:'Times New Roman',serif; font-size:12pt; line-height:1.5;"><pre style="font-family:'Times New Roman',serif; white-space:pre-wrap;">${text}</pre></body></html>`;
  const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Descargado en formato Word: ${filename}`);
}

function showToast(msg) {
  const box = document.getElementById('toastBox');
  box.textContent = msg;
  box.classList.add('show');
  clearTimeout(box._timer);
  box._timer = setTimeout(() => box.classList.remove('show'), 3200);
}
