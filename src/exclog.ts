import PatternManager from "./patternManager";
import { defaultPatterns, Pattern } from "./style";

const INIT_STYLE = "display:block;padding:3px 5px;border-radius:4px;";

class Exclog {
    private _style: string = INIT_STYLE;
    private _patternManager: PatternManager = new PatternManager();

    public constructor() {
        this._patternManager.setPatterns(defaultPatterns);
    }

    log(...text: any) {
        let msg = "";
        for (let t of text) {
            msg += `${t}`;
        }

        console.log(`%c${msg}`, this._style);

        this._style = INIT_STYLE;
    }

    setPattern(pattern: Pattern) {
        this._patternManager.setPattern(pattern);
    }

    setPatterns(patterns: Pattern[]) {
        this._patternManager.setPatterns(patterns);
    }

    clearPattern() {
        this._patternManager.clear();
    }

    static Logger = new Proxy(new Exclog() as ProxyObj, {
        get: function (target, propKey: string, receiver) {
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
    })
}

type ProxyObj = Exclog & { [key: string]: ProxyObj };

const Logger = Exclog.Logger;

export default Logger;
