import {
  Timeline,
  TimelineBuilder,
  CallbackEvent,
  DelayEvent,
} from '.'

test('build returns a timeline when built', () => {
  const builder = new TimelineBuilder()
  expect(builder.build()).toBeInstanceOf(Timeline)
})

test('can add a callback event', () => {
  const callback = jest.fn()
  const timeline = new TimelineBuilder()
    .addCallback(callback)
    .build()

  expect(timeline._events[0]).toBeInstanceOf(CallbackEvent)
  expect(timeline._events[0]._callback).toBe(callback)
})

test('can add a delay event', () => {
  const timeline = new TimelineBuilder()
    .addDelay(213)
    .build()

  expect(timeline._events[0]).toBeInstanceOf(DelayEvent)
  expect(timeline._events[0]._time).toBe(213)
})
