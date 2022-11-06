// TODO 也可以封装成一个类，在获取值的时候，做更多的操作
interface Property {
    [key: string]: string; 
}

class PatternManager {
    public patterns: Map<string, Property> = new Map();
    public patternToCSSKey: Map<string, string> = new Map();

    static splitPattern(pattern: string) {
        const regex = /[A-Z0-9]/g;
        const splitIndex = pattern.search(regex);
        const k = pattern.substring(0, splitIndex);
        const v = pattern.substring(splitIndex);
        return [k, v];
    }

    public getStyleStr(key: string, value: string) {
        let str = "";
        str += this.patternToCSSKey.get(key) || key;
        str += ":";

        const tag = this.patterns.get(key);
        if (tag !== undefined) {
            const relValue = Reflect.get(tag, value) as string;
            str += relValue || value;
        } else {
            str += value;
        }

        str += ";"

        return str;
    }
}

export default PatternManager;
