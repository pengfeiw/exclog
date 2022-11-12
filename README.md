# Exclog

Exclog is a tool used print message in browser console.

## install

with npm: 
```bash
$ npm install exclog --save-dev
```

or yarn:
```bash
$ yarn add exclog --save-dev
```

## Log info

With default style log.

```javascript
import { logError, logSuccess, logInfo, logWarn } from "exclog";

logError("this is a error.", " this is an another error.");
logSuccess("This is a success message.");
logInfo("This is a normal message.");
logWarn("This is a warning message.");
```

Print message with customize style.
```javascript
import Logger from "exclog";

Logger.bgRed.colorWhite.log("This is so cool!");
```

## Pattern

You can set message style with pattern —— `<cssKey><cssValue>`, such as `Logger.bgRed`, `bgRed` is compose with a tag `cssKey`——`bg` and a `cssValue`——`Red`. `bg` is stand for `background`，`Red` is the css color `red`.

```javascript
Logger.background0xdddddd.log("set background color: #dddddd");
Logger.bgRed.log("set background color: red");
Logger.bgPink.brXl("set background pink and border radius with a extral large size");
```

Exclog register a **internal style pattern**, So you can set `background` with `bg`，You can also use a complete spelling css property name as `<cssKey>` in pattern.

### Regist pattern

You can regist your own style pattern.

```typescript
const borderRadiusTag = {
    None: '0',
    Base: '0.25rem',
    Xs: '0.12rem',
    Sm: '0.125rem',
    Md: '0.375rem',
    Lg: '0.5rem',
    Xl: '0.75rem'
};

const patterns: Pattern[] = [
    {
        name: "br",
        cssKey: "border-radius",
        tag: borderRadiusTag
    }
];

// regist patterns
Logger.setPatterns(patterns);

// use pattern
Logger.brMd.log("border-radius: 0.375rem");
```
