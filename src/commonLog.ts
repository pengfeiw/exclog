import Logger from "./exclog";

export const logError = (...msg: any) => {
    Logger.bgPink0.colorRed.log(...msg);
};

export const logSuccess = (...msg: any) => {
    Logger.bgGreen1.log(...msg);
};

export const logInfo = (...msg: any) => {
    Logger.bgCyan1.log(...msg);
};

export const logWarn = (...msg: any) => {
    Logger.bgYellow1.log(...msg);
}
