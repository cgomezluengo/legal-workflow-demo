/**
 * Motor de Plazos Procesales y Vigilancia de Caducidad/Prescripción
 * Adaptado a la normativa procesal del Chaco (CPCC Chaco Ley 2559-M y Código Civil y Comercial)
 */

// Feriados y asuetos judiciales recurrentes en Chaco (mes-día)
const FERIADOS_FIJOS = new Set([
  '01-01', // Año Nuevo
  '03-24', // Memoria, Verdad y Justicia
  '04-02', // Veteranos de Malvinas
  '05-01', // Día del Trabajador
  '05-25', // Revolución de Mayo
  '06-20', // Paso a la Inmortalidad del Gral. Belgrano
  '07-09', // Día de la Independencia
  '08-17', // Paso a la Inmortalidad del Gral. San Martín
  '08-29', // Día del Abogado (Feriado Judicial Chaco)
  '10-12', // Diversidad Cultural
  '11-16', // Día del Empleado Judicial (Feriado Judicial)
  '11-20', // Día de la Soberanía Nacional
  '12-08', // Inmaculada Concepción
  '12-25', // Navidad
]);

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6; // 0=Domingo, 6=Sábado
}

function isJudicialHoliday(date) {
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return FERIADOS_FIJOS.has(monthDay);
}

function isBusinessDay(date) {
  return !isWeekend(date) && !isJudicialHoliday(date);
}

/**
 * Calcula la fecha de vencimiento sumando N días hábiles judiciales.
 * En la práctica procesal argentina (Chaco), el plazo comienza a computarse
 * a partir del día hábil siguiente a la notificación (o ministerio legis).
 */
function calculateBusinessDaysDeadline(startDateStr, businessDays) {
  const start = new Date(startDateStr);
  let current = new Date(start);
  
  // El cómputo inicia el primer día hábil siguiente
  let addedDays = 0;
  while (addedDays < businessDays) {
    current.setDate(current.getDate() + 1);
    if (isBusinessDay(current)) {
      addedDays++;
    }
  }

  // Plazo de gracia procesal: primeras 2 horas del día hábil posterior (art. 124 CPCC)
  const gracePeriodDate = new Date(current);
  let foundGrace = false;
  while (!foundGrace) {
    gracePeriodDate.setDate(gracePeriodDate.getDate() + 1);
    if (isBusinessDay(gracePeriodDate)) {
      foundGrace = true;
    }
  }

  // Calcular días hábiles restantes respecto a hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(current);
  target.setHours(0, 0, 0, 0);

  let remainingBusinessDays = 0;
  let temp = new Date(today);
  if (temp <= target) {
    while (temp < target) {
      temp.setDate(temp.getDate() + 1);
      if (isBusinessDay(temp)) {
        remainingBusinessDays++;
      }
    }
  } else {
    // Ya vencido
    while (temp > target) {
      if (isBusinessDay(temp)) {
        remainingBusinessDays--;
      }
      temp.setDate(temp.getDate() - 1);
    }
  }

  return {
    startDate: startDateStr,
    businessDaysCount: businessDays,
    expirationDate: current.toISOString().split('T')[0],
    gracePeriodDate: gracePeriodDate.toISOString().split('T')[0] + ' 09:00 hs (Plazo de Gracia)',
    remainingBusinessDays,
    isExpired: remainingBusinessDays < 0,
    isCritical: remainingBusinessDays >= 0 && remainingBusinessDays <= 2
  };
}

/**
 * Watchdog de Caducidad de Instancia (art. 310 CPCC Chaco)
 * Plazo general en primera instancia: 3 meses (90 días corridos de inactividad)
 */
function checkPeremptionWatchdog(lastMovementDateStr, customLimitDays = 90) {
  const lastMove = new Date(lastMovementDateStr);
  const today = new Date();
  
  const diffTime = Math.abs(today - lastMove);
  const inactiveDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const remainingDays = customLimitDays - inactiveDays;
  const percentageConsumed = Math.min(100, Math.round((inactiveDays / customLimitDays) * 100));

  let statusLevel = 'NORMAL';
  let badgeColor = 'green';
  let statusMessage = `En término procesal (${inactiveDays} días de inactividad)`;

  if (remainingDays <= 0) {
    statusLevel = 'PEREMPTION_RISK_MAX';
    badgeColor = 'danger-dark';
    statusMessage = `CADUCIDAD CONSUMADA: ${inactiveDays} días sin movimiento (Límite: ${customLimitDays} días). Peligro de acuse por contraria.`;
  } else if (remainingDays <= 15) {
    statusLevel = 'CRITICAL';
    badgeColor = 'danger';
    statusMessage = `ALERTA CRÍTICA: Restan solo ${remainingDays} días corridos para la caducidad (${percentageConsumed}% consumido). Presentar escrito impulsor urgente.`;
  } else if (remainingDays <= 30) {
    statusLevel = 'WARNING';
    badgeColor = 'warning';
    statusMessage = `ADVERTENCIA: ${inactiveDays} días sin movimiento. Restan ${remainingDays} días para caducar.`;
  }

  return {
    lastMovementDate: lastMovementDateStr,
    inactiveDays,
    limitDays: customLimitDays,
    remainingDays,
    percentageConsumed,
    statusLevel,
    badgeColor,
    statusMessage,
    recommendedMotion: 'Presentar escrito simple de mero trámite ("SOLICITA SE PASE A DESPACHO / REITERA PEDIDO") para interrumpir el plazo perentorio.'
  };
}

/**
 * Watchdog de Prescripción de Derechos (CCCN y LCT)
 */
function checkPrescriptionWatchdog(eventDateStr, prescriptionYears, claimType) {
  const eventDate = new Date(eventDateStr);
  const expirationDate = new Date(eventDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + prescriptionYears);

  const today = new Date();
  const diffTime = expirationDate - today;
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let isAlert = remainingDays <= 60;
  let alertMessage = isAlert 
    ? `ALERTA DE PRESCRIPCIÓN: Vence en ${remainingDays} días. Iniciar demanda o interpelación auténtica (art. 2541 CCCN).`
    : `Plazo de prescripción bajo control (${remainingDays} días restantes).`;

  return {
    eventDate: eventDateStr,
    prescriptionYears,
    claimType,
    expirationDate: expirationDate.toISOString().split('T')[0],
    remainingDays,
    isAlert,
    alertMessage
  };
}

module.exports = {
  isBusinessDay,
  calculateBusinessDaysDeadline,
  checkPeremptionWatchdog,
  checkPrescriptionWatchdog
};
