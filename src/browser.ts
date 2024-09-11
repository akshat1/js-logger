import { nameToColor } from "./colorize.js";
import { InnerLogger } from "./InnerLogger";
import { Logger } from "./Logger";

const colorizedNameMap = new WeakMap<Logger, string[]>();
const getColorizedName = (logger: Logger): string[] => {
  if (colorizedNameMap.has(logger)) {
    return colorizedNameMap.get(logger)!;
  }

  const lineage = logger.getLineage();
  const colorizedName = [];
  for (const name of lineage) {
    const [r, g, b] = nameToColor(name);
    colorizedName.push(`%c${name}`);
    colorizedName.push(`color: rgb(${r}, ${g}, ${b});`);
  }
  colorizedNameMap.set(logger, colorizedName);
  return colorizedName;
};

export const getInnerLogger = (logger: Logger): InnerLogger =>
  (level: string, ...args: unknown[]) => {
    const timeString = new Date().toISOString();
    const stub = [
      "[",
      timeString,
      ...getColorizedName(logger),
      "]",
    ];
    console[level](...stub, ...args);
  };
