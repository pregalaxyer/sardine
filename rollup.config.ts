import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import camelCase from 'lodash.camelcase'

const pkg = require('./package.json')



const external = Object.keys(pkg.dependencies);


const libraryName = 'sardine'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd' },
    { file: pkg.module, format: 'es'},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external:  external,

  plugins: [
    // Allow json resolution
    // Compile TypeScript files
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [/\.spec\.ts$/]
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),

    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),

  ],
}
