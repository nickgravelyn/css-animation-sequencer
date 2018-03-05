import { ConcurrentEvent } from './concurrent-event'
import { createMockEventThatDoesntCompleteAutomatically } from '../test/mocks'

test('calls start on children on start and complete when children complete', () => {
  const child1 = createMockEventThatDoesntCompleteAutomatically()
  const child2 = createMockEventThatDoesntCompleteAutomatically()
  const testObj = new ConcurrentEvent(child1, child2)
  const complete = jest.fn()

  testObj.start(complete)

  expect(child1.start).toHaveBeenCalled()
  expect(child2.start).toHaveBeenCalled()
  expect(complete).not.toHaveBeenCalled()

  child1.complete()

  expect(complete).not.toHaveBeenCalled()

  child2.complete()

  expect(complete).toHaveBeenCalled()
})

test('calls stop on children when stopped', () => {
  const child1 = createMockEventThatDoesntCompleteAutomatically()
  const child2 = createMockEventThatDoesntCompleteAutomatically()
  const testObj = new ConcurrentEvent(child1, child2)

  testObj.start(jest.fn())

  testObj.stop()

  expect(child1.stop).toHaveBeenCalled()
  expect(child2.stop).toHaveBeenCalled()
})
