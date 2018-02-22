import { TimelineStep } from './timeline-step'

it('starts the timeline on start', () => {
  const timeline = { start: jest.fn() }
  const next = jest.fn()
  const step = new TimelineStep(timeline)
  step.start(next)

  expect(timeline.start).toHaveBeenCalled()
  expect(next).not.toHaveBeenCalled()
})

it('calls next when the timeline is complete', () => {
  let onComplete
  const timeline = {
    start (options) { onComplete = options.onComplete },
  }
  const next = jest.fn()
  const step = new TimelineStep(timeline)
  step.start(next)

  expect(next).not.toHaveBeenCalled()
  onComplete()
  expect(next).toHaveBeenCalled()
})

it('calls next immediately if timeline step option async is true', () => {
  const timeline = { start: jest.fn() }
  const next = jest.fn()
  const step = new TimelineStep(timeline, { async: true })
  step.start(next)
  expect(timeline.start).toHaveBeenCalled()
  expect(next).toHaveBeenCalled()
})

it('stops the timeline on stop', () => {
  const timeline = { stop: jest.fn() }
  const step = new TimelineStep(timeline)
  step.stop()
  expect(timeline.stop).toHaveBeenCalled()
})
