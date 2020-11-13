import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import clear from 'rollup-plugin-clear'

function litCSS() {
    function getLitCss(source) {
        return `
           import {css} from 'lit-element';
           export default css\`${source}\`;
        `;
    }
    return {
        name: 'lit-css',
        transform(code, id) {
            if (!id.endsWith('.css')) {
                return null;
            }
            return {
                code: getLitCss(code),
                map: null
            }
        }
    }
}

const chromeConfig = {
    input: 'index.js',
    output: {
        dir: 'dist/es',
        format: 'es',
        chunkFileNames: '[name].js',
        sourcemap: true
    },
    preserveEntrySignatures: false,
    plugins: [
        clear({
            targets: ['dist/es'],
        }),
        replace({
            API_ENDPOINT: "'https://miapi.com'"
        }),
        resolve(),
        litCSS(),
        cjs(),
        babel({
            ignore: [/[\/\\]core-js/],
            babelHelpers: 'bundled',
            presets: [
                ["@babel/preset-env", {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: {
                        browsers: ["last 1 chrome versions"]
                    }
                }]
            ]
        }),
        terser()
    ]
}

const ie11Config = {
    input: 'index.js',
    output: {
        dir: 'dist/iife',
        format: 'iife',
        sourcemap: true
    },
    inlineDynamicImports: true,
    preserveEntrySignatures: false,
    plugins: [
        clear({
            targets: ['dist/iife'],
        }),
        replace({
            API_ENDPOINT: "'https://miapi.com'"
        }),
        resolve(),
        litCSS(),
        cjs(),
        babel({
            ignore: [/[\/\\]core-js/],
            babelHelpers: 'bundled',
            presets: [
                ["@babel/preset-env", {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: {
                        browsers: ["IE 11"]
                    }
                }]
            ]
        }),
        terser()
    ]
}

export default [
    chromeConfig,
    ie11Config
]