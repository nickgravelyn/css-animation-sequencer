import { TimelineBuilder } from './timeline-builder'
import { Timeline } from './timeline'

it('returns a timeline when built', () => {
  const builder = new TimelineBuilder()
  expect(builder.build()).toBeInstanceOf(Timeline)
})
