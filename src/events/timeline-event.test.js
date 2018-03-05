import { TimelineEvent } from './timeline-event'

test('starts the timeline on start', () => {
  const timeline = { start: jest.fn() }
  const next = jest.fn()
  const step = new TimelineEvent(timeline)
  step.start(next)

  expect(timeline.start).toHaveBeenCalled()
  expect(next).not.toHaveBeenCalled()
})

test('calls next when the timeline is complete', () => {
  let onComplete
  const timeline = {
    start (options) { onComplete = options.onComplete },
  }
  const next = jest.fn()
  const step = new TimelineEvent(timeline)
  step.start(next)

  expect(next).not.toHaveBeenCalled()
  onComplete()
  expect(next).toHaveBeenCalled()
})

test('stops the timeline on stop', () => {
  const timeline = { stop: jest.fn() }
  const step = new TimelineEvent(timeline)
  step.stop()
  expect(timeline.stop).toHaveBeenCalled()
})
