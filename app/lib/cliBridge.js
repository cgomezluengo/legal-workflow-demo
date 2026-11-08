/**
 * Puente Multi-Tenant CLI & Gestor de Suscripciones ("Arquitectura Orca/CLI")
 * Administra credenciales y sesiones de Claude CLI aisladas por directorio de tenant (HOME=<tenantDir>).
 */

const { spawn, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function getTenantDir(tenantId) {
  const dir = path.join(__dirname, '..', 'tenants', tenantId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function getSubscriptionFilePath(tenantId) {
  return path.join(getTenantDir(tenantId), 'subscription.json');
}

/**
 * Consulta el estado de autenticación real de Claude CLI con HOME=<tenantDir>
 * y verifica si existe sesión activa o suscripción conectada (real o simulada).
 */
function getTenantAuthStatus(tenantId) {
  const tenantDir = getTenantDir(tenantId);
  const subscriptionFile = getSubscriptionFilePath(tenantId);

  return new Promise((resolve) => {
    // 1. Verificar suscripción vinculada localmente (Demo Bridge)
    let demoSub = null;
    if (fs.existsSync(subscriptionFile)) {
      try {
        demoSub = JSON.parse(fs.readFileSync(subscriptionFile, 'utf8'));
      } catch (e) {
        demoSub = null;
      }
    }

    // 2. Invocar `claude auth status` con HOME aislado
    const env = { ...process.env, HOME: tenantDir };
    execFile('claude', ['auth', 'status'], { env, timeout: 3000 }, (error, stdout, stderr) => {
      let cliStatus = { loggedIn: false, authMethod: 'none', apiProvider: 'firstParty' };
      
      try {
        const trimmed = (stdout || '').trim();
        // Extraer JSON si hay texto adicional
        const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cliStatus = JSON.parse(jsonMatch[0]);
        }
      } catch (parseErr) {
        // Fallback si no es JSON
      }

      // Consolidar estado final
      const isLiveCliLoggedIn = Boolean(cliStatus.loggedIn);
      const isDemoLoggedIn = Boolean(demoSub && demoSub.active);

      const loggedIn = isLiveCliLoggedIn || isDemoLoggedIn;
      const mode = isLiveCliLoggedIn ? 'live_cli' : (isDemoLoggedIn ? 'demo_bridge' : 'unauthenticated');

      resolve({
        tenantId,
        tenantHome: tenantDir,
        loggedIn,
        mode,
        isLiveCli: isLiveCliLoggedIn,
        isDemoConnected: isDemoLoggedIn,
        cliStatus,
        subscriptionDetails: isLiveCliLoggedIn ? {
          plan: 'Claude Team / Pro (Live CLI)',
          method: cliStatus.authMethod,
          accountEmail: cliStatus.email || 'abogado-titular@estudio.com.ar',
          activeSince: 'Activo vía Claude CLI nativo'
        } : (isDemoLoggedIn ? {
          plan: demoSub.plan || 'Claude Pro Legal Copilot ($20/mes suscripción)',
          method: 'OAuth 2.0 Token Bridge',
          accountEmail: demoSub.accountEmail || 'titular@estudio-chaco.com.ar',
          activeSince: demoSub.connectedAt || '2026-11-08',
          features: ['Análisis ilimitado de proveídos', 'Redacción de borradores CPCC', 'Cero costo por token API']
        } : null)
      });
    });
  });
}

/**
 * Conecta o alterna la suscripción del tenant (modo demo interactivo o instrucciones CLI)
 */
function connectTenantSubscription(tenantId, options = {}) {
  const tenantDir = getTenantDir(tenantId);
  const subscriptionFile = getSubscriptionFilePath(tenantId);

  const { action = 'toggle_demo', email, plan = 'Claude Pro Legal Copilot (Suscripción Ilimitada)' } = options;

  if (action === 'disconnect') {
    if (fs.existsSync(subscriptionFile)) {
      fs.unlinkSync(subscriptionFile);
    }
    return {
      success: true,
      action: 'disconnected',
      message: 'Suscripción desvinculada exitosamente para este estudio.'
    };
  }

  if (action === 'cli_login_info') {
    return {
      success: true,
      action: 'cli_command_ready',
      command: `HOME="${tenantDir}" claude auth login --claudeai`,
      instructions: `Ejecute el comando anterior en su terminal para vincular la suscripción real de Claude Pro/Team al entorno aislado de este estudio. Las credenciales quedarán alojadas en ${tenantDir}/.claude.json sin mezclarse con otros estudios.`
    };
  }

  // Modo Demo / Toggle (crea o remueve credentials.json)
  const currentlyConnected = fs.existsSync(subscriptionFile);
  if (currentlyConnected && options.forceState !== true) {
    fs.unlinkSync(subscriptionFile);
    return {
      success: true,
      active: false,
      message: 'Suscripción Demo desvinculada.'
    };
  } else {
    const subData = {
      active: true,
      plan,
      accountEmail: email || (tenantId === 'estudio_chaco_central' ? 'dr.gomez@estudiochaco.com.ar' : 'contacto@resistencia-legal.com.ar'),
      connectedAt: new Date().toISOString(),
      tenantId,
      bridgeType: 'Orca/CLI Multi-Tenant Proxy'
    };
    fs.writeFileSync(subscriptionFile, JSON.stringify(subData, null, 2), 'utf8');
    return {
      success: true,
      active: true,
      subData,
      message: '¡Suscripción de Claude Copilot Legal conectada exitosamente!'
    };
  }
}

/**
 * Ejecuta un prompt legal a través de Claude CLI en el entorno del tenant
 */
function executeClaudePrompt(tenantId, prompt, timeoutMs = 25000) {
  const tenantDir = getTenantDir(tenantId);
  const env = { ...process.env, HOME: tenantDir };

  return new Promise((resolve) => {
    execFile('claude', ['-p', prompt], { env, timeout: timeoutMs }, (error, stdout, stderr) => {
      if (error || !stdout || stdout.trim().length === 0) {
        resolve({
          success: false,
          error: error ? error.message : 'Respuesta vacía del CLI',
          stderr
        });
      } else {
        resolve({
          success: true,
          output: stdout.trim(),
          source: 'cli_subscription'
        });
      }
    });
  });
}

module.exports = {
  getTenantDir,
  getTenantAuthStatus,
  connectTenantSubscription,
  executeClaudePrompt
};
