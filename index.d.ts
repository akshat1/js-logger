/**
 * The Logger interface.
 */
export interface Logger {
    info: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
    log: (...args: unknown[]) => void;
    getName: () => string;
};

/**
 * Get a new Logger instance with the given name and optional parent logger.
 */
export function getLogger(loggerName: string, parent?: Logger): Logger;
