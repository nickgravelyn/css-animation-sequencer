import { Timeline } from './timeline'
import {
  createMockEvent,
  createMockEventThatDoesntCompleteAutomatically,
} from './test/mocks'

test('first event has start called when timeline is started', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.start()

  expect(event.start).toHaveBeenCalled()
})

test('second event starts after first event completes', () => {
  const timeline = new Timeline()
  const event1 = createMockEventThatDoesntCompleteAutomatically()
  const event2 = createMockEvent()
  timeline.add(event1)
  timeline.add(event2)

  timeline.start()

  expect(event2.start).not.toHaveBeenCalled()

  event1.complete()

  expect(event2.start).toHaveBeenCalled()
})

test('loops the correct number of iterations', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.start({ iterations: 4 })

  expect(event.start).toHaveBeenCalledTimes(4)
})

test('calls stop on all events when stopped', () => {
  const timeline = new Timeline()
  const event1 = createMockEvent()
  const event2 = createMockEventThatDoesntCompleteAutomatically()
  timeline.add(event1)
  timeline.add(event2)

  timeline.start()

  timeline.stop()

  expect(event1.stop).toHaveBeenCalled()
  expect(event2.stop).toHaveBeenCalled()
})

test('does not call stop if start not called', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.stop()
  expect(event.stop).not.toHaveBeenCalled()
})

test('does not call stop if timeline is complete', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.start()
  timeline.stop()
  expect(event.stop).not.toHaveBeenCalled()
})

test('invokes complete callback when done', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)

  const complete = jest.fn()
  timeline.start({ onComplete: complete })
  expect(complete).toHaveBeenCalled()
})
