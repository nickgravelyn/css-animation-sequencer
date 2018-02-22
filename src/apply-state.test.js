import applyState from './apply-state'

it('copies key/values from the state onto the style block of the element', () => {
  const element = { style: { b: 'dog', c: true } }
  const state = { a: 5, b: 'cat' }
  applyState(element, state)
  expect(element).toEqual({ style: { a: 5, b: 'cat', c: true } })
})
