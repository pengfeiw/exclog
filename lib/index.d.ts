interface Pattern {
    name: string;
    cssKey: string;
    tag?: {
        [key: string]: number | string;
    };
}

declare class Exclog {
    private _style;
    private _patternManager;
    constructor();
    log(...text: any): void;
    setPattern(pattern: Pattern): void;
    setPatterns(patterns: Pattern[]): void;
    clearPattern(): void;
    static Logger: ProxyObj;
}
declare type ProxyObj = Exclog & {
    [key: string]: ProxyObj;
};
declare const Logger: ProxyObj;

declare const logError: (...msg: any) => void;
declare const logSuccess: (...msg: any) => void;
declare const logInfo: (...msg: any) => void;
declare const logWarn: (...msg: any) => void;

export { Logger as default, logError, logInfo, logSuccess, logWarn };
