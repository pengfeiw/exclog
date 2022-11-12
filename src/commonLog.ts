import Logger from "./exlog";

export const logError = (...msg: any) => {
    Logger.bgPink0.colorRed.log("ERROR: ", ...msg);
};

export const logSuccess = (...msg: any) => {
    Logger.bgGreen1.log("SUCCESS: ", ...msg);
};

export const logInfo = (...msg: any) => {
    Logger.bgCyan1.log("INFO: ", ...msg);
};

export const logWarn = (...msg: any) => {
    Logger.bgYellow1.log("WARNING: ", ...msg);
}
