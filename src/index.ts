import { InnerLogger } from "./InnerLogger";
import { Level, LevelName } from "./Level.js";
import { Logger } from "./Logger";
import { getInnerLogger as browserInnerLogger } from "./browser.js";

let globalLevel: Level = Level.ALL;

export {
  Logger,
  Level,
  LevelName,
};
export const getGlobalLevel = () => globalLevel;
export const setGlobalLevel = (level: Level) => {
  globalLevel = level;
};

// We don't want to import the server logger in the browser, so we use dynamic imports
// That's because we may want to use node APIs in the server logger in the future
const getInnerLogger = typeof window === "undefined" ? (await import("./server.js")).getInnerLogger : browserInnerLogger;

const wrapInLevelLogic = (level: Level, getLevel: () => Level, innerLogger: InnerLogger) => {
  const levelName = LevelName[level];
  return (...args: unknown[]) => {
    if (getLevel() >= level) {
      innerLogger(levelName, ...args);
    }
  };
};

export const getLogger = (loggerName: string, parent?: Logger): Logger => {
  const name = parent ? `${parent.getName()} > ${loggerName}` : loggerName;
  const getName = () => name;
  let l: Logger = {} as Logger;
  const innerLogger = getInnerLogger(l);
  
  let level: Level|undefined;
  /* This might become problematic if we have a lot of nested loggers but that seems unlikely. If it ever does become a
  problem, then we might need to have local levels, plus a way to update everything when the global level or a parent
  level changes. We'll need a modified pub-sub thingy, but we'll use a WeakSet instead of an array of subscribers in
  order to play well with garbage collection. */
  const getLevel = () => level ? level : parent?.getLevel() ?? globalLevel;

  Object.assign(l, {
    getLevel,
    setLevel: (newLevel: Level) => { level = newLevel; },
    info: wrapInLevelLogic(Level.INFO, getLevel, innerLogger),
    error: wrapInLevelLogic(Level.ERROR, getLevel, innerLogger),
    warn: wrapInLevelLogic(Level.WARN, getLevel, innerLogger),
    debug: wrapInLevelLogic(Level.DEBUG, getLevel, innerLogger),
    log: wrapInLevelLogic(Level.ALL, getLevel, innerLogger),
    getName,
    getLineage: () => parent ? [...parent.getLineage(), loggerName] : [loggerName],
  });

  return l;
};

export default getLogger;
