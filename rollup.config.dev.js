import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import clear from 'rollup-plugin-clear'

function litCSS() {
    function getLitCSS(source) {
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
                code: getLitCSS(code),
                map: null
            }
        }
    }
}

export default {
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
        serve(),
        livereload('dist/es'),
        replace({
            API_ENDPOINT: "'http://localhost:3000'"
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
        })
    ]
}
