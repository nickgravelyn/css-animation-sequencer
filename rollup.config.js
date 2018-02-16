import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/css-animation-sequencer.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/css-animation-sequencer.esm.js',
        format: 'es'
      },
      {
        file: 'dist/css-animation-sequencer.umd.js',
        format: 'umd',
        name: 'CssAnimationSequencer'
      },
      {
        file: 'dist/css-animation-sequencer.iife.js',
        format: 'iife',
        name: 'CssAnimationSequencer'
      }
    ],
    plugins: [buble()]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/css-animation-sequencer.cjs.min.js',
        format: 'cjs'
      },
      {
        file: 'dist/css-animation-sequencer.esm.min.js',
        format: 'es'
      },
      {
        file: 'dist/css-animation-sequencer.umd.min.js',
        format: 'umd',
        name: 'CssAnimationSequencer'
      },
      {
        file: 'dist/css-animation-sequencer.iife.min.js',
        format: 'iife',
        name: 'CssAnimationSequencer'
      }
    ],
    plugins: [buble(), uglify()]
  }
]
