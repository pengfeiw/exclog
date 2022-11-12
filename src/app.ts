import { logError, logSuccess, logInfo, logWarn } from "./";
import Logger from "./";

logError("this is a error.", " this is an another error.");
logSuccess("This is a success message.");
logInfo("This is a normal message.");
logWarn("This is a warning message.");

Logger.bgPink3.log("Hello World,", " Hello Chinese!");
