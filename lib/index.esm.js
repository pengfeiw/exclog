class PatternManager {
    constructor() {
        this.patterns = new Map();
        this.patternToCSSKey = new Map();
    }
    static splitPattern(pattern) {
        const regex = /[A-Z0-9]/g;
        const splitIndex = pattern.search(regex);
        const k = pattern.substring(0, splitIndex);
        const v = pattern.substring(splitIndex);
        return [k, v];
    }
    getStyleStr(key, value) {
        let str = "";
        str += this.patternToCSSKey.get(key) || key;
        str += ":";
        const tag = this.patterns.get(key);
        if (tag !== undefined) {
            const relValue = Reflect.get(tag, value);
            str += relValue || value;
        }
        else {
            str += value;
        }
        str += ";";
        return str;
    }
}

class Exlog {
    constructor() {
        this._style = "";
        this._patternManager = new PatternManager();
    }
    log(text) {
        window.console.log(`%c${text}`, this._style);
        this._style = "";
    }
}
const Logger = new Proxy(new Exlog(), {
    get: function (target, propKey, receiver) {
        console.log(propKey);
        if (propKey in target) {
            return target[propKey];
        }
        else {
            const [key, value] = PatternManager.splitPattern(propKey);
            if (target._style === undefined) {
                target._style = "";
            }
            target._style += target._patternManager.getStyleStr(key, value);
            return receiver;
        }
    }
});

Logger.backgroundRed.colorWhite.log("1111");
//# sourceMappingURL=index.esm.js.map
