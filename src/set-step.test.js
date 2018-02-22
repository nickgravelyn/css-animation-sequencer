import { SetStep } from './set-step'

it('applies state and calls next on start', () => {
  const element = { style: { } }
  const state = { a: 5 }

  let calledNext = false
  const next = () => { calledNext = true }

  const step = new SetStep(element, state)
  step.start(next)

  expect(element).toEqual({ style: { a: 5 } })
  expect(calledNext).toEqual(true)
})
