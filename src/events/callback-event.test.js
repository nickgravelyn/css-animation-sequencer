import { CallbackEvent } from './callback-event'

test('it calls the callback and then completes', () => {
  const callback = jest.fn()
  const complete = jest.fn()
  const event = new CallbackEvent(callback)
  event.start(complete)

  expect(callback).toHaveBeenCalled()
  expect(complete).toHaveBeenCalled()
})

test('has a stop method', () => {
  const event = new CallbackEvent(jest.fn())
  expect(event.stop).toBeInstanceOf(Function)
})
