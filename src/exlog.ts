import PatternManager from "./patternManager";
import { defaultPatterns, Pattern } from "./style";

const INIT_STYLE = "display:block;padding:3px;border-radius:4px;";

class Exlog {
    public _style: string = INIT_STYLE;
    public _patternManager: PatternManager = new PatternManager();

    public constructor() {
        this._patternManager.setPatterns(defaultPatterns);
    }

    log(text: string) {
        window.console.log(`%c${text}`, this._style);
        this._style = INIT_STYLE;
    }

    setPattern(pattern: Pattern) {
        this._patternManager.setPattern(pattern);
    }

    clearPattern() {
        this._patternManager.clear();
    }
}

type ProxyObj = Exlog & { [key: string]: ProxyObj };

const Logger: ProxyObj = new Proxy(new Exlog() as ProxyObj, {
    get: function(target, propKey: string, receiver) {
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
