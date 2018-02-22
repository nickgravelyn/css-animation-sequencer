import { SetStep } from './set-step'

it('applies state and calls next on start', () => {
  const element = { style: { c: true } }
  const state = { a: 5, b: 'cat' }

  let calledNext = false
  const next = () => { calledNext = true }

  const step = new SetStep(element, state)
  step.start(next)

  expect(element).toEqual({ style: { a: 5, b: 'cat', c: true } })
  expect(calledNext).toEqual(true)
})
