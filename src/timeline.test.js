import { Timeline } from './timeline'
import { SetStep } from './set-step'
import { TimelineStep } from './timeline-step'
import { PredefinedStep } from './predefined-step'
import { TweenStep } from './tween-step'

it('adds a set step', () => {
  const timeline = new Timeline()
  timeline.set({}, {})
  expect(timeline.steps[0]).toBeInstanceOf(SetStep)
})

it('adds a predefined step when play is called given an element and string', () => {
  const timeline = new Timeline()
  timeline.play({}, 'cat')
  expect(timeline.steps[0]).toBeInstanceOf(PredefinedStep)
})

it('adds a timeline step when play is called given a timeline', () => {
  const timeline = new Timeline()
  timeline.play(new Timeline())
  expect(timeline.steps[0]).toBeInstanceOf(TimelineStep)
})

it('adds a tween step', () => {
  const timeline = new Timeline()
  timeline.tween({}, 10, {})
  expect(timeline.steps[0]).toBeInstanceOf(TweenStep)
})
