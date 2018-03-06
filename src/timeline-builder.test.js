import { TimelineBuilder } from './timeline-builder'
import { Timeline } from './timeline'
import { CallbackEvent } from './events/callback-event'
import { DelayEvent } from './events/delay-event'
import { CssAnimationEvent } from './events/css-animation-event'
import { SetStyleEvent } from './events/set-style-event'

jest.mock('./timeline')
jest.mock('./events/callback-event')
jest.mock('./events/delay-event')
jest.mock('./events/css-animation-event')
jest.mock('./events/set-style-event')

beforeEach(() => {
  Timeline.mockClear()
  CallbackEvent.mockClear()
  DelayEvent.mockClear()
  CssAnimationEvent.mockClear()
  SetStyleEvent.mockClear()
})

test('buildTimeline returns a timeline when built', () => {
  const builder = new TimelineBuilder()
  expect(builder.buildTimeline()).toBeInstanceOf(Timeline)
})

test('can add a callback event', () => {
  const callback = jest.fn()
  new TimelineBuilder().callback(callback).buildTimeline()

  expect(Timeline).toHaveBeenCalledWith([CallbackEvent.mock.instances[0]])
  expect(CallbackEvent).toHaveBeenCalledWith(callback)
})

test('can add a delay event', () => {
  new TimelineBuilder().delay(213).buildTimeline()

  expect(Timeline).toHaveBeenCalledWith([DelayEvent.mock.instances[0]])
  expect(DelayEvent).toHaveBeenCalledWith(213)
})

test('can add a css animation event', () => {
  const elem = {}
  new TimelineBuilder().cssAnimation(elem, 'my-cool-animation').buildTimeline()

  expect(Timeline).toHaveBeenCalledWith([CssAnimationEvent.mock.instances[0]])
  expect(CssAnimationEvent).toHaveBeenCalledWith(elem, 'my-cool-animation')
})

test('can add a set style event', () => {
  const elem = {}
  const style = {}
  new TimelineBuilder().setStyle(elem, style).buildTimeline()

  expect(Timeline).toHaveBeenCalledWith([SetStyleEvent.mock.instances[0]])
  expect(SetStyleEvent).toHaveBeenCalledWith(elem, style)
})
