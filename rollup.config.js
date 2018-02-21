import babel from 'rollup-plugin-babel'

const babelPlugin = babel({
  exclude: 'node_modules/**',
  plugins: ['external-helpers'],
})

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/seashell.esm.js',
        format: 'es',
      },
    ],
    plugins: [babelPlugin],
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
]
