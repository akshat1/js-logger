/**
 * @typedef Logger
 * @property {function} info
 * @property {function} error
 * @property {function} warn
 * @property {function} debug
 * @property {function} log
 * @property {function} getName
 */

const stringifyIfNeeded = (message) => {
  if (typeof window !== 'undefined') {
    return message;  // The browser console handles objects just fine
  }

  if (typeof message === 'object') {
    return JSON.stringify(message);
  }

  return message;
}

const logInner = (loggerName, level, ...messages) => {
  const timeString = new Date().toISOString();
  const stub = `[${timeString} ${loggerName}]`;
  console[level](stub, ...(messages).map(stringifyIfNeeded));
}

/**
 * 
 * @param {string} name 
 * @param {Logger} parent 
 * @returns {Logger}
 */
export function getLogger(loggerName, parent) {
  const name = parent ? `${parent.getName()} > ${loggerName}` : loggerName;
  const getName = () => name;
  const info = (...messages) => logInner(name, 'info', ...messages);
  const error = (...messages) => logInner(name, 'error', ...messages);
  const warn = (...messages) => logInner(name, 'warn', ...messages);
  const debug = (...messages) => logInner(name, 'debug', ...messages);
  const log = (...messages) => logInner(name, 'log', ...messages);
  return {
    info,
    error,
    warn,
    debug,
    log,
    getName
  }
}
