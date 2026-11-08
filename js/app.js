/* ==========================================================================
   AIL (Al Legales) — Lógica de Aplicación, Cursos & Copiloto Judicial
   Inspirado en el diseño oficial de AIL Al Legales (Cursos & Gestión)
   ========================================================================== */

// BASE DE DATOS DE CURSOS OFICIALES (OCR DE CURSOS.PDF & DDD.PDF)
const COURSES_DATA = {
  upcoming: [
    {
      id: 'curso-ia-ejercicio-4',
      title: 'IA Aplicada al ejercicio profesional - 4° Edición',
      badge: 'Inscripción abierta',
      meta: 'martes 17 de noviembre · 17:00 · GMT-3 · 1 clase de 2 horas · Virtual vía Zoom',
      desc: 'Una clase práctica para incorporar la IA al trabajo diario del estudio: qué herramientas usar y cómo sacarles provecho, y cómo organizar el estudio para que la IA trabaje con tu información.',
      price: '$99.000',
      priceNum: 99000,
      action: 'Inscribirme ahora',
      modules: [
        { num: 'Módulo 1', name: 'Arquitectura de LLMs para el ejercicio legal: Claude Pro, ChatGPT Plus y Gemini Advanced. Comparativa de seguridad.' },
        { num: 'Módulo 2', name: 'Prompt Engineering Judicial: Redacción precisa de demandas, cédulas, oficios y recursos sin alucinaciones.' },
        { num: 'Módulo 3', name: 'Extracción automática de plazos procesales perentorios y cálculo de vencimientos en expedientes digitales.' },
        { num: 'Módulo 4', name: 'Secreto profesional, anonimización de datos y protocolo de resguardo documental para el estudio jurídico.' }
      ]
    },
    {
      id: 'curso-ciberfraude-evidencia',
      title: 'Ciberfraude y Evidencia Digital',
      badge: 'Inscripción abierta',
      meta: 'martes 1 de diciembre · 17:00 · GMT-3 · 1 clase de 2 horas · Virtual vía Zoom',
      desc: 'El curso brinda herramientas para reconocer las modalidades de fraude más habituales y su encuadre. También aborda cómo identificar las fuentes de evidencia digital, cómo preservarlas con integridad y cadena de custodia, qué medidas urgentes corresponde requerir y cómo actuar frente a bancos y fintech para rastrear los fondos.',
      price: '$95.000',
      priceNum: 95000,
      action: 'Inscribirme ahora',
      modules: [
        { num: 'Módulo 1', name: 'Tipología de estafas bancarias: phishing, SIM swapping, transferencias no autorizadas y vaciamiento de cuentas.' },
        { num: 'Módulo 2', name: 'Cadena de custodia digital: obtención de hashes, preservación de metadatos y actas notariales digitales.' },
        { num: 'Módulo 3', name: 'Medidas cautelares urgentes, comunicaciones de bloqueo preventivo a bancos, BCRA y fintechs.' },
        { num: 'Módulo 4', name: 'Estrategia litigiosa: responsabilidad objetiva bancaria bajo la Ley de Defensa del Consumidor.' }
      ]
    }
  ],
  recorded: [
    {
      id: 'rec-amparo-salud-2',
      title: 'Amparo de salud (2da edición)',
      meta: 'Clase del 5/11/2026 · 1 clase de 2 horas',
      desc: 'El objetivo del curso es brindar herramientas a abogados/as que deseen adentrarse en el conocimiento de esta temática sobre aspectos claves tales como la organización del sistema sanitario, las principales leyes prestacionales, las vías procesales más elegidas y sus requisitos de admisibilidad.',
      price: '$95.000',
      priceNum: 95000,
      modules: [
        { num: 'Módulo 1', name: 'Estructura del sistema de salud argentino: Obras Sociales y Empresas de Medicina Prepaga.' },
        { num: 'Módulo 2', name: 'Leyes prestacionales claves: Ley 24.901 (Discapacidad), Ley 23.660 y 23.661.' },
        { num: 'Módulo 3', name: 'Medidas cautelares innovativas y autosatisfactivas en salud. Plazos y prueba médica requerida.' }
      ]
    },
    {
      id: 'rec-consumidor-accion',
      title: 'Derecho del consumidor en acción',
      meta: 'Clase del 20/10/2026',
      desc: 'En Derecho del Consumidor, buena parte del resultado se define en las decisiones que tomás desde el primer día. Recorré el camino completo —consulta, reclamo, audiencia y demanda— con criterios claros y ejemplos prácticos para saber qué hacer y cuándo.',
      price: '$90.000',
      priceNum: 90000,
      modules: [
        { num: 'Módulo 1', name: 'Fase prejudicial: Reclamo administrativo formal y comparecencia ante COPREC / Defensas del Consumidor.' },
        { num: 'Módulo 2', name: 'Cuantificación y reclamo del daño punitivo (Art. 52 bis LDC) y daño directo.' },
        { num: 'Módulo 3', name: 'Estrategia de demanda judicial: beneficio de justicia gratuita y carga dinámica de la prueba.' }
      ]
    },
    {
      id: 'rec-migratorio-practica-2',
      title: 'Derecho migratorio en la práctica (2da edición)',
      meta: 'Clase del 8/10/2026 · 1 clase de 2 horas',
      desc: 'Una capacitación práctica para el ejercicio profesional en materia migratoria: desde el inicio del expediente ante la Dirección Nacional de Migraciones hasta los recursos.',
      price: '$95.000',
      priceNum: 95000,
      modules: [
        { num: 'Módulo 1', name: 'Trámites de radicación temporaria y permanente ante la Dirección Nacional de Migraciones (DNM).' },
        { num: 'Módulo 2', name: 'Recursos administrativos y judiciales contra cancelaciones de residencia y órdenes de expulsión.' },
        { num: 'Módulo 3', name: 'Habeas corpus migratorio y medidas cautelares de no innovar.' }
      ]
    },
    {
      id: 'rec-laboral-practica',
      title: 'Derecho laboral en la práctica',
      meta: 'Clase del 22/9/2026',
      desc: 'Un recorrido práctico por el conflicto laboral, analizando los posibles escenarios, desde el primer telegrama hasta la demanda.',
      price: '$90.000',
      priceNum: 90000,
      modules: [
        { num: 'Módulo 1', name: 'Intercambio telegráfico: multas de las Leyes 24.013, 25.323 y 25.345.' },
        { num: 'Módulo 2', name: 'Despido directo e indirecto: encuadre y liquidación de rubros indemnizatorios.' },
        { num: 'Módulo 3', name: 'Redacción de demanda laboral, ofrecimiento de testimoniales y pericial contable.' }
      ]
    },
    {
      id: 'rec-sociedades-3',
      title: 'Curso práctico sobre Sociedades (3° edición)',
      meta: 'Clase del 30/9/2026',
      desc: 'Curso orientado a abogados/as y contadores/as que asesoran en la constitución de sociedades, reforma de estatutos y designación de autoridades.',
      price: '$95.000',
      priceNum: 95000,
      modules: [
        { num: 'Módulo 1', name: 'Constitución y registro de S.R.L. y S.A. ante la Inspección General de Justicia y Registros Públicos.' },
        { num: 'Módulo 2', name: 'Modificaciones estatutarias, aumento de capital y designación e inscripción de autoridades.' },
        { num: 'Módulo 3', name: 'Conflictos societarios, medidas cautelares societarias y asambleas judiciales.' }
      ]
    },
    {
      id: 'rec-uso-seguro-ia',
      title: 'Uso profesional y seguro de la IA',
      meta: 'Clase del 30/6/2026',
      desc: 'Cómo usar IA en tu estudio sin filtrar datos ni citar fallos que no existen. Protocolo de trabajo paso a paso + checklist de seguridad, listos para aplicar.',
      price: '$95.000',
      priceNum: 95000,
      modules: [
        { num: 'Módulo 1', name: 'Privacidad y confidencialidad en modelos de lenguaje: configuración segura para estudios jurídicos.' },
        { num: 'Módulo 2', name: 'Prevención estricta de alucinaciones en citas de jurisprudencia y doctrina legal.' },
        { num: 'Módulo 3', name: 'Protocolo de validación humana obligatoria y checklist de verificación antes de firmar escritos.' }
      ]
    },
    {
      id: 'rec-sociedad-extranjero',
      title: '¿Cómo constituir una sociedad en el extranjero?',
      meta: 'Clase del 26/3/2026',
      desc: 'Conocé las herramientas necesarias para asesorar en la constitución de sociedades en el extranjero, comprendiendo los aspectos prácticos, documentales y las ventajas específicas de cada jurisdicción.',
      price: '$60.000',
      priceNum: 60000,
      modules: [
        { num: 'Módulo 1', name: 'Jurisdicciones estratégicas: Delaware, Wyoming, Florida, España y Uruguay.' },
        { num: 'Módulo 2', name: 'Procedimiento paso a paso para abrir LLCs en USA, Registered Agent y obtención de EIN ante IRS.' },
        { num: 'Módulo 3', name: 'Apertura de cuentas bancarias internacionales y cumplimiento normativo / fiscal.' }
      ]
    },
    {
      id: 'rec-baremo-dnu',
      title: 'Nuevo Baremo · DNU 549/25',
      meta: 'Clase del 15/4/2026',
      desc: 'Curso SRT: Nuevo Baremo. DNU 549/25 y Sistema de Riesgos del Trabajo. Un recorrido práctico por el sistema de riesgos del trabajo: desde la relación trabajador-ART y los tipos de contingencias hasta la aplicación concreta del nuevo baremo introducido por el DNU 549/25.',
      price: '$70.000',
      priceNum: 70000,
      modules: [
        { num: 'Módulo 1', name: 'Alcance del DNU 549/25 sobre el régimen de la Ley de Riesgos del Trabajo (LRT 24.557).' },
        { num: 'Módulo 2', name: 'Nuevo baremo de incapacidades laborales: factores de ponderación y tablas médicas.' },
        { num: 'Módulo 3', name: 'Trámite ante Comisiones Médicas de la SRT e impugnación de dictámenes en sede laboral.' }
      ]
    },
    {
      id: 'rec-ia-ejercicio-3',
      title: 'IA Aplicada al ejercicio de la profesión — 3° Ed.',
      meta: 'Clase del 10/3/2026',
      desc: 'Una introducción práctica al uso de herramientas de inteligencia artificial diseñadas para optimizar tareas jurídicas, mejorar la productividad y potenciar la práctica profesional.',
      price: '$60.000',
      priceNum: 60000,
      modules: [
        { num: 'Módulo 1', name: 'Fundamentos de IA generativa para la práctica forense diaria.' },
        { num: 'Módulo 2', name: 'Confección ágil de cartas documento, intimaciones y escritos de mero trámite.' },
        { num: 'Módulo 3', name: 'Casos reales de aumento de productividad en despachos unipersonales.' }
      ]
    },
    {
      id: 'rec-workshop-ia',
      title: 'Workshop IA Aplicada',
      meta: 'Clase del 27/5/2026',
      desc: 'Un workshop intensivo pensado para abogados que quieren incorporar herramientas de inteligencia artificial a su práctica diaria.',
      price: '$100.000',
      priceNum: 100000,
      modules: [
        { num: 'Módulo 1', name: 'Taller interactivo en vivo con expedientes judiciales reales de más de 200 fojas.' },
        { num: 'Módulo 2', name: 'Estrategia de análisis de testimoniales contradictorias y armado de alegatos.' },
        { num: 'Módulo 3', name: 'Automatización de resúmenes de estado de causa para reportar a clientes.' }
      ]
    }
  ]
};

// ESTADO GLOBAL
const STATE = {
  activeTab: 'cursos',
  courseFilter: 'all',
  courseSearch: '',
  tenant: 'estudio_principal',
  role: 'ADMIN',
  selectedCaseId: 'c-1',
  selectedPdfSampleId: 'pdf-deposito',
  searchQuery: '',
  filterArt155Only: false
};

const TENANTS = {
  estudio_principal: {
    name: 'Estudio Jurídico Dr. Gómez',
    titular: 'Dr. Matías Luis Brunskole',
    roleLabel: 'Plan Free',
    avatar: 'EB',
    provider: 'Claude Pro'
  },
  estudio_asociados: {
    name: 'Estudio Asociados Resistencia',
    titular: 'Dra. Silvana Ramírez',
    roleLabel: 'Plan Pro',
    avatar: 'SR',
    provider: 'ChatGPT Plus'
  }
};

const PDF_SAMPLES = [
  {
    id: 'pdf-deposito',
    title: '1. Depósito Judicial ($1.850.000)',
    expte: '14.820/25',
    caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS',
    juzgado: 'Juzgado Civil y Comercial N° 3',
    plazo: 'Habilita libramiento de pago',
    monto: '$ 1.850.000,00 (Nuevo Banco del Chaco)',
    docText: `
      <div style="border-bottom:2px solid #0f172a; padding-bottom:8px; margin-bottom:16px; display:flex; justify-content:space-between;">
        <strong>PODER JUDICIAL DEL CHACO — JUZGADO CIVIL Y COMERCIAL N° 3</strong>
        <span>Expte. N° 14.820/25</span>
      </div>
      <p style="margin-bottom:12px;"><strong>AUTOS Y VISTOS:</strong> Para proveer en autos caratulados <em>"PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS" (Expte. N° 14.820/25)</em>;</p>
      <p style="margin-bottom:12px;"><strong>RESUELVO:</strong> Téngase presente la boleta de depósito judicial informada por el Nuevo Banco del Chaco S.A. por la suma de <span style="background:#d1fae5; color:#065f46; font-weight:600; padding:1px 4px; border-radius:3px;">$ 1.850.000,00</span> en concepto de capital de condena.</p>
      <p style="margin-bottom:12px;">Hágase saber a la parte actora. Previo a ordenar la libranza electrónica, denuncie cuenta bancaria (CBU) y situación fiscal ante ARCA. Notifíquese conforme Art. 155 CPCCCh.</p>
      <p style="font-size:11px; color:#64748b; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:8px;">Firma Digital Verificada: Secretaría N° 3.</p>
    `,
    draft: `ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA ORDEN DE PAGO ELECTRÓNICA

Señor Juez Civil y Comercial N° 3:

Dr. Matías Luis Brunskole, en representación de la actora en autos "PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS" (Expte. 14.820/25), ante V.S. digo:

I.- ACEPTA PAGO: Habiendo tomado conocimiento del proveído mediante el cual se informa el depósito judicial por $ 1.850.000,00 en el Nuevo Banco del Chaco S.A., vengo a manifestar mi conformidad y aceptar el mismo.

II.- DENUNCIA CBU: A los fines de la transferencia de fondos, denuncio los siguientes datos:
- Titular: Juan Carlos Pérez
- Banco: Nuevo Banco del Chaco S.A.
- CBU: 31100002-11000045891234
- CUIT: 20-28451920-4 (Monotributista)

III.- PETITORIO: Se ordene el libramiento de la orden de pago electrónica correspondiente.

SERÁ JUSTICIA.`
  },
  {
    id: 'pdf-pericia',
    title: '2. Traslado de Pericia (5 Días)',
    expte: '8.310/24',
    caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO',
    juzgado: 'Juzgado del Trabajo N° 1',
    plazo: '5 días hábiles judiciales',
    monto: 'Planilla Pericial: $ 6.420.500,00',
    docText: `
      <div style="border-bottom:2px solid #0f172a; padding-bottom:8px; margin-bottom:16px; display:flex; justify-content:space-between;">
        <strong>PODER JUDICIAL DEL CHACO — JUZGADO DEL TRABAJO N° 1</strong>
        <span>Expte. N° 8.310/24</span>
      </div>
      <p style="margin-bottom:12px;"><strong>AUTOS Y VISTOS:</strong> El dictamen pericial contable presentado en autos <em>"GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO" (Expte. 8.310/24)</em>;</p>
      <p style="margin-bottom:12px;"><strong>RESUELVO:</strong> De la pericia contable y planilla por la suma de <span style="background:#d1fae5; color:#065f46; font-weight:600; padding:1px 4px; border-radius:3px;">$ 6.420.500,00</span>, córrase traslado a las partes por el término de <span style="background:#fef3c7; color:#92400e; font-weight:600; padding:1px 4px; border-radius:3px;">CINCO (5) DÍAS HÁBILES JUDICIALES</span>, bajo apercibimiento de ley (Art. 473 CPCCCh).</p>
      <p style="margin-bottom:12px;">Notifíquese por cédula electrónica conforme Art. 155 CPCCCh.</p>
      <p style="font-size:11px; color:#64748b; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:8px;">Firma Digital: Juez del Trabajo N° 1.</p>
    `,
    draft: `CONTESTA TRASLADO DE PERICIA CONTABLE - OBSERVA CÁLCULO DE INTERESES

Señor Juez del Trabajo N° 1:

Dr. Matías Luis Brunskole, apoderado de la actora en autos "GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO" (Expte. 8.310/24), a V.S. digo:

I.- En legal tiempo y forma, dentro del plazo de 5 días hábiles conferido, contesto el traslado de la pericia contable presentada.

II.- CONSIENTE: Se consienten las bases salariales y los rubros indemnizatorios calculados.

III.- IMPUGNA TASA: Se solicita al perito rectifique la tasa de interés aplicada desde la fecha del distracto, debiendo aplicar la tasa activa cartera general del Banco Nación con capitalización periódica conforme doctrina vigente del STJ Chaco.

SERÁ JUSTICIA.`
  },
  {
    id: 'pdf-cedula',
    title: '3. Cédula con Informe Negativo',
    expte: '1.505/25',
    caratula: 'FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS',
    juzgado: 'Juzgado de Familia N° 2',
    plazo: 'Activar trámite',
    monto: 'No aplica',
    docText: `
      <div style="border-bottom:2px solid #0f172a; padding-bottom:8px; margin-bottom:16px; display:flex; justify-content:space-between;">
        <strong>PODER JUDICIAL DEL CHACO — JUZGADO DE FAMILIA N° 2</strong>
        <span>Expte. N° 1.505/25</span>
      </div>
      <p style="margin-bottom:12px;"><strong>INFORME DE OFICIAL NOTIFICADOR:</strong> En fecha 08/11/2026 me constituí en el domicilio denunciado no hallando moradores. Vecinos informan que trabaja en horario matutino. Se devuelve cédula con <span style="background:#fee2e2; color:#991b1b; font-weight:600; padding:1px 4px; border-radius:3px;">INFORME NEGATIVO</span>.</p>
      <p style="margin-bottom:12px;"><strong>PROVEÍDO:</strong> Téngase presente. Hágase saber a la actora a fin de que inste lo que por derecho corresponda.</p>
      <p style="font-size:11px; color:#64748b; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:8px;">Oficina de Mandamientos y Notificaciones.</p>
    `,
    draft: `SOLICITA NUEVA CÉDULA CON HABILITACIÓN DE DÍAS Y HORAS INHÁBILES

Señor Juez de Familia N° 2:

Dr. Matías Luis Brunskole, por la parte actora en autos "FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS" (Expte. 1.505/25), a V.S. digo:

Atento al informe del oficial notificador del cual surge que el demandado se ausenta en horario matutino por razones laborales, vengo a solicitar se libre nueva cédula de notificación con expresa HABILITACIÓN DE DÍAS Y HORAS INHÁBILES (Art. 153 CPCCCh).

SERÁ JUSTICIA.`
  },
  {
    id: 'pdf-caducidad',
    title: '4. Alerta de Caducidad (78 Días)',
    expte: '3.105/23',
    caratula: 'CREDITOS DEL NORTE C/ RODRIGUEZ LUIS S/ EJECUTIVO',
    juzgado: 'Juzgado Civil y Comercial N° 1',
    plazo: '12 días restantes antes de 3 meses',
    monto: 'Juicio Ejecutivo: $ 3.200.000,00',
    docText: `
      <div style="border-bottom:2px solid #0f172a; padding-bottom:8px; margin-bottom:16px; display:flex; justify-content:space-between;">
        <strong>ALERTA DE INACTIVIDAD PROCESAL — WATCHDOG AIL</strong>
        <span>Expte. N° 3.105/23</span>
      </div>
      <p style="margin-bottom:12px;"><strong>ESTADO DE AUTOS:</strong> Han transcurrido <span style="background:#fee2e2; color:#991b1b; font-weight:600; padding:1px 4px; border-radius:3px;">78 días corridos</span> sin que la contraparte ni el juzgado impulsen el expediente.</p>
      <p style="margin-bottom:12px;">A fin de evitar la caducidad de instancia de TRES (3) MESES (Art. 310 inc. 2 CPCCCh), se generó el escrito de pase a resolver para interrumpir el plazo inmediatamente.</p>
      <p style="font-size:11px; color:#64748b; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:8px;">Monitoreo preventivo del estudio.</p>
    `,
    draft: `ACTIVA TRÁMITE - SOLICITA PASEN AUTOS A DESPACHO PARA RESOLVER

Señor Juez Civil y Comercial N° 1:

Dr. Matías Luis Brunskole, en autos "CREDITOS DEL NORTE C/ RODRIGUEZ LUIS S/ EJECUTIVO" (Expte. 3.105/23), a V.S. digo:

Que atento al estado de autos y encontrándose cumplidas las vistas previas, solicito pasen las actuaciones a despacho a fin de resolver, sirviendo esta presentación de expreso acto de impulso procesal (Art. 310 CPCCCh).

SERÁ JUSTICIA.`
  }
];

const CASES = [
  {
    id: 'c-1',
    expte: '14.820/25',
    iure: '14820/2025-1-C',
    caratula: 'PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS',
    juzgado: 'Juzgado Civil y Comercial N° 3',
    cliente: 'Juan Carlos Pérez',
    fecha: 'Hoy 07:15',
    tag: 'Depósito Judicial',
    tagColor: 'badge-green',
    sampleId: 'pdf-deposito',
    inactiveDays: 2,
    motivo: 'NOTIF. ART. 155 CPCCCh',
    taskDesc: 'Depósito de $1.850.000 informado por el banco. Escrito listo para denunciar CBU y cobrar.'
  },
  {
    id: 'c-2',
    expte: '8.310/24',
    iure: '8310/2024-1-L',
    caratula: 'GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO',
    juzgado: 'Juzgado del Trabajo N° 1',
    cliente: 'María Elena Gómez',
    fecha: 'Hoy 07:42',
    tag: 'Traslado 5 Días',
    tagColor: 'badge-amber',
    sampleId: 'pdf-pericia',
    inactiveDays: 5,
    motivo: 'NOTIF. ART. 155 CPCCCh',
    taskDesc: 'Traslado de pericia contable ($6.420.500). Contestación e impugnación de tasa lista.'
  },
  {
    id: 'c-3',
    expte: '1.505/25',
    iure: '1505/2025-1-F',
    caratula: 'PUZIO ROMINA C/ HERRERA JUAN S/ DIVORCIO',
    juzgado: 'Juzgado de Niñez, Adolescencia y Familia N° 2 - Charata',
    cliente: 'Romina Marianela Puzio',
    fecha: 'Hoy 08:05',
    tag: 'Cédula Negativa',
    tagColor: 'badge-red',
    sampleId: 'pdf-cedula',
    inactiveDays: 8,
    motivo: 'NOTIF. ART. 155 CPCCCh',
    taskDesc: 'Cédula con informe negativo devuelta por el oficial notificador. Escrito listo para habilitación de días inhábiles.'
  },
  {
    id: 'c-4',
    expte: '3.105/23',
    iure: '3105/2023-1-C',
    caratula: 'CREDITOS DEL NORTE C/ RODRIGUEZ LUIS S/ EJECUTIVO',
    juzgado: 'Juzgado Civil y Comercial N° 1',
    cliente: 'Créditos del Norte S.A.',
    fecha: 'Hoy 08:30',
    tag: 'Alerta Caducidad',
    tagColor: 'badge-red',
    sampleId: 'pdf-caducidad',
    inactiveDays: 78,
    motivo: 'INACTIVIDAD 78 DÍAS',
    taskDesc: 'Riesgo inminente de caducidad de instancia (3 meses). Escrito de impulso procesal preparado.'
  }
];

const AUDIT_LOGS = [
  { time: '08/11 08:30', user: 'Matías Brunskole', role: 'ADMIN', op: 'AUDIT_ESCRITO', detail: 'Aprobó borrador de impulso en Expte. 3.105/23 (Caducidad evitada).' },
  { time: '08/11 08:05', user: 'Secretaría Charata', role: 'OPERADOR', op: 'RECEPCIÓN_CÉDULA', detail: 'Descargó cédula diligenciada con informe negativo en Expte. 1.505/25.' },
  { time: '08/11 07:42', user: 'Robot Despacho', role: 'SISTEMA', op: 'SYNC_IURE', detail: 'Sincronizó cédula electrónica Art. 155 CPCCCh en Juzgado del Trabajo N° 1.' },
  { time: '08/11 07:15', user: 'Robot Despacho', role: 'SISTEMA', op: 'DEPÓSITO_DETECTADO', detail: 'Identificó boleta de depósito Nuevo Banco del Chaco por $1.850.000.' }
];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCursos();
  setupSpotlight();
  setupModals();
  setupJudicialOperations();
  renderAll();
});

// NAVEGACIÓN ENTRE SECCIONES
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.tab-view');
  const legalHeader = document.getElementById('legalContentHeader');

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (!tab) return;

      tabs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      views.forEach((v) => v.classList.remove('active'));

      let targetView = document.getElementById(`view-${tab}`);
      if (!targetView) {
        targetView = document.getElementById('view-placeholder');
        const titleEl = document.getElementById('placeholderTitle');
        const descEl = document.getElementById('placeholderDesc');
        if (titleEl) titleEl.textContent = btn.querySelector('span')?.textContent || 'Módulo AIL';
        if (descEl) descEl.textContent = `Sección "${btn.querySelector('span')?.textContent}" configurada y disponible en tu plan de estudio.`;
      }

      if (targetView) targetView.classList.add('active');
      STATE.activeTab = tab;

      // Mostrar u ocultar el header secundario según la vista
      if (legalHeader) {
        if (tab === 'cursos') {
          legalHeader.style.display = 'none';
        } else {
          legalHeader.style.display = 'flex';
          const titles = {
            'despacho': 'Bandeja de Despacho Diario',
            'recorrida': 'Mis Expedientes en Recorrida (IURE / Lex Chaco)',
            'pdf-viewer': 'Visor & Analizador de PDFs Judiciales',
            'vencimientos': 'Control de Vencimientos & Caducidad de Instancia',
            'auditoria': 'Biblioteca de Modelos & Registro de Auditoría'
          };
          const pageTitleEl = document.getElementById('pageTitle');
          if (pageTitleEl) pageTitleEl.textContent = titles[tab] || btn.querySelector('span')?.textContent || 'AIL Legales';
        }
      }
    });
  });

  // Colapsar / expandir sidebar
  const btnToggleSidebar = document.getElementById('btnToggleSidebar');
  const mainSidebar = document.getElementById('mainSidebar');
  if (btnToggleSidebar && mainSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
      mainSidebar.classList.toggle('collapsed');
    });
  }

  // Clic en la marca AIL para volver a Cursos
  const brandHomeTrigger = document.getElementById('brandHomeTrigger');
  if (brandHomeTrigger) {
    brandHomeTrigger.addEventListener('click', () => {
      const cursosTab = document.querySelector('.nav-item[data-tab="cursos"]');
      if (cursosTab) cursosTab.click();
    });
  }
}

// SETUP DE CURSOS (OFICIAL DE LOS PDFs)
function setupCursos() {
  const searchInput = document.getElementById('courseSearchInput');
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const btnAccesoTotal = document.getElementById('btnAccesoTotalTrigger');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.courseSearch = e.target.value.toLowerCase().trim();
      renderCursos();
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.courseFilter = btn.dataset.filter || 'all';
      renderCursos();
    });
  });

  if (btnAccesoTotal) {
    btnAccesoTotal.addEventListener('click', () => {
      openCheckoutModal({
        title: 'ACCESO TOTAL — Todas las Grabaciones',
        sub: 'Los 10 cursos grabados, con sus materiales, para ver cuando quieras.',
        price: '$290.000',
        priceNum: 290000
      });
    });
  }

  renderCursos();
}

function renderCursos() {
  const upcomingGrid = document.getElementById('upcomingCoursesGrid');
  const recordedGrid = document.getElementById('recordedCoursesGrid');
  const sectionUpcoming = document.getElementById('sectionUpcomingBlock');
  const sectionRecorded = document.getElementById('sectionRecordedBlock');
  const accesoBanner = document.getElementById('accesoTotalBanner');

  const query = STATE.courseSearch;
  const filter = STATE.courseFilter;

  // Filtrado de Próximos
  const filteredUpcoming = COURSES_DATA.upcoming.filter((c) => {
    if (filter === 'recorded') return false;
    if (!query) return true;
    return c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query) || c.meta.toLowerCase().includes(query);
  });

  // Filtrado de Grabaciones
  const filteredRecorded = COURSES_DATA.recorded.filter((c) => {
    if (filter === 'upcoming') return false;
    if (!query) return true;
    return c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query) || c.meta.toLowerCase().includes(query);
  });

  // Control de visibilidad de secciones
  if (sectionUpcoming) {
    sectionUpcoming.style.display = (filter === 'recorded' || filteredUpcoming.length === 0) ? 'none' : 'block';
  }
  if (sectionRecorded) {
    sectionRecorded.style.display = (filter === 'upcoming' || filteredRecorded.length === 0) ? 'none' : 'block';
  }
  if (accesoBanner) {
    accesoBanner.style.display = (filter === 'upcoming') ? 'none' : 'grid';
  }

  // Render Próximos
  if (upcomingGrid) {
    upcomingGrid.innerHTML = filteredUpcoming.map((c) => `
      <div class="curso-card">
        <div>
          <span class="curso-badge-open">${c.badge}</span>
          <h3 class="curso-title">${c.title}</h3>
          <div class="curso-meta">${c.meta}</div>
          <p class="curso-desc">${c.desc}</p>
          <a class="curso-program-link" onclick="openProgramModal('${c.id}')">Programa del curso +</a>
        </div>
        <div class="curso-card-footer">
          <div class="curso-price">${c.price}</div>
          <button type="button" class="curso-action-btn" onclick="openCheckoutModalById('${c.id}')">${c.action}</button>
        </div>
      </div>
    `).join('');
  }

  // Render Grabaciones
  if (recordedGrid) {
    recordedGrid.innerHTML = filteredRecorded.map((c) => `
      <div class="curso-card">
        <div>
          <h3 class="curso-title">${c.title}</h3>
          <div class="curso-meta">${c.meta}</div>
          <p class="curso-desc">${c.desc}</p>
          <a class="curso-program-link" onclick="openProgramModal('${c.id}')">Programa del curso +</a>
        </div>
        <div class="curso-card-footer">
          <div class="curso-price">${c.price}</div>
          <button type="button" class="curso-action-btn" onclick="openCheckoutModalById('${c.id}')">Comprar la grabación</button>
        </div>
      </div>
    `).join('');
  }
}

// PROGRAMA DEL CURSO MODAL
window.openProgramModal = function(courseId) {
  const all = [...COURSES_DATA.upcoming, ...COURSES_DATA.recorded];
  const course = all.find((c) => c.id === courseId);
  if (!course) return;

  document.getElementById('progModalTitle').textContent = course.title;
  document.getElementById('progModalMeta').textContent = course.meta;
  document.getElementById('progModalDesc').textContent = course.desc;

  const modulesBox = document.getElementById('progModalModules');
  modulesBox.innerHTML = course.modules.map((m) => `
    <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:4px; padding:10px 12px;">
      <strong style="color:#111827; font-size:12px; display:block; margin-bottom:2px;">${m.num}</strong>
      <div style="color:#4b5563; font-size:12px; line-height:1.45;">${m.name}</div>
    </div>
  `).join('');

  const btnEnroll = document.getElementById('btnProgModalEnroll');
  btnEnroll.textContent = course.action || 'Comprar la grabación';
  btnEnroll.onclick = () => {
    closeAllModals();
    openCheckoutModalById(course.id);
  };

  document.getElementById('programModal').classList.add('open');
};

// CHECKOUT / INSCRIPCIÓN MODAL
window.openCheckoutModalById = function(courseId) {
  const all = [...COURSES_DATA.upcoming, ...COURSES_DATA.recorded];
  const course = all.find((c) => c.id === courseId);
  if (!course) return;

  openCheckoutModal({
    title: course.title,
    sub: course.meta,
    price: course.price,
    priceNum: course.priceNum
  });
};

function openCheckoutModal(item) {
  document.getElementById('chkItemName').textContent = item.title;
  document.getElementById('chkModalSub').textContent = item.sub;
  document.getElementById('chkItemPrice').textContent = item.price;
  document.getElementById('checkoutModal').classList.add('open');
}

window.confirmOrderAction = function() {
  const name = document.getElementById('chkInputName').value;
  const email = document.getElementById('chkInputEmail').value;
  const item = document.getElementById('chkItemName').textContent;

  closeAllModals();
  showToast(`¡Inscripción confirmada para ${name}! Enlace y materiales enviados a ${email}`);
};

// SPOTLIGHT SEARCH (CTRL + K)
function setupSpotlight() {
  const btnTrigger = document.getElementById('btnSidebarSpotlight');
  const modal = document.getElementById('spotlightModal');
  const input = document.getElementById('spotlightInput');
  const resultsBox = document.getElementById('spotlightResults');

  const openSpotlight = () => {
    modal.classList.add('open');
    input.value = '';
    input.focus();
    renderSpotlightResults('');
  };

  if (btnTrigger) {
    btnTrigger.addEventListener('click', openSpotlight);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSpotlight();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });

  input.addEventListener('input', (e) => {
    renderSpotlightResults(e.target.value.toLowerCase().trim());
  });

  function renderSpotlightResults(q) {
    const allCourses = [...COURSES_DATA.upcoming, ...COURSES_DATA.recorded];
    const matchCourses = allCourses.filter((c) => !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    const matchCases = CASES.filter((c) => !q || c.expte.toLowerCase().includes(q) || c.caratula.toLowerCase().includes(q));

    let html = '';

    if (matchCourses.length > 0) {
      html += `<div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:#9ca3af; padding:6px 8px 4px 8px;">Cursos Disponibles (${matchCourses.length})</div>`;
      html += matchCourses.slice(0, 4).map((c) => `
        <div style="padding:8px 10px; border-radius:6px; cursor:pointer; display:flex; justify-content:space-between; align-items:center;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'" onclick="selectCourseFromSpotlight('${c.id}')">
          <div>
            <div style="font-weight:600; color:#111827; font-size:12.5px;">${c.title}</div>
            <div style="font-size:11px; color:#6b7280;">${c.meta}</div>
          </div>
          <span style="font-weight:700; color:#111827; font-size:12px;">${c.price}</span>
        </div>
      `).join('');
    }

    if (matchCases.length > 0) {
      html += `<div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:#9ca3af; padding:10px 8px 4px 8px;">Expedientes en Recorrida (${matchCases.length})</div>`;
      html += matchCases.slice(0, 3).map((c) => `
        <div style="padding:8px 10px; border-radius:6px; cursor:pointer; display:flex; justify-content:space-between; align-items:center;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'" onclick="selectCaseFromSpotlight('${c.id}')">
          <div>
            <div style="font-weight:600; color:#111827; font-size:12.5px;">${c.expte} — ${c.caratula}</div>
            <div style="font-size:11px; color:#6b7280;">${c.juzgado} · ${c.motivo}</div>
          </div>
          <span class="badge ${c.tagColor}">${c.tag}</span>
        </div>
      `).join('');
    }

    if (!html) {
      html = `<div style="padding:20px; text-align:center; color:#9ca3af; font-size:12.5px;">No se encontraron resultados para "${q}"</div>`;
    }

    resultsBox.innerHTML = html;
  }
}

window.selectCourseFromSpotlight = function(id) {
  closeAllModals();
  const cursosTab = document.querySelector('.nav-item[data-tab="cursos"]');
  if (cursosTab) cursosTab.click();
  openProgramModal(id);
};

window.selectCaseFromSpotlight = function(id) {
  closeAllModals();
  selectCaseAndSwitch(id);
};

// MODALES COMUNES
function setupModals() {
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  const subTrigger = document.getElementById('btnSubConfigTrigger');
  const subTriggerSide = document.getElementById('btnSidebarConectorIa');
  const subModal = document.getElementById('subModal');

  const openSub = () => {
    if (subModal) subModal.classList.add('open');
  };

  if (subTrigger) subTrigger.addEventListener('click', openSub);
  if (subTriggerSide) subTriggerSide.addEventListener('click', openSub);

  const btnSaveSub = document.getElementById('btnSaveSubModal');
  if (btnSaveSub) {
    btnSaveSub.addEventListener('click', () => {
      const radio = document.querySelector('input[name="subRadio"]:checked');
      if (radio) {
        TENANTS[STATE.tenant].provider = radio.value;
        renderHeader();
        closeAllModals();
        showToast(`Suscripción vinculada: ${radio.value} (Costo API $0)`);
      }
    });
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('open'));
}

// OPERACIONES JUDICIALES (CHACO / IURE / INDI)
function setupJudicialOperations() {
  // Buscador global en header de despacho
  const searchInput = document.getElementById('searchGlobalInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value.toLowerCase();
      renderMasterDispatchList();
      renderRecorridaTable();
    });
  }

  // Simular Despacho 07:00 hs
  const btnSync = document.getElementById('btnSyncGmailAction');
  if (btnSync) {
    btnSync.addEventListener('click', () => {
      const newCase = {
        id: `c-${Date.now()}`,
        expte: '2.410/26',
        iure: '2410/2026-1-C',
        caratula: 'MORALES DIEGO C/ TRANSPORTE DEL LITORAL S/ DAÑOS Y PERJUICIOS',
        juzgado: 'Juzgado Civil y Comercial N° 2',
        cliente: 'Diego Hernán Morales',
        fecha: 'Hoy (Recién recibido)',
        tag: 'Depósito Judicial',
        tagColor: 'badge-green',
        sampleId: 'pdf-deposito',
        inactiveDays: 0,
        motivo: 'NOTIF. ART. 155 CPCCCh',
        taskDesc: 'Depósito judicial de condena acreditado en la cuenta del juzgado.'
      };
      CASES.unshift(newCase);
      STATE.selectedCaseId = newCase.id;
      AUDIT_LOGS.unshift({
        time: 'Recién',
        user: 'Robot Despacho (Gmail)',
        role: 'SISTEMA',
        op: 'NUEVO_DESPACHO',
        detail: 'Detectó aviso en Gmail de Expte. 2.410/26 y descargó proveído automáticamente.'
      });
      renderAll();
      showToast('Nuevo despacho recibido: Expte. 2.410/26 (PDF analizado)');
    });
  }

  // Botón directo a Visor PDF
  const btnOpenPdf = document.getElementById('btnOpenPdfTabDirect');
  if (btnOpenPdf) {
    btnOpenPdf.addEventListener('click', () => {
      const pdfTab = document.querySelector('.nav-item[data-tab="pdf-viewer"]');
      if (pdfTab) pdfTab.click();
    });
  }

  // Selector de Tenant
  const tenantSel = document.getElementById('tenantSelect');
  if (tenantSel) {
    tenantSel.addEventListener('change', (e) => {
      STATE.tenant = e.target.value;
      renderAll();
      showToast(`Cambiado a: ${TENANTS[STATE.tenant].name}`);
    });
  }

  // Toggle Rol
  const btnRole = document.getElementById('btnToggleRoleQuick');
  if (btnRole) {
    btnRole.addEventListener('click', () => {
      STATE.role = STATE.role === 'ADMIN' ? 'GUEST' : 'ADMIN';
      renderHeader();
      showToast(STATE.role === 'ADMIN' ? 'Modo: Abogado Titular (Control total)' : 'Modo: Invitado / Secretario (Modelos protegidos)');
    });
  }

  // Filtro Art 155
  const btn155 = document.getElementById('btnFilterArt155Only');
  if (btn155) {
    btn155.addEventListener('click', () => {
      STATE.filterArt155Only = !STATE.filterArt155Only;
      btn155.classList.toggle('active', STATE.filterArt155Only);
      btn155.style.background = STATE.filterArt155Only ? '#111827' : '#ffffff';
      btn155.style.color = STATE.filterArt155Only ? '#ffffff' : 'var(--text-secondary)';
      renderRecorridaTable();
    });
  }

  // Acciones en PDF Viewer
  const btnCopy = document.getElementById('btnCopyDraftText');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const text = document.getElementById('pdfDraftEditorArea').value;
      navigator.clipboard.writeText(text);
      showToast('Borrador judicial copiado al portapapeles');
    });
  }

  const btnWord = document.getElementById('btnDownloadWordFile');
  if (btnWord) {
    btnWord.addEventListener('click', () => {
      const text = document.getElementById('pdfDraftEditorArea').value;
      downloadDoc(text, `Escrito_Judicial_${Date.now()}.doc`);
    });
  }

  const btnApprove = document.getElementById('btnApproveDraftAction');
  if (btnApprove) {
    btnApprove.addEventListener('click', () => {
      if (STATE.role === 'GUEST') {
        showToast('Revisión guardada y enviada a visado del Abogado Titular');
      } else {
        showToast('Escrito auditado y firmado digitalmente (Listo para presentar en INDI)');
      }
    });
  }

  // Subir PDF propio
  const btnUpload = document.getElementById('btnUploadCustomPdf');
  const inputUpload = document.getElementById('inputPdfUpload');
  if (btnUpload && inputUpload) {
    btnUpload.addEventListener('click', () => inputUpload.click());
    inputUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        document.getElementById('pdfDocumentSheet').innerHTML = `
          <div style="border-bottom:2px solid #0f172a; padding-bottom:8px; margin-bottom:16px; display:flex; justify-content:space-between;">
            <strong>DOCUMENTO PROPIO SUBIDO — ${file.name}</strong>
            <span>Tamaño: ${(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <p style="margin-bottom:12px;"><strong>PROCESAMIENTO CON SUSCRIPCIÓN PERSONAL:</strong> El archivo ha sido subido en el contenedor privado del estudio.</p>
          <p style="margin-bottom:12px;">Se procedió a anonimizar partes sensibles y generar el borrador procesal de respuesta.</p>
        `;
        showToast(`PDF analizado: ${file.name}`);
      }
    });
  }
}

// RENDER GLOBAL
function renderAll() {
  renderHeader();
  renderMasterDispatchList();
  renderDetailPane();
  renderRecorridaTable();
  renderPdfViewer();
  renderVencimientos();
  renderAuditoria();
}

function renderHeader() {
  const t = TENANTS[STATE.tenant];
  const avatarText = document.getElementById('userAvatarText');
  const nameLabel = document.getElementById('userNameLabel');
  const roleLabel = document.getElementById('userRoleLabel');
  const inboxCount = document.getElementById('badgeInboxCount');
  const totalCount = document.getElementById('badgeTotalCases');

  if (avatarText) avatarText.textContent = STATE.role === 'ADMIN' ? t.avatar : 'SC';
  if (nameLabel) nameLabel.textContent = STATE.role === 'ADMIN' ? 'estudiobrunskole' : 'Secretario del Estudio';
  if (roleLabel) roleLabel.textContent = STATE.role === 'ADMIN' ? 'Plan Free' : 'Invitado';

  if (inboxCount) inboxCount.textContent = CASES.length;
  if (totalCount) totalCount.textContent = CASES.length;
}

function getFilteredCases() {
  return CASES.filter((c) => {
    const q = STATE.searchQuery;
    const matchQ = !q || c.expte.toLowerCase().includes(q) || c.caratula.toLowerCase().includes(q) || c.cliente.toLowerCase().includes(q);
    const match155 = !STATE.filterArt155Only || c.motivo.includes('155');
    return matchQ && match155;
  });
}

function renderMasterDispatchList() {
  const container = document.getElementById('masterDispatchList');
  if (!container) return;
  const list = getFilteredCases();

  if (list.length === 0) {
    container.innerHTML = '<div style="padding:24px; text-align:center; color:var(--text-muted);">No hay expedientes con movimiento.</div>';
    return;
  }

  container.innerHTML = list.map((c) => `
    <div class="case-item-card ${c.id === STATE.selectedCaseId ? 'active' : ''}" onclick="selectCase('${c.id}')">
      <div class="case-card-header">
        <span class="case-card-expte">${c.expte}</span>
        <span class="case-card-time">${c.fecha}</span>
      </div>
      <div class="case-card-caratula">${c.caratula}</div>
      <div class="case-card-meta">
        <span class="badge ${c.tagColor}">${c.tag}</span>
        <span>${c.juzgado}</span>
      </div>
    </div>
  `).join('');
}

window.selectCase = function(id) {
  STATE.selectedCaseId = id;
  renderMasterDispatchList();
  renderDetailPane();
};

function renderDetailPane() {
  const pane = document.getElementById('detailCasePane');
  if (!pane) return;

  const item = CASES.find((c) => c.id === STATE.selectedCaseId) || CASES[0];
  if (!item) {
    pane.innerHTML = '<div style="padding:24px; color:var(--text-muted);">Seleccione un expediente de la lista.</div>';
    return;
  }

  const sample = PDF_SAMPLES.find((s) => s.id === item.sampleId) || PDF_SAMPLES[0];
  const t = TENANTS[STATE.tenant];

  pane.innerHTML = `
    <div class="detail-card">
      <div class="detail-header-row">
        <div>
          <div class="detail-court-tag">${item.juzgado} · IURE ${item.iure}</div>
          <div class="detail-title">${item.caratula}</div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Cliente: ${item.cliente} · Notificación detectada hoy</div>
        </div>
        <span class="badge ${item.tagColor}">${item.tag}</span>
      </div>

      <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:8px;">
        Proveído Judicial Sincronizado (PDF Oficial Chaco)
      </div>
      <div class="court-decree-box">
        ${sample.docText}
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
        <div>
          <div style="font-size:13px; font-weight:600; color:var(--text-main);">Proyecto de Escrito Judicial Sugerido</div>
          <div style="font-size:11.5px; color:var(--text-muted);">Generado con tu suscripción: ${t.provider} ($0 costo de API)</div>
        </div>
        <div style="display:flex; gap:6px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="copyDetailDraft()">Copiar texto</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="downloadDetailDraft('${item.expte}')">Descargar Word (.doc)</button>
        </div>
      </div>

      <div class="draft-editor-box">
        <textarea id="detailDraftArea" class="draft-textarea">${sample.draft}</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
        <button type="button" class="btn btn-secondary" onclick="document.querySelector('.nav-item[data-tab=\\'pdf-viewer\\']').click()">Abrir en Visor de PDFs Dividido</button>
        <button type="button" class="btn btn-primary" onclick="approveDetailDraft()">${STATE.role === 'ADMIN' ? '⚖️ Auditar y Firmar Escrito' : '📝 Guardar para Visado de Titular'}</button>
      </div>
    </div>
  `;
}

window.copyDetailDraft = function() {
  const t = document.getElementById('detailDraftArea').value;
  navigator.clipboard.writeText(t);
  showToast('Escrito copiado al portapapeles');
};

window.downloadDetailDraft = function(expte) {
  const t = document.getElementById('detailDraftArea').value;
  downloadDoc(t, `Escrito_Expte_${expte.replace('/', '_')}.doc`);
};

window.approveDetailDraft = function() {
  if (STATE.role === 'GUEST') {
    showToast('Revisión guardada y remitida al Abogado Titular');
  } else {
    showToast('Escrito auditado y aprobado (Listo para presentar en INDI)');
  }
};

function renderRecorridaTable() {
  const tbody = document.getElementById('recorridaFullTableBody');
  if (!tbody) return;
  const list = getFilteredCases();

  tbody.innerHTML = list.map((c) => `
    <tr>
      <td>
        <strong style="color:var(--text-main); font-family:var(--font-mono);">${c.expte}</strong>
        <div style="font-size:11px; color:var(--text-muted);">IURE: ${c.iure}</div>
      </td>
      <td>
        <div style="font-weight:600; color:var(--text-main);">${c.caratula}</div>
        <div style="font-size:11.5px; color:var(--text-muted);">Cliente: ${c.cliente}</div>
      </td>
      <td>${c.juzgado}</td>
      <td><span class="badge ${c.tagColor}">${c.motivo}</span></td>
      <td>${c.fecha}</td>
      <td><span class="badge badge-green">Libre</span></td>
      <td>
        <button type="button" class="btn btn-secondary btn-sm" onclick="selectCaseAndSwitch('${c.id}')">Ver Detalle</button>
      </td>
    </tr>
  `).join('');
}

window.selectCaseAndSwitch = function(id) {
  STATE.selectedCaseId = id;
  const tabDespacho = document.querySelector('.nav-item[data-tab="despacho"]');
  if (tabDespacho) tabDespacho.click();
  renderMasterDispatchList();
  renderDetailPane();
};

function renderPdfViewer() {
  const pills = document.getElementById('samplePillsRow');
  if (!pills) return;

  pills.innerHTML = PDF_SAMPLES.map((s) => `
    <button type="button" class="sample-pill-btn ${s.id === STATE.selectedPdfSampleId ? 'active' : ''}" onclick="selectPdfSample('${s.id}')">
      ${s.title}
    </button>
  `).join('');

  const current = PDF_SAMPLES.find((s) => s.id === STATE.selectedPdfSampleId) || PDF_SAMPLES[0];
  document.getElementById('pdfDocumentSheet').innerHTML = current.docText;
  document.getElementById('pdfDraftEditorArea').value = current.draft;
  document.getElementById('pdfSourceTag').textContent = `${TENANTS[STATE.tenant].provider} ($0 API)`;

  document.getElementById('pdfExtractedGrid').innerHTML = `
    <div style="background:#f8fafc; border:1px solid var(--border); padding:8px 10px; border-radius:4px;">
      <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Expediente</span>
      <div style="font-size:12px; font-weight:600;">${current.expte}</div>
    </div>
    <div style="background:#f8fafc; border:1px solid var(--border); padding:8px 10px; border-radius:4px;">
      <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Juzgado</span>
      <div style="font-size:12px; font-weight:600;">${current.juzgado}</div>
    </div>
    <div style="background:#f8fafc; border:1px solid var(--border); padding:8px 10px; border-radius:4px;">
      <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Plazo Detectado</span>
      <div style="font-size:12px; font-weight:600; color:#b45309;">${current.plazo}</div>
    </div>
    <div style="background:#f8fafc; border:1px solid var(--border); padding:8px 10px; border-radius:4px;">
      <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Monto / Boleta</span>
      <div style="font-size:12px; font-weight:600; color:#047857;">${current.monto}</div>
    </div>
  `;
}

window.selectPdfSample = function(id) {
  STATE.selectedPdfSampleId = id;
  renderPdfViewer();
};

function renderVencimientos() {
  const container = document.getElementById('caducidadListContainer');
  if (!container) return;

  container.innerHTML = CASES.map((c) => {
    const pct = Math.min(100, Math.round((c.inactiveDays / 90) * 100));
    const isDanger = c.inactiveDays >= 60;
    return `
      <div style="padding:12px 0; border-bottom:1px solid var(--border);">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <strong style="color:var(--text-main);">Expte. ${c.expte} — ${c.caratula}</strong>
          <span class="badge ${isDanger ? 'badge-red' : 'badge-green'}">${c.inactiveDays} / 90 días</span>
        </div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-bottom:6px;">${c.juzgado} · Inactividad procesal acumulada</div>
        <div style="width:100%; height:6px; background:#f1f5f9; border-radius:999px; overflow:hidden;">
          <div style="width:${pct}%; height:100%; background:${isDanger ? '#ef4444' : '#10b981'};"></div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('prescripcionListContainer').innerHTML = `
    <div style="padding:12px 0; border-bottom:1px solid var(--border);">
      <div style="display:flex; justify-content:space-between;">
        <strong>Reclamo Extrajudicial: Daños y Perjuicios por Accidente</strong>
        <span class="badge badge-amber">3 Años (Art. 2561 CCCN)</span>
      </div>
      <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Cliente: Héctor Martínez · <span style="color:#b91c1c; font-weight:600;">Restan 38 días para iniciar demanda</span></div>
    </div>
    <div style="padding:12px 0;">
      <div style="display:flex; justify-content:space-between;">
        <strong>Diferencias Salariales e Indemnización Laboral</strong>
        <span class="badge badge-amber">2 Años (Art. 256 LCT)</span>
      </div>
      <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Cliente: Valeria Acosta · Restan 64 días corridos</div>
    </div>
  `;
}

function renderAuditoria() {
  const container = document.getElementById('modelsVaultContainer');
  if (!container) return;

  if (STATE.role === 'GUEST') {
    container.innerHTML = `
      <div style="background:var(--danger-bg); border:1px solid var(--danger-border); padding:14px; border-radius:var(--radius-sm); color:var(--danger);">
        <strong>Acceso Restringido:</strong> Tu rol de Invitado / Secretario no tiene permisos para descargar ni exportar la biblioteca de modelos del titular.
      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div style="padding:10px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
          <strong>1. Acepta Depósito Judicial y CBU</strong>
          <div style="font-size:11.5px; color:var(--text-muted);">Plantilla automática determinística ($0 IA)</div>
        </div>
        <div style="padding:10px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
          <strong>2. Contestación de Traslado de Pericia</strong>
          <div style="font-size:11.5px; color:var(--text-muted);">Base para redacción de impugnaciones con IA</div>
        </div>
        <div style="padding:10px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
          <strong>3. Solicitud de Cédula con Días Inhábiles</strong>
          <div style="font-size:11.5px; color:var(--text-muted);">Disparo ante cédula con informe negativo</div>
        </div>
        <div style="padding:10px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
          <strong>4. Impulso Procesal contra Caducidad</strong>
          <div style="font-size:11.5px; color:var(--text-muted);">Art. 310 CPCCCh (Límite 3 meses)</div>
        </div>
      </div>
    `;
  }

  const auditMain = document.getElementById('auditTableBodyMain');
  if (auditMain) {
    auditMain.innerHTML = AUDIT_LOGS.map((log) => `
      <tr>
        <td style="font-family:var(--font-mono); font-size:11.5px;">${log.time}</td>
        <td style="font-weight:600; color:var(--text-main);">${log.user}</td>
        <td><span class="badge badge-neutral">${log.role}</span></td>
        <td><span style="font-family:var(--font-mono); font-size:11px; font-weight:700;">${log.op}</span></td>
        <td>${log.detail}</td>
      </tr>
    `).join('');
  }
}

function downloadDoc(text, filename) {
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
  showToast(`Descargado: ${filename}`);
}

function showToast(msg) {
  const box = document.getElementById('toastNotice');
  if (!box) return;
  box.textContent = msg;
  box.classList.add('show');
  clearTimeout(box._timer);
  box._timer = setTimeout(() => box.classList.remove('show'), 3000);
}
