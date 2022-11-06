import PatternManager from "./patternManager";

interface Exlogger {
    [key: string]: any;
}

class Exlog {
    public _style: string = "";
    public _patternManager: PatternManager = new PatternManager();

    log(text: string) {
        window.console.log(`%c${text}`, this._style);
        this._style = "";
    }
}


type ProxyObj = Exlog & { [key: string]: ProxyObj };

const Logger: ProxyObj = new Proxy(new Exlog() as ProxyObj, {
    get: function(target, propKey: string, receiver) {
        console.log(propKey);
        if (propKey in target) {
            return (target as any)[propKey];
        } else {
            const [key, value] = PatternManager.splitPattern(propKey);
            if (target._style === undefined) {
                target._style = "";
            }
            target._style += target._patternManager.getStyleStr(key, value);
            return receiver;
        }
    }
});

export default Logger;
