'use strict';

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
    Orange: ["#FFEFE7", "#FFD1BC", "#FFB492", "#FF9767", "#FF7A3D", "#FF5D12", "#D64400", "#AD3700", "#852A00", "#5C1D00"],
    Yellow: ["#FFF8E6", "#FFECB9", "#FFE08C", "#FFD45F", "#FFC832", "#FFBC05", "#D69D00", "#AD7F00", "#856100", "#5C4300"],
    Green: ["#F2FFF7", "#CDFFDF", "#A7FFC7", "#7FF9AB", "#6ADC93", "#56BF7C", "#45A266", "#358451", "#26673E", "#194A2B"],
    Cyan: ["#ECFCFF", "#CAF8FF", "#A9F3FF", "#87EFFF", "#65EAFF", "#44E6FF", "#26BED6", "#1098AD", "#017384", "#004F5B"],
    Blue: ["#E7F0FF", "#BCD4FF", "#90B9FF", "#659EFF", "#3A83FF", "#0E62F1", "#004AC8", "#003B9F", "#002C77", "#001D4E"],
    Violet: ["#F1EFFF", "#D2CCFF", "#B3A8FF", "#9383FC", "#6F5CF1", "#5846CF", "#4333AD", "#31238B", "#211669", "#140C47"],
    Grape: ["#FCF0FF", "#F5CEFF", "#EFACFF", "#E88BFF", "#E269FF", "#CE55EB", "#AE3EC9", "#8F2BA7", "#530F63", "#3a0147"],
    Pink: ["#FFEDF3", "#FFC4D9", "#FF9CBE", "#FF73A4", "#F84986", "#D6336C", "#B42154", "#92133F", "#70082C", "#4E011C"],
    Gray: ["#F6F7F7", "#EDF1F6", "#D3D9DF", "#BAC1C8", "#A2AAB2", "#8A939B", "#747C84", "#5E666E", "#495057", "#353B40"]
};
var colorTags = (function () {
    var keys = Object.keys(color);
    var obj = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var specificColor = color[key];
        for (var i = 0; i < specificColor.length; i++) {
            Object.defineProperty(obj, "".concat(key).concat(i), {
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

var INIT_STYLE = "display:block;padding:3px 5px;border-radius:4px;";
var Exlog = /** @class */ (function () {
    function Exlog() {
        this._style = INIT_STYLE;
        this._patternManager = new PatternManager();
        this._patternManager.setPatterns(defaultPatterns);
    }
    Exlog.prototype.log = function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        var msg = "";
        for (var _a = 0, text_1 = text; _a < text_1.length; _a++) {
            var t = text_1[_a];
            msg += "".concat(t);
        }
        window.console.log("%c".concat(msg), this._style);
        this._style = INIT_STYLE;
    };
    Exlog.prototype.setPattern = function (pattern) {
        this._patternManager.setPattern(pattern);
    };
    Exlog.prototype.clearPattern = function () {
        this._patternManager.clear();
    };
    Exlog.Logger = new Proxy(new Exlog(), {
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
    return Exlog;
}());
var Logger = Exlog.Logger;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var logError = function () {
    var _a;
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    (_a = Logger.bgPink0.colorRed).log.apply(_a, __spreadArray(["ERROR: "], msg, false));
};
var logSuccess = function () {
    var _a;
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    (_a = Logger.bgGreen1).log.apply(_a, __spreadArray(["SUCCESS: "], msg, false));
};
var logInfo = function () {
    var _a;
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    (_a = Logger.bgCyan1).log.apply(_a, __spreadArray(["INFO: "], msg, false));
};
var logWarn = function () {
    var _a;
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    (_a = Logger.bgYellow1).log.apply(_a, __spreadArray(["WARNING: "], msg, false));
};

exports.logError = logError;
exports.logInfo = logInfo;
exports.logSuccess = logSuccess;
exports.logWarn = logWarn;
