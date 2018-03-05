import { Timeline } from './timeline'

const createMockEvent = (startImpl) => {
  if (!startImpl) {
    startImpl = next => { next() }
  }
  return {
    start: jest.fn().mockImplementation(startImpl),
    stop: jest.fn(),
  }
}

const createMockEventThatDoesntCallNext = () => {
  return createMockEvent(function (next) { this.next = next })
}

test('first event has start called when timeline is started', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.start()

  expect(event.start).toHaveBeenCalled()
})

test('second event has start called after first event calls the next fn passed to it', () => {
  const timeline = new Timeline()
  const event1 = createMockEventThatDoesntCallNext()
  const event2 = createMockEvent()
  timeline.add(event1)
  timeline.add(event2)

  timeline.start()

  expect(event2.start).not.toHaveBeenCalled()

  event1.next()

  expect(event2.start).toHaveBeenCalled()
})

test('loops the correct number of iterations', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.start({ iterations: 4 })

  expect(event.start).toHaveBeenCalledTimes(4)
})

test('calls stop on the current event when stopped', () => {
  const timeline = new Timeline()
  const event1 = createMockEvent()
  const event2 = createMockEventThatDoesntCallNext()
  timeline.add(event1)
  timeline.add(event2)

  timeline.start()

  timeline.stop()

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
