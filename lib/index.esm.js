var PatternManager = /** @class */ (function () {
    function PatternManager() {
        this.patterns = new Map();
        this.patternToCSSKey = new Map();
    }
    PatternManager.splitPattern = function (pattern) {
        var regex = /[A-Z0-9#]/g;
        var splitIndex = pattern.search(regex);
        var k = pattern.substring(0, splitIndex);
        var v = pattern.substring(splitIndex);
        if (v.startsWith("0x")) {
            v = "#".concat(v.substring(2));
        }
        return [k, v];
    };
    PatternManager.prototype.getStyleStr = function (key, value) {
        var str = "";
        str += this.patternToCSSKey.get(key) || key;
        str += ":";
        var tag = this.patterns.get(key);
        if (tag !== undefined) {
            var relValue = Reflect.get(tag, value);
            str += relValue || value;
        }
        else {
            str += value;
        }
        str += ";";
        return str;
    };
    PatternManager.prototype.clear = function () {
        this.patterns.clear();
        this.patternToCSSKey.clear();
    };
    PatternManager.prototype.setPattern = function (pattern) {
        if (pattern.tag) {
            this.patterns.set(pattern.name, pattern.tag);
        }
        this.patternToCSSKey.set(pattern.name, pattern.cssKey);
    };
    PatternManager.prototype.setPatterns = function (patterns) {
        var _this = this;
        patterns.forEach(function (pattern) {
            _this.setPattern(pattern);
        });
    };
    PatternManager.prototype.getPattern = function (key) {
        if (this.patternToCSSKey.has(key) === false) {
            return null;
        }
        return {
            name: key,
            cssKey: this.patternToCSSKey.get(key),
            tag: this.patterns.get(key)
        };
    };
    return PatternManager;
}());

/**
 * step color, referenced to https://afterwork-design.github.io/color-card/step
 */
var color = {
    Orange: ["#FFEFE7", "#FFD1BC", "#FFB492", "#FF9767", "#FF7A3D", "#FF5D12", "#D64400", "#AD3700", "#852A00"],
    Yellow: ["#5C4300", "#856100", "#AD7F00", "#D69D00", "#FFBC05", "#FFC832", "#FFD45F", "#FFE08C", "#FFECB9"],
    Green: ["#194A2B", "#26673E", "#358451", "#45A266", "#56BF7C", "#6ADC93", "#7FF9AB", "#A7FFC7", "#CDFFDF"],
    Cyan: ["#004F5B", "#017384", "#1098AD", "#26BED6", "#44E6FF", "#65EAFF", "#87EFFF", "#A9F3FF", "#CAF8FF"],
    Purple: ["#4E011C", "#70082C", "#92133F", "#B42154", "#D6336C", "#F84986", "#FF73A4", "#FF9CBE", "#FFC4D9"],
    Gray: ["#353B40", "#495057", "#5E666E", "#747C84", "#8A939B", "#A2AAB2", "#BAC1C8", "#D3D9DF", "#EDF1F6"],
    Blue: ["#001D4E", "#002C77", "#003B9F", "#004AC8", "#0E62F1", "#3A83FF", "#659EFF", "#90B9FF", "#BCD4FF"]
};
var colorTags = (function () {
    var keys = Object.keys(color);
    var obj = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var specificColor = color[key];
        for (var i = 0; i < specificColor.length; i++) {
            Object.defineProperty(obj, "".concat(key).concat(specificColor.length - 1 - i), {
                value: specificColor[i]
            });
        }
    }
    return obj;
})();
var fontSizeTags = {
    Xl: "20px",
    Lg: "18px",
    Md: "16px",
    Sm: "14px",
    Xs: "12px"
};
var paddingTags = {
    Xl: "10px",
    Lg: "8px",
    Md: "5px",
    Sm: "3px",
    Xs: "1px"
};
var borderRadiusTag = {
    None: '0',
    Base: '0.25rem',
    Xs: '0.12rem',
    Sm: '0.125rem',
    Md: '0.375rem',
    Lg: '0.5rem',
    Xl: '0.75rem'
};
var defaultPatterns = [
    {
        name: "color",
        cssKey: "color",
        tag: colorTags
    },
    {
        name: "bg",
        cssKey: "background",
        tag: colorTags
    },
    {
        name: "fontsize",
        cssKey: "font-size",
        tag: fontSizeTags
    },
    {
        name: "p",
        cssKey: "padding",
        tag: paddingTags
    },
    {
        name: "br",
        cssKey: "border-radius",
        tag: borderRadiusTag
    }
];

var INIT_STYLE = "display:block;padding:3px;border-radius:4px;";
var Exlog = /** @class */ (function () {
    function Exlog() {
        this._style = INIT_STYLE;
        this._patternManager = new PatternManager();
        this._patternManager.setPatterns(defaultPatterns);
    }
    Exlog.prototype.log = function (text) {
        window.console.log("%c".concat(text), this._style);
        this._style = INIT_STYLE;
    };
    Exlog.prototype.setPattern = function (pattern) {
        this._patternManager.setPattern(pattern);
    };
    Exlog.prototype.clearPattern = function () {
        this._patternManager.clear();
    };
    return Exlog;
}());
var Logger = new Proxy(new Exlog(), {
    get: function (target, propKey, receiver) {
        if (propKey in target) {
            return target[propKey];
        }
        else {
            var _a = PatternManager.splitPattern(propKey), key = _a[0], value = _a[1];
            if (target._style === undefined) {
                target._style = "";
            }
            target._style += target._patternManager.getStyleStr(key, value);
            return receiver;
        }
    }
});

Logger.bgCyan3.colorWhite.log("Logger.bgCyan3.colorWhite.log");
Logger.bgGray2.color0x007acc.log("Logger.bgGray2.color0x007acc.log");
Logger.bgGray4.colorOrange2.log("Logger.bgGray4.colorOrange2.log");
Logger.bgGray3.colorWhite.fontsizeXl.log("Logger.bgGray3.colorWhite.fontsizeXl.log");
Logger.bgGray3.colorWhite.brNone.log("Logger.bgGray3.colorWhite.brNone.log");
Logger.bgGray3.colorWhite.brNone.pXl.log("Logger.bgGray3.colorWhite.brNone.pXl.log");
Logger.bgGray3.colorWhite.brNone.pLg.log("Logger.bgGray3.colorWhite.brNone.pLg.log");
Logger.bgGray3.colorWhite.brNone.pMd.log("Logger.bgGray3.colorWhite.brNone.pMd.log");
Logger.bgGray3.colorWhite.brNone.pSm.log("Logger.bgGray3.colorWhite.brNone.pSm.log");
Logger.bgGray3.colorWhite.brNone.pXs.log("Logger.bgGray3.colorWhite.brNone.pXs.log");
//# sourceMappingURL=index.esm.js.map
