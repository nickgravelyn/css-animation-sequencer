import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const babelPlugin = babel({
  exclude: 'node_modules/**',
  plugins: ['external-helpers'],
})

const uglifyPlugin = uglify()

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/seashell.esm.js',
        format: 'es',
      },
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/seashell.esm.min.js',
        format: 'es',
      },
    ],
    plugins: [uglifyPlugin],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/seashell.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/seashell.umd.js',
        format: 'umd',
        name: 'Seashell',
      },
      {
        file: 'dist/seashell.iife.js',
        format: 'iife',
        name: 'Seashell',
      },
    ],
    plugins: [babelPlugin],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'docs/seashell.iife.js',
        format: 'iife',
        name: 'Seashell',
      },
    ],
    plugins: [babelPlugin],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/seashell.cjs.min.js',
        format: 'cjs',
      },
      {
        file: 'dist/seashell.umd.min.js',
        format: 'umd',
        name: 'Seashell',
      },
      {
        file: 'dist/seashell.iife.min.js',
        format: 'iife',
        name: 'Seashell',
      },
    ],
    plugins: [babelPlugin, uglifyPlugin],
  },
]
