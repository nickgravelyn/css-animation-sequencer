import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'cssAnimationSequencer'
    },
    plugins: []
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: []
  }
]
