import Logger from "./exlog";

// TODO: 支持多参数输出
export const logError = (...msg: any) => {
    Logger.bgPink0.colorRed.log(`ERROR: ${msg}`);
};

export const logSuccess = (...msg: any) => {
    Logger.bgGreen1.log(`SUCCESS: ${msg}`);
};

export const logInfo = (...msg: any) => {
    Logger.bgCyan1.log(`INFO: ${msg}`);
};

export const logWarn = (...msg: any) => {
    Logger.bgOrange1.log(`WARN: ${msg}`);
}
