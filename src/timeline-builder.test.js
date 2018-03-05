import { TimelineBuilder } from './timeline-builder'
import { Timeline } from './timeline'

test('build returns a timeline when built', () => {
  const builder = new TimelineBuilder()
  expect(builder.build()).toBeInstanceOf(Timeline)
})
