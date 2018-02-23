import { DelayStep } from './delay-step'

jest.useFakeTimers()

it('calls next after a timeout', () => {
  const delay = 1237
  const step = new DelayStep(delay)
  const next = jest.fn()
  step.start(next)

  expect(next).not.toHaveBeenCalled()
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), delay)

  jest.runAllTimers()

  expect(next).toHaveBeenCalled()
})
