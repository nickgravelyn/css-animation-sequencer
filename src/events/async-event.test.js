import { AsyncEvent } from './async-event'
import { createMockEventThatDoesntCompleteAutomatically } from '../test/mocks'

test('calls start on child event and calls complete regardless of child completing', () => {
  const child = createMockEventThatDoesntCompleteAutomatically()
  const testObj = new AsyncEvent(child)
  const complete = jest.fn()
  testObj.start(complete)
  expect(child.start).toHaveBeenCalled()
  expect(complete).toHaveBeenCalled()
})

test('throw error if start called again before child completes', () => {
  const child = createMockEventThatDoesntCompleteAutomatically()
  const testObj = new AsyncEvent(child)
  testObj.start(jest.fn())
  expect(() => { testObj.start(jest.fn()) }).toThrow()
})
