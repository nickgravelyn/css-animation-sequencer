import { Timeline } from './timeline'
import {
  createMockEvent,
  createMockEventThatDoesntCompleteAutomatically,
} from './test/mocks'

import { CallbackEvent } from './events/callback-event'
import { ConcurrentEvent } from './events/concurrent-event'
import { CssAnimationEvent } from './events/css-animation-event'
import { DelayEvent } from './events/delay-event'
import { SetStyleEvent } from './events/set-style-event'
import { TimelineEvent } from './events/timeline-event'

jest.mock('./events/callback-event')
jest.mock('./events/concurrent-event')
jest.mock('./events/css-animation-event')
jest.mock('./events/delay-event')
jest.mock('./events/set-style-event')
jest.mock('./events/timeline-event')

beforeEach(() => {
  CallbackEvent.mockClear()
  ConcurrentEvent.mockClear()
  CssAnimationEvent.mockClear()
  DelayEvent.mockClear()
  SetStyleEvent.mockClear()
  TimelineEvent.mockClear()
})

test('can add a callback event', () => {
  const timeline = new Timeline()
  timeline.add = jest.fn()

  const callback = jest.fn()
  const returned = timeline.addCallback(callback)

  expect(returned).toBe(timeline)
  expect(timeline.add).toHaveBeenCalled()
  expect(timeline.add.mock.calls[0][0]).toBeInstanceOf(CallbackEvent)
  expect(CallbackEvent).toHaveBeenCalledWith(callback)
})

test('can add a concurrent event', () => {
  const timeline = new Timeline()
  timeline.add = jest.fn()

  const event1 = createMockEvent()
  const event2 = createMockEvent()
  const returned = timeline.addConcurrent(event1, event2)

  expect(returned).toBe(timeline)
  expect(timeline.add).toHaveBeenCalled()
  expect(timeline.add.mock.calls[0][0]).toBeInstanceOf(ConcurrentEvent)
  expect(ConcurrentEvent).toHaveBeenCalledWith(event1, event2)
})

test('can add a css animation event', () => {
  const timeline = new Timeline()
  timeline.add = jest.fn()

  const elem = {}
  const animClass = 'some-animation'
  const returned = timeline.addCssAnimation(elem, animClass)

  expect(returned).toBe(timeline)
  expect(timeline.add).toHaveBeenCalled()
  expect(timeline.add.mock.calls[0][0]).toBeInstanceOf(CssAnimationEvent)
  expect(CssAnimationEvent).toHaveBeenCalledWith(elem, animClass)
})

test('can add a delay event', () => {
  const timeline = new Timeline()
  timeline.add = jest.fn()

  const returned = timeline.addDelay(123)

  expect(returned).toBe(timeline)
  expect(timeline.add).toHaveBeenCalled()
  expect(timeline.add.mock.calls[0][0]).toBeInstanceOf(DelayEvent)
  expect(DelayEvent).toHaveBeenCalledWith(123)
})

test('can add a set style event', () => {
  const timeline = new Timeline()
  timeline.add = jest.fn()

  const elem = {}
  const style = {}
  const returned = timeline.addSetStyle(elem, style)

  expect(returned).toBe(timeline)
  expect(timeline.add).toHaveBeenCalled()
  expect(timeline.add.mock.calls[0][0]).toBeInstanceOf(SetStyleEvent)
  expect(SetStyleEvent).toHaveBeenCalledWith(elem, style)
})

test('can add a timeline event', () => {
  const timeline = new Timeline()
  timeline.add = jest.fn()

  const otherTimeline = new Timeline()
  const returned = timeline.addTimeline(otherTimeline)

  expect(returned).toBe(timeline)
  expect(timeline.add).toHaveBeenCalled()
  expect(timeline.add.mock.calls[0][0]).toBeInstanceOf(TimelineEvent)
  expect(TimelineEvent).toHaveBeenCalledWith(otherTimeline)
})

test('first event has start called when timeline is started', () => {
  const timeline = new Timeline()
  const event = createMockEvent()
  timeline.add(event)
  timeline.start()

  expect(event.start).toHaveBeenCalled()
})

test('returns self from add for chaining', () => {
  const timeline = new Timeline()
  const returned = timeline.add(createMockEvent())
  expect(returned).toBe(timeline)
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

test('calls stop on the current event when stopped', () => {
  const timeline = new Timeline()
  const event1 = createMockEvent()
  const event2 = createMockEventThatDoesntCompleteAutomatically()
  timeline.add(event1)
  timeline.add(event2)

  timeline.start()

  timeline.stop()

  expect(event1.stop).not.toHaveBeenCalled()
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
