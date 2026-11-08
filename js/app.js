/* ==========================================================================
   LEXCHACO — Lógica de Aplicación & Copiloto Judicial
   ========================================================================== */

const TENANTS = {
  estudio_principal: {
    name: 'Estudio Jurídico Dr. Gómez',
    titular: 'Dr. Marcelo Gómez',
    roleLabel: 'Abogado Titular',
    avatar: 'MG',
    provider: 'Claude Pro'
  },
  estudio_asociados: {
    name: 'Estudio Asociados Resistencia',
    titular: 'Dra. Silvana Ramírez',
    roleLabel: 'Socia Administradora',
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

Dr. Marcelo Gómez, en representación de la actora en autos "PEREZ JUAN C/ SEGUROS DEL NORTE S/ DAÑOS Y PERJUICIOS" (Expte. 14.820/25), ante V.S. digo:

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

Dr. Marcelo Gómez, apoderado de la actora en autos "GOMEZ MARIA C/ CONSTRUCTORA LITORAL S.R.L. S/ DESPIDO" (Expte. 8.310/24), a V.S. digo:

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

Dr. Marcelo Gómez, por la parte actora en autos "FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS" (Expte. 1.505/25), a V.S. digo:

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
        <strong>ALERTA DE INACTIVIDAD PROCESAL — LEXCHACO WATCHDOG</strong>
        <span>Expte. N° 3.105/23</span>
      </div>
      <p style="margin-bottom:12px;"><strong>ESTADO DE AUTOS:</strong> Han transcurrido <span style="background:#fee2e2; color:#991b1b; font-weight:600; padding:1px 4px; border-radius:3px;">78 días corridos</span> sin que la contraparte ni el juzgado impulsen el expediente.</p>
      <p style="margin-bottom:12px;">A fin de evitar la caducidad de instancia de TRES (3) MESES (Art. 310 inc. 2 CPCCCh), se generó el escrito de pase a resolver para interrumpir el plazo inmediatamente.</p>
      <p style="font-size:11px; color:#64748b; margin-top:20px; border-top:1px solid #e2e8f0; padding-top:8px;">Monitoreo preventivo del estudio.</p>
    `,
    draft: `ACTIVA TRÁMITE - SOLICITA PASEN AUTOS A DESPACHO PARA RESOLVER

Señor Juez Civil y Comercial N° 1:

Dr. Marcelo Gómez, en autos "CREDITOS DEL NORTE C/ RODRIGUEZ LUIS S/ EJECUTIVO" (Expte. 3.105/23), a V.S. digo:

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
    iure: '1505/2025-2-F',
    caratula: 'FERNANDEZ LAURA C/ GOMEZ ROBERTO S/ ALIMENTOS',
    juzgado: 'Juzgado de Familia N° 2',
    cliente: 'Laura Fernández',
    fecha: 'Hoy 08:10',
    tag: 'Cédula Negativa',
    tagColor: 'badge-blue',
    sampleId: 'pdf-cedula',
    inactiveDays: 11,
    motivo: 'CÉDULA DILIGENCIADA',
    taskDesc: 'Oficial no encontró moradores. Escrito de reiteración con días y horas inhábiles preparado.'
  },
  {
    id: 'c-4',
    expte: '3.105/23',
    iure: '3105/2023-1-C',
    caratula: 'CREDITOS DEL NORTE C/ RODRIGUEZ LUIS S/ EJECUTIVO',
    juzgado: 'Juzgado Civil y Comercial N° 1',
    cliente: 'Luis Alberto Rodríguez',
    fecha: 'Hace 78 días',
    tag: 'Alerta Caducidad',
    tagColor: 'badge-red',
    sampleId: 'pdf-caducidad',
    inactiveDays: 78,
    motivo: 'INACTIVIDAD 78 DÍAS',
    taskDesc: 'Faltan 12 días para los 3 meses de caducidad (Art. 310 CPCCCh). Escrito impulsor listo.'
  }
];

const AUDIT_LOGS = [
  { time: 'Hoy 07:16', user: 'Robot Despacho (Gmail/IURE)', role: 'SISTEMA', op: 'DESCARGA_PDF', detail: 'Descargó proveído de Expte. 14.820/25 y detectó depósito de $1.850.000.' },
  { time: 'Hoy 07:43', user: 'Claude Pro (Contenedor Estudio)', role: 'IA_SUB', op: 'ANALISIS_TRASLADO', detail: 'Leyó pericia en Expte. 8.310/24 y redactó escrito para impugnar tasa de interés.' },
  { time: 'Hoy 08:11', user: 'Watchdog Caducidad', role: 'SISTEMA', op: 'ALERTA_90_DIAS', detail: 'Expte. 3.105/23 superó los 75 días sin trámite. Escrito impulsor preparado.' }
];

const STATE = {
  tenant: 'estudio_principal',
  role: 'ADMIN', // 'ADMIN' | 'GUEST'
  selectedCaseId: 'c-1',
  selectedPdfSampleId: 'pdf-deposito',
  searchQuery: '',
  activeTab: 'despacho'
};

document.addEventListener('DOMContentLoaded', () => {
  setupUI();
  renderAll();
});

function setupUI() {
  // Pestañas
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-view').forEach((v) => v.classList.remove('active'));
      const targetView = document.getElementById(`view-${tab}`);
      if (targetView) targetView.classList.add('active');
      STATE.activeTab = tab;

      const titles = {
        'despacho': 'Bandeja de Despacho Diario',
        'recorrida': 'Mis Expedientes en Recorrida (IURE / Lex Chaco)',
        'pdf-viewer': 'Visor & Analizador de PDFs Judiciales',
        'vencimientos': 'Control de Vencimientos & Caducidad de Instancia',
        'auditoria': 'Auditoría & Biblioteca de Modelos'
      };
      document.getElementById('pageTitle').textContent = titles[tab] || 'LexChaco';
    });
  });

  document.getElementById('btnOpenPdfTabDirect').addEventListener('click', () => {
    document.querySelector('.nav-item[data-tab="pdf-viewer"]').click();
  });

  // Selector de Tenant
  document.getElementById('tenantSelect').addEventListener('change', (e) => {
    STATE.tenant = e.target.value;
    renderAll();
    showToast(`Cambiado a: ${TENANTS[STATE.tenant].name}`);
  });

  // Switch de Rol
  document.getElementById('btnToggleRoleQuick').addEventListener('click', () => {
    STATE.role = STATE.role === 'ADMIN' ? 'GUEST' : 'ADMIN';
    renderHeader();
    showToast(STATE.role === 'ADMIN' ? 'Modo: Abogado Titular (Control total)' : 'Modo: Invitado / Secretario (Modelos protegidos)');
  });

  // Buscador
  document.getElementById('searchGlobalInput').addEventListener('input', (e) => {
    STATE.searchQuery = e.target.value.toLowerCase();
    renderMasterDispatchList();
    renderRecorridaTable();
  });

  // Simular Despacho
  document.getElementById('btnSyncGmailAction').addEventListener('click', () => {
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
    showToast('Nuevo despacho recibido: Expte. 2.410/26 (PDF descargado y analizado)');
  });

  // Modales
  document.getElementById('btnSubConfigTrigger').addEventListener('click', () => {
    document.getElementById('subModal').classList.add('open');
  });

  document.querySelectorAll('[data-close-modal]').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('open'));
    });
  });

  document.getElementById('btnSaveSubModal').addEventListener('click', () => {
    const radio = document.querySelector('input[name="subRadio"]:checked');
    if (radio) {
      TENANTS[STATE.tenant].provider = radio.value;
      renderHeader();
      document.getElementById('subModal').classList.remove('open');
      showToast(`Suscripción vinculada: ${radio.value} (Costo API $0)`);
    }
  });

  // Acciones en PDF Viewer
  document.getElementById('btnCopyDraftText').addEventListener('click', () => {
    const text = document.getElementById('pdfDraftEditorArea').value;
    navigator.clipboard.writeText(text);
    showToast('Borrador judicial copiado al portapapeles');
  });

  document.getElementById('btnDownloadWordFile').addEventListener('click', () => {
    const text = document.getElementById('pdfDraftEditorArea').value;
    downloadDoc(text, `Escrito_Judicial_${Date.now()}.doc`);
  });

  document.getElementById('btnApproveDraftAction').addEventListener('click', () => {
    if (STATE.role === 'GUEST') {
      showToast('Revisión guardada y enviada a visado del Abogado Titular');
    } else {
      showToast('Escrito auditado y firmado digitalmente (Listo para presentar en INDI)');
    }
  });

  // Subir PDF propio
  document.getElementById('btnUploadCustomPdf').addEventListener('click', () => {
    document.getElementById('inputPdfUpload').click();
  });

  document.getElementById('inputPdfUpload').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (f) {
      showToast(`Archivo "${f.name}" cargado localmente. Analizando con ${TENANTS[STATE.tenant].provider}...`);
      document.getElementById('pdfDocumentSheet').innerHTML = `
        <div style="border-bottom:2px solid #0f172a; padding-bottom:8px; margin-bottom:16px;">
          <strong>DOCUMENTO PDF SUBIDO LOCALMENTE</strong>
          <p style="font-size:12px; color:#64748b;">${f.name} (${(f.size / 1024).toFixed(1)} KB)</p>
        </div>
        <p>El archivo fue procesado en tu navegador local con privacidad total.</p>
        <p>Tu suscripción conectada identificó los plazos judiciales y la carátula procesal.</p>
      `;
    }
  });
}

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
  document.getElementById('subSidebarName').textContent = t.provider;
  document.getElementById('userAvatarText').textContent = STATE.role === 'ADMIN' ? t.avatar : 'SC';
  document.getElementById('userNameLabel').textContent = STATE.role === 'ADMIN' ? t.titular : 'Secretario del Estudio';
  document.getElementById('userRoleLabel').textContent = STATE.role === 'ADMIN' ? t.roleLabel : 'Invitado / Operador';
  document.getElementById('badgeInboxCount').textContent = CASES.length;
  document.getElementById('badgeTotalCases').textContent = CASES.length;
}

function getFilteredCases() {
  return CASES.filter((c) => {
    if (!STATE.searchQuery) return true;
    const all = `${c.expte} ${c.iure} ${c.caratula} ${c.cliente} ${c.juzgado}`.toLowerCase();
    return all.includes(STATE.searchQuery);
  });
}

function renderMasterDispatchList() {
  const container = document.getElementById('masterDispatchList');
  const list = getFilteredCases();

  container.innerHTML = list.map((c) => `
    <div class="case-item-card ${c.id === STATE.selectedCaseId ? 'selected' : ''}" onclick="selectCase('${c.id}')">
      <div class="case-item-top">
        <span class="expte-badge-num">Expte. ${c.expte}</span>
        <span class="badge ${c.tagColor}">${c.tag}</span>
      </div>
      <div class="case-item-caratula">${c.caratula}</div>
      <div class="case-task-preview">${c.taskDesc}</div>
      <div class="case-item-meta">
        <span>${c.juzgado}</span>
        <span>${c.fecha}</span>
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
  const item = CASES.find((c) => c.id === STATE.selectedCaseId) || CASES[0];
  const sample = PDF_SAMPLES.find((s) => s.id === item.sampleId) || PDF_SAMPLES[0];
  const t = TENANTS[STATE.tenant];

  pane.innerHTML = `
    <div class="detail-card">
      <div class="detail-header-top">
        <div>
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:4px;">
            <span class="badge badge-neutral">Expte. ${item.expte}</span>
            <span class="badge badge-blue">IURE: ${item.iure}</span>
            <span class="badge ${item.tagColor}">${item.tag}</span>
          </div>
          <h2 class="detail-main-title">${item.caratula}</h2>
          <div class="detail-sub-meta">${item.juzgado} · Cliente: <strong>${item.cliente}</strong> · Notificación: ${item.motivo}</div>
        </div>

        <div style="display:flex; gap:8px;">
          <a href="pdfs/${item.sampleId === 'pdf-deposito' ? 'proveido_14820_25_deposito.pdf' : (item.sampleId === 'pdf-pericia' ? 'proveido_8310_24_traslado_pericia.pdf' : 'proveido_3105_23_intimacion_caducidad.pdf')}" download class="btn btn-secondary btn-sm">Descargar PDF Judicial</a>
        </div>
      </div>

      <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em; margin-bottom:4px;">Proveído Salido a Despacho Hoy (Descargado automáticamente)</div>
      <div class="proveido-display-box">
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
  document.querySelector('.nav-item[data-tab="despacho"]').click();
  renderMasterDispatchList();
  renderDetailPane();
};

function renderPdfViewer() {
  const pills = document.getElementById('samplePillsRow');
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

  document.getElementById('auditTableBodyMain').innerHTML = AUDIT_LOGS.map((log) => `
    <tr>
      <td style="font-family:var(--font-mono); font-size:11.5px;">${log.time}</td>
      <td style="font-weight:600; color:var(--text-main);">${log.user}</td>
      <td><span class="badge badge-neutral">${log.role}</span></td>
      <td><span style="font-family:var(--font-mono); font-size:11px; font-weight:700;">${log.op}</span></td>
      <td>${log.detail}</td>
    </tr>
  `).join('');
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
  box.textContent = msg;
  box.classList.add('show');
  clearTimeout(box._timer);
  box._timer = setTimeout(() => box.classList.remove('show'), 3000);
}
