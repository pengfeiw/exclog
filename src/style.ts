export interface Pattern {
    name: string;
    cssKey: string;
    tag?: {
        [key: string]: number | string
    }
}

type ColorTag = [string, string, string, string, string, string, string, string, string, string];
/**
 * step color, referenced to https://afterwork-design.github.io/color-card/step
 */
const color:{[key: string]: ColorTag} = {
    Orange: ["#FFEFE7","#FFD1BC","#FFB492","#FF9767","#FF7A3D","#FF5D12","#D64400","#AD3700","#852A00","#5C1D00"],
    Yellow: ["#FFF8E6","#FFECB9","#FFE08C","#FFD45F","#FFC832","#FFBC05","#D69D00","#AD7F00","#856100","#5C4300"],
    Green: ["#F2FFF7","#CDFFDF","#A7FFC7","#7FF9AB","#6ADC93","#56BF7C","#45A266","#358451","#26673E","#194A2B"],
    Cyan: ["#ECFCFF","#CAF8FF","#A9F3FF","#87EFFF","#65EAFF","#44E6FF","#26BED6","#1098AD","#017384","#004F5B"],
    Blue: ["#E7F0FF","#BCD4FF","#90B9FF","#659EFF","#3A83FF","#0E62F1","#004AC8","#003B9F","#002C77","#001D4E"],
    Violet: ["#F1EFFF","#D2CCFF","#B3A8FF","#9383FC","#6F5CF1","#5846CF","#4333AD","#31238B","#211669","#140C47"],
    Grape: ["#FCF0FF","#F5CEFF","#EFACFF","#E88BFF","#E269FF","#CE55EB","#AE3EC9","#8F2BA7","#530F63","#3a0147"],
    Pink: ["#FFEDF3","#FFC4D9","#FF9CBE","#FF73A4","#F84986","#D6336C","#B42154","#92133F","#70082C","#4E011C"],
    Gray: ["#F6F7F7","#EDF1F6","#D3D9DF","#BAC1C8","#A2AAB2","#8A939B","#747C84","#5E666E","#495057","#353B40"]
};

type ColorKey = keyof typeof color;
const colorTags = (() => {
    const keys = Object.keys(color);
    const obj = {};
    for (let key of keys) {
        const specificColor = color[key as ColorKey];
        for (let i = 0; i < specificColor.length; i++) {
            Object.defineProperty(obj, `${key}${i}`, {
                value: specificColor[i]
            });
        }
    }

    return obj;
})();

const fontSizeTags = {
    Xl: "20px",
    Lg: "18px",
    Md: "16px",
    Sm: "14px",
    Xs: "12px"
};

const paddingTags = {
    Xl: "10px",
    Lg: "8px",
    Md: "5px",
    Sm: "3px",
    Xs: "1px"
};

const borderRadiusTag = {
    None: '0',
    Base: '0.25rem',
    Xs: '0.12rem',
    Sm: '0.125rem',
    Md: '0.375rem',
    Lg: '0.5rem',
    Xl: '0.75rem'
};

export const defaultPatterns: Pattern[] = [
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
