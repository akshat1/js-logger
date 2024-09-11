import { Logger } from "./Logger";

export type InnerLogger = (level: string, ...args: unknown[]) => void;

export type GetInnerLogger = (logger: Logger) => InnerLogger;