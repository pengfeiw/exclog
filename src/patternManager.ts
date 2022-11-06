import { Pattern } from "./style";

// TODO 也可以封装成一个类，在获取值的时候，做更多的操作
interface Property {
    [key: string]: string | number; 
}

class PatternManager {
    public patterns: Map<string, Property> = new Map();
    public patternToCSSKey: Map<string, string> = new Map();

    static splitPattern(pattern: string) {
        const regex = /[A-Z0-9#]/g;
        const splitIndex = pattern.search(regex);
        const k = pattern.substring(0, splitIndex);
        let v = pattern.substring(splitIndex);
        if (v.startsWith("0x")) {
            v = `#${v.substring(2)}`
        }
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

    public clear() {
        this.patterns.clear();
        this.patternToCSSKey.clear();
    }

    public setPattern(pattern: Pattern) {
        if (pattern.tag) {
            this.patterns.set(pattern.name, pattern.tag);
        }
        this.patternToCSSKey.set(pattern.name, pattern.cssKey);
    }

    public setPatterns(patterns: Pattern[]) {
        patterns.forEach((pattern) => {
            this.setPattern(pattern);
        })
    }

    public getPattern(key: string): Pattern | null {
        if (this.patternToCSSKey.has(key) === false) {
            return null;
        }

        return {
            name: key,
            cssKey: this.patternToCSSKey.get(key)!,
            tag: this.patterns.get(key)
        };
    }
}

export default PatternManager;
