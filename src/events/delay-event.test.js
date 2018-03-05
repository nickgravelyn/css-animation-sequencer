import { DelayEvent } from './delay-event'

jest.useFakeTimers()

test('calls complete after a timeout', () => {
  const delay = 1237
  const step = new DelayEvent(delay)
  const complete = jest.fn()
  step.start(complete)

  expect(complete).not.toHaveBeenCalled()
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), delay)

  jest.runAllTimers()

  expect(complete).toHaveBeenCalled()
})
