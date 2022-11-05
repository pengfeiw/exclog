import { getAppInfo } from "./app";

const printInfo: () => void = () => {
    const info = getAppInfo();
    console.log(info);
};

printInfo();

export default printInfo;
