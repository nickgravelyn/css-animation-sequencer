import { SetStep } from './set-step'

it('applies state on start', () => {
  const element = { style: { } }
  const state = { a: 5 }

  const step = new SetStep(element, state)
  step.start(() => {})
  expect(element).toEqual({ style: { a: 5 } })
})

it('calls next on start', () => {
  const step = new SetStep({}, {})
  const next = jest.fn()
  step.start(next)
  expect(next).toHaveBeenCalled()
})
