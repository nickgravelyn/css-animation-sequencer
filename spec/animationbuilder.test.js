import { AnimationBuilder } from '../src'

test('it makes css class for animation', () => {
  const testObj = new AnimationBuilder('anim', {})
  const css = testObj.buildCss()

  const expectedCss = '.anim { animation-name: anim; animation-duration: 0s; animation-fill-mode: both; }'
  expect(css).toContain(expectedCss)
})

test('it sets the duration of the animation based on the durations added', () => {
  const testObj = new AnimationBuilder('anim', {})
  testObj.to(200, {})
  testObj.to(300, {})
  testObj.to(20, {})

  const css = testObj.buildCss()
  const expectedCss = 'animation-duration: 0.52s'
  expect(css).toContain(expectedCss)
})

test('it makes keyframes for animation', () => {
  const testObj = new AnimationBuilder('anim', {})
  const css = testObj.buildCss()

  const expectedCss = '@keyframes anim { 0% { } }'
  expect(css).toContain(expectedCss)
})

test('puts the initial state values into the 0% keyframe', () => {
  const testObj = new AnimationBuilder('anim', {
    left: '50px',
    color: 'red',
  })
  const css = testObj.buildCss()

  const expectedCss = '0% { left: 50px; color: red; }'
  expect(css).toContain(expectedCss)
})

test('it creates correctly proportioned keyframes for keyframes', () => {
  const testObj = new AnimationBuilder('anim', { left: '0px' })
  testObj.to(100, { left: '10px' })
  testObj.to(200, { left: '20px' })
  testObj.to(100, { left: '30px' })

  const css = testObj.buildCss()
  expect(css).toContain('0% { left: 0px; }')
  expect(css).toContain('25% { left: 10px; }')
  expect(css).toContain('75% { left: 20px; }')
  expect(css).toContain('100% { left: 30px; }')
})
