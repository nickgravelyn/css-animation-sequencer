import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'

const plugins = [
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
  }),
  cleanup(),
]

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/seashell.esm.js',
        format: 'es',
      },
      {
        file: 'dist/seashell.cjs.js',
        format: 'cjs',
      },
    ],
    plugins: plugins,
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'docs/seashell.js',
        format: 'iife',
        name: 'Seashell',
      },
    ],
    plugins: plugins,
  },
]
