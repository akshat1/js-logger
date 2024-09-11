import chalk from "chalk";
import { nameToColor } from "./colorize.js";
import { InnerLogger } from "./InnerLogger";
import { Logger } from "./Logger";

const transform = (arg: unknown, seen?: WeakSet<Object>) => {
  const argType = typeof arg;
  if (argType === "string" || argType === "number" || argType === "boolean" || argType === "undefined" || arg === null) {
    return arg;
  }
  
  if (!seen) {
    seen = new WeakSet();
  }

  seen.add(arg);
  if (Array.isArray(arg)) {
    return arg.map((item) => transform(item, seen));
  }

  try {
    return JSON.stringify(arg, null, 2);
  } catch (err) {
    return `[Stringification failed: ${err.message}]`;
  }
};

const colorizedNameMap = new WeakMap<Logger, string>();

/**
 * @hidden
 * @param logger 
 * @returns 
 */
export const getColorizedName = (logger: Logger): string => {
  if (colorizedNameMap.has(logger)) {
    return colorizedNameMap.get(logger)!;
  }

  const lineage = logger.getLineage();
  const colorizedName = lineage
    .map((name) => {
      const [r, g, b] = nameToColor(name);
      return chalk.rgb(r, g, b)(name);
    })
    .join(" > ");
  colorizedNameMap.set(logger, colorizedName);
  return colorizedName;
};

export const getInnerLogger = (logger: Logger): InnerLogger =>
  (level: string, ...args: unknown[]) => {
    const timeString = new Date().toISOString();
    const stub = `[${timeString} ${getColorizedName(logger)}]`;
    if (typeof console[level] !== "function") {
      throw new Error(`Unknown level ${level}`);
    }
    console[level](stub, ...transform(args));
  };
