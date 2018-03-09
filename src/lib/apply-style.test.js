import { applyStyle } from './apply-style'

test('sets style fields of an element', () => {
  const element = { style: { opacity: 0.5 } }
  const newStyle = { left: '50px', top: '20px' }
  applyStyle(element, newStyle)
  expect(element.style).toEqual({ opacity: 0.5, left: '50px', top: '20px' })
})
