import { Timeline } from './timeline'
import { SetStep } from './set-step'
import { DelayStep } from './delay-step'
import { TimelineStep } from './timeline-step'
import { PredefinedStep } from './predefined-step'
import { TweenStep } from './tween-step'

it('adds a set step and returns self', () => {
  const timeline = new Timeline()
  const returned = timeline.set({}, {})
  expect(timeline.steps[0]).toBeInstanceOf(SetStep)
  expect(returned).toBe(timeline)
})

it('adds a delay step and returns self', () => {
  const timeline = new Timeline()
  const returned = timeline.delay(1234)
  expect(timeline.steps[0]).toBeInstanceOf(DelayStep)
  expect(returned).toBe(timeline)
})

it('adds a predefined step when play is called given an element and string', () => {
  const timeline = new Timeline()
  const returned = timeline.play({}, 'cat')
  expect(timeline.steps[0]).toBeInstanceOf(PredefinedStep)
  expect(returned).toBe(timeline)
})

it('adds a timeline step when play is called given a timeline', () => {
  const timeline = new Timeline()
  const returned = timeline.play(new Timeline())
  expect(timeline.steps[0]).toBeInstanceOf(TimelineStep)
  expect(returned).toBe(timeline)
})

it('adds a tween step', () => {
  const timeline = new Timeline()
  const returned = timeline.tween({}, 10, {})
  expect(timeline.steps[0]).toBeInstanceOf(TweenStep)
  expect(returned).toBe(timeline)
})
