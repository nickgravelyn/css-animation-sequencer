import { DelayEvent } from './delay-event'

jest.useFakeTimers()

test('calls complete after a timeout', () => {
  const step = new DelayEvent(1.23)
  const complete = jest.fn()
  step.start(complete)

  expect(complete).not.toHaveBeenCalled()
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1230)

  jest.runAllTimers()
  expect(complete).toHaveBeenCalled()
})

test('stop unregisters the callback', () => {
  const step = new DelayEvent(4.93)
  const complete = jest.fn()
  step.start(complete)
  step.stop()

  jest.runAllTimers()

  expect(complete).not.toHaveBeenCalled()
})
