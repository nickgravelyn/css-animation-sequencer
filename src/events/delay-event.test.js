import { DelayEvent } from './delay-event'

jest.useFakeTimers()

test('calls complete after a timeout', () => {
  const step = new DelayEvent(4132134)
  const complete = jest.fn()
  step.start(complete)

  expect(complete).not.toHaveBeenCalled()
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4132134)

  jest.runAllTimers()

  expect(complete).toHaveBeenCalled()
})

test('stop unregisters the callback', () => {
  const step = new DelayEvent(123)
  const complete = jest.fn()
  step.start(complete)
  step.stop()

  jest.runAllTimers()

  expect(complete).not.toHaveBeenCalled()
})
