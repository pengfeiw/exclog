export interface Pattern {
    name: string;
    cssKey: string;
    tag?: {
        [key: string]: number | string
    }
}

/**
 * step color, referenced to https://afterwork-design.github.io/color-card/step
 */
const color = {
    Orange: ["#5C1D00","#852A00","#AD3700","#D64400","#FF5D12","#FF7A3D","#FF9767","#FFB492","#FFD1BC","#FFEFE7"],
    Yellow: ["#5C4300", "#856100", "#AD7F00", "#D69D00", "#FFBC05", "#FFC832", "#FFD45F", "#FFE08C", "#FFECB9"],
    Green: ["#194A2B", "#26673E", "#358451", "#45A266", "#56BF7C", "#6ADC93", "#7FF9AB", "#A7FFC7", "#CDFFDF"],
    Cyan: ["#004F5B", "#017384", "#1098AD", "#26BED6", "#44E6FF", "#65EAFF", "#87EFFF", "#A9F3FF", "#CAF8FF"],
    Pink: ["#4E011C", "#70082C", "#92133F", "#B42154", "#D6336C", "#F84986", "#FF73A4", "#FF9CBE", "#FFC4D9"],
    Gray: ["#353B40", "#495057", "#5E666E", "#747C84", "#8A939B", "#A2AAB2", "#BAC1C8", "#D3D9DF", "#EDF1F6"],
    Blue: ["#001D4E", "#002C77", "#003B9F", "#004AC8", "#0E62F1", "#3A83FF", "#659EFF", "#90B9FF", "#BCD4FF"]
};

type ColorKey = keyof typeof color;
const colorTags = (() => {
    const keys = Object.keys(color);
    const obj = {};
    for (let key of keys) {
        const specificColor = color[key as ColorKey];
        for (let i = 0; i < specificColor.length; i++) {
            Object.defineProperty(obj, `${key}${specificColor.length - 1 - i}`, {
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
