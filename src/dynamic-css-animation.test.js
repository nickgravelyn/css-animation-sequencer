import { DynamicCssAnimation } from './dynamic-css-animation'

test('can get animation name', () => {
  const animation = new DynamicCssAnimation()
  expect(animation.name).toContain('seashell-')
})

test('animation names are unique', () => {
  const animation1 = new DynamicCssAnimation()
  const animation2 = new DynamicCssAnimation()
  expect(animation1.name).not.toEqual(animation2.name)
})

test('can create blank CSS', () => {
  const animation = new DynamicCssAnimation()
  const name = animation.name
  const css = animation.generateCss()
  expect(css).toEqual(
    `.${name} {
  animation-delay: 0s;
  animation-direction: normal;
  animation-duration: 0s;
  animation-fill-mode: none;
  animation-iteration-count: 1;
  animation-name: ${name};
  animation-timing-function: ease;
}
@keyframes ${name} {
}`)
})

test('can set delay', () => {
  const animation = new DynamicCssAnimation()
  animation.delay = 1.5
  expect(animation.generateCss()).toContain('animation-delay: 1.5s')
})

test('can set direction', () => {
  const animation = new DynamicCssAnimation()
  animation.direction = 'reverse'
  expect(animation.generateCss()).toContain('animation-direction: reverse')
})

test('can set fill mode', () => {
  const animation = new DynamicCssAnimation()
  animation.fillMode = 'both'
  expect(animation.generateCss()).toContain('animation-fill-mode: both')
})

test('can set timing function', () => {
  const animation = new DynamicCssAnimation()
  animation.timingFunction = 'ease-in-out'
  expect(animation.generateCss()).toContain('animation-timing-function: ease-in-out')
})

test('can set iteration count', () => {
  const animation = new DynamicCssAnimation()
  animation.iterationCount = '15'
  expect(animation.generateCss()).toContain('animation-iteration-count: 15')
})
