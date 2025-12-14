const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
const DEFAULT_LEVEL = process.env.LOG_LEVEL || 'debug';
const currentLevel = LEVELS[DEFAULT_LEVEL as keyof typeof LEVELS] ?? 0;

function formatMeta(meta?: Record<string, any>) {
  if (!meta) return '';
  try {
    return JSON.stringify(meta);
  } catch (e) {
    return String(meta);
  }
}

export function logDebug(message: string, meta?: Record<string, any>) {
  if (currentLevel <= LEVELS.debug) console.log(`[DEBUG] ${new Date().toISOString()} ${message} ${formatMeta(meta)}`);
}

export function logInfo(message: string, meta?: Record<string, any>) {
  if (currentLevel <= LEVELS.info) console.log(`[INFO] ${new Date().toISOString()} ${message} ${formatMeta(meta)}`);
}

export function logWarn(message: string, meta?: Record<string, any>) {
  if (currentLevel <= LEVELS.warn) console.warn(`[WARN] ${new Date().toISOString()} ${message} ${formatMeta(meta)}`);
}

export function logError(message: string, meta?: Record<string, any>) {
  if (currentLevel <= LEVELS.error) console.error(`[ERROR] ${new Date().toISOString()} ${message} ${formatMeta(meta)}`);
}

export default { logDebug, logInfo, logWarn, logError };
