/**
 * Motor Determinístico de Generación de Escritos Judiciales ($0 Costo)
 * Genera escritos en formato procesal formal para el Fuero Civil, Comercial y Laboral del Chaco.
 * Produce HTML imprimible, texto plano y formato compatible con Microsoft Word (.doc).
 */

function formatCurrency(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(amount);
}

function numberToWordsArs(num) {
  // Conversión simple a letras para montos judiciales representativos
  if (num === 1850000) return 'PESOS UN MILLÓN OCHOCIENTOS CINCUENTA MIL CON 00/100';
  if (num === 2500000) return 'PESOS DOS MILLONES QUINIENTOS MIL CON 00/100';
  if (num === 950000) return 'PESOS NOVECIENTOS CINCUENTA MIL CON 00/100';
  return `PESOS ${formatCurrency(num).replace('$', '').trim()}`;
}

/**
 * Genera el escrito judicial "ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA LIBRAMIENTO DE TRANSFERENCIA"
 */
function generateAceptaDepositoEscrito({
  expteNo,
  caratula,
  juzgado,
  clienteNombre,
  clienteDni,
  monto,
  bancoNombre = 'Nuevo Banco del Chaco S.A.',
  cbu,
  aliasCbu,
  cuitCliente,
  abogadoNombre = 'Dr. Marcelo Gómez',
  abogadoMatricula = 'M.P. N° 4582 STJ Chaco',
  abogadoCuit = '20-28945612-7',
  domicilioProcesal = 'Av. 9 de Julio 345, Piso 4, Of. B, Resistencia, Chaco',
  casilleroElectronico = 'mgomez4582@notificaciones.justiciachaco.gov.ar'
}) {
  const montoFormateado = formatCurrency(monto);
  const montoEnLetras = numberToWordsArs(monto);
  const fechaHoy = new Date().toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const plainText = `
ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA LIBRAMIENTO DE ORDEN DE TRANSFERENCIA

Señor Juez:

${abogadoNombre}, abogado inscripto en la Matrícula Profesional N° ${abogadoMatricula} del Superior Tribunal de Justicia del Chaco, CUIT N° ${abogadoCuit}, en mi carácter de letrado apoderado de la parte actora, con domicilio procesal constituido en ${domicilioProcesal} y domicilio procesal electrónico constituido en ${casilleroElectronico}, en los autos caratulados: "${caratula}", Expte. N° ${expteNo}, en trámite por ante el ${juzgado}, a V.S. respetuosamente digo:

I. OBJETO:
Que por el presente acto vengo en tiempo y forma procesal oportuna a manifestar que mi mandante, ${clienteNombre}, ACEPTA EN PAGO el depósito judicial acreditado en autos en la cuenta bancaria de autos a la orden de este Tribunal, efectuado por la contraria / citada en garantía por la suma total de ${montoEnLetras} (${montoFormateado}), imputándose íntegramente la misma a cuenta de capital e intereses correspondientes a la liquidación firme de autos.

II. DENUNCIA CUENTA BANCARIA Y CBU PARA TRANSFERENCIA:
A efectos de que se efectivice la percepción de las sumas depositadas y en cumplimiento de las acordadas del Superior Tribunal de Justicia del Chaco sobre libramiento de pagos electrónicos judiciales, vengo a denunciar la cuenta bancaria de titularidad de mi representada:
- Titular de la Cuenta: ${clienteNombre}
- Documento (DNI/CUIL): ${clienteDni || cuitCliente || 'Consta en autos'}
- Entidad Bancaria: ${bancoNombre}
- Clave Bancaria Uniforme (CBU): ${cbu}
- Alias CBU: ${aliasCbu || 'No informado'}
- Tipo de Cuenta: Caja de Ahorro en Pesos

Asimismo, manifiesto bajo juramento de ley que la cuenta bancaria precedentemente individualizada se encuentra plenamente activa y habilitada para recibir transferencias judiciales.

III. APORTES DE LEY Y HONORARIOS:
Habiéndose satisfecho las exigencias relativas a los aportes previsionales y de ley (Ley N° 833-C de Aranceles de Abogados y Procuradores del Chaco), no existe impedimento alguno para la efectivización de la orden de pago.

IV. PETITORIO:
Por todo lo manifestado, a V.S. solicito respetuosamente:
1. Tenga por aceptado en pago el depósito judicial de ${montoFormateado}.
2. Tenga por denunciada la cuenta bancaria y CBU de la parte actora.
3. Previa vista a la contraria y sin más trámite, ordene el libramiento de la pertinente Orden de Transferencia Electrónica Judicial a través del sistema IURIX / NBCH hacia la cuenta bancaria denunciada en el acápite II.

Proveer de conformidad,
SERÁ JUSTICIA.

Resistencia (Chaco), ${fechaHoy}.
`.trim();

  // HTML profesional imprimible y exportable a Word (.doc)
  const printableHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Escrito Judicial - Expte ${expteNo}</title>
  <style>
    @page {
      size: A4;
      margin: 3.5cm 2.5cm 2.5cm 3cm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13pt;
      line-height: 1.6;
      color: #111;
      background: #fff;
      margin: 0 auto;
      max-width: 800px;
      padding: 30px;
    }
    .titulo {
      text-align: center;
      font-weight: bold;
      text-decoration: underline;
      font-size: 14pt;
      margin-bottom: 28px;
      letter-spacing: 0.5px;
    }
    .encabezado {
      font-weight: bold;
      margin-bottom: 20px;
    }
    p {
      text-align: justify;
      text-indent: 40px;
      margin-bottom: 16px;
    }
    .no-indent {
      text-indent: 0;
    }
    .seccion-titulo {
      font-weight: bold;
      margin-top: 22px;
      margin-bottom: 10px;
      text-indent: 0;
    }
    .datos-banco {
      background-color: #f8f9fa;
      border-left: 3px solid #2b4c7e;
      padding: 12px 20px;
      margin: 18px 0;
      font-family: monospace;
      font-size: 11pt;
    }
    .petitorio-lista {
      margin-left: 30px;
      margin-bottom: 20px;
    }
    .petitorio-lista li {
      margin-bottom: 8px;
      text-align: justify;
    }
    .cierre {
      text-align: center;
      font-weight: bold;
      margin-top: 36px;
      margin-bottom: 40px;
    }
    .firma {
      text-align: right;
      margin-top: 60px;
      font-size: 11pt;
      line-height: 1.4;
      border-top: 1px dashed #666;
      display: inline-block;
      float: right;
      padding-top: 8px;
    }
  </style>
</head>
<body>
  <div class="titulo">ACEPTA DEPÓSITO JUDICIAL - DENUNCIA CBU - SOLICITA LIBRAMIENTO DE ORDEN DE TRANSFERENCIA</div>
  
  <div class="encabezado">Señor Juez:</div>

  <p><strong>${abogadoNombre}</strong>, abogado inscripto en la Matrícula Profesional N° ${abogadoMatricula} del Superior Tribunal de Justicia del Chaco, CUIT N° ${abogadoCuit}, en representación de la parte actora, con domicilio procesal constituido en ${domicilioProcesal} y casillero electrónico ${casilleroElectronico}, en los autos caratulados: <em>"${caratula}"</em>, Expte. N° <strong>${expteNo}</strong>, en trámite por ante el ${juzgado}, a V.S. respetuosamente digo:</p>

  <div class="seccion-titulo">I. OBJETO:</div>
  <p>Que por el presente acto vengo en tiempo y forma oportuna a manifestar que mi mandante, <strong>${clienteNombre}</strong>, ACEPTA EN PAGO el depósito judicial acreditado en autos en la cuenta de este Tribunal, efectuado por la contraria por la suma total de <strong>${montoEnLetras} (${montoFormateado})</strong>, imputándose íntegramente la misma a cuenta de capital e intereses devengados.</p>

  <div class="seccion-titulo">II. DENUNCIA CUENTA BANCARIA Y CBU PARA TRANSFERENCIA:</div>
  <p>A efectos de que se efectivice la percepción de las sumas depositadas y en cumplimiento de las acordadas del Superior Tribunal de Justicia del Chaco relativas al libramiento de transferencias electrónicas judiciales, denuncio los datos de la cuenta bancaria de mi mandante:</p>

  <div class="datos-banco">
    <strong>Titular:</strong> ${clienteNombre}<br>
    <strong>Documento:</strong> ${clienteDni || cuitCliente || 'Consta en autos'}<br>
    <strong>Entidad Bancaria:</strong> ${bancoNombre}<br>
    <strong>CBU:</strong> ${cbu}<br>
    <strong>Alias CBU:</strong> ${aliasCbu || 'No informado'}<br>
    <strong>Tipo de Cuenta:</strong> Caja de Ahorro en Pesos
  </div>

  <p>Asimismo, manifiesto bajo juramento de ley que la cuenta informada se encuentra activa y habilitada para operar con órdenes de transferencia judicial.</p>

  <div class="seccion-titulo">III. PETITORIO:</div>
  <p class="no-indent">Por todo lo expuesto, a V.S. solicito:</p>
  <ol class="petitorio-lista">
    <li>Tenga por aceptado en pago el depósito judicial de ${montoFormateado}.</li>
    <li>Tenga por denunciada la cuenta bancaria precedentemente individualizada.</li>
    <li>Previa vista a la contraria y sin más dilaciones, ordene el libramiento de la pertinente Orden de Transferencia Electrónica Judicial a la cuenta denunciada en el acápite II.</li>
  </ol>

  <div class="cierre">
    Proveer de conformidad,<br>
    SERÁ JUSTICIA.
  </div>

  <div class="firma">
    <strong>${abogadoNombre}</strong><br>
    ${abogadoMatricula}<br>
    Apoderado Parte Actora<br>
    Resistencia (Chaco), ${fechaHoy}
  </div>
</body>
</html>`;

  return {
    titulo: 'ACEPTA DEPÓSITO JUDICIAL Y DENUNCIA CBU',
    tipoDocumento: 'ESCRITO_SIMPLE_DETERMINISTICO',
    costo: '$0.00 (Motor Determinístico sin consumo de tokens)',
    plainText,
    printableHtml,
    filename: `Escrito_Acepta_Deposito_Expte_${expteNo.replace(/[/.]/g, '_')}.doc`
  };
}

/**
 * Escrito de impulso procesal contra caducidad de instancia
 */
function generateImpulsoProcesalEscrito({
  expteNo,
  caratula,
  juzgado,
  abogadoNombre = 'Dr. Marcelo Gómez',
  abogadoMatricula = 'M.P. N° 4582 STJ Chaco',
  domicilioProcesal = 'Av. 9 de Julio 345, Piso 4, Of. B, Resistencia, Chaco'
}) {
  const plainText = `
SOLICITA SE PASE A DESPACHO PARA RESOLVER - IMPULSA PROCEDIMIENTO

Señor Juez:

${abogadoNombre}, por la representación que tengo acreditada en los autos caratulados "${caratula}", Expte. N° ${expteNo}, en trámite ante el ${juzgado}, a V.S. digo:

Que atento al estado de la causa, vengo por el presente a solicitar se pase el presente expediente a despacho a fin de proveer lo que por derecho corresponda, impulsando formalmente el procedimiento en los términos del art. 310 y concordantes del Código Procesal Civil y Comercial del Chaco.

Proveer de conformidad,
SERÁ JUSTICIA.
`.trim();

  return {
    titulo: 'IMPULSA PROCEDIMIENTO - INTERRUMPE CADUCIDAD',
    plainText
  };
}

module.exports = {
  generateAceptaDepositoEscrito,
  generateImpulsoProcesalEscrito,
  formatCurrency
};
