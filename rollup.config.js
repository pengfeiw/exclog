import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: './lib/index.mjs',
                format: 'es'
            },
            {
                file: './lib/index.cjs',
                format: 'cjs'
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    },
    {
        input: "src/index.ts",
        output: [{ file: "lib/index.d.ts", format: "es" }],
        plugins: [dts()]
    }
];

export default config;
