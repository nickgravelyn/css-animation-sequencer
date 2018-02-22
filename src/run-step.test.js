import { RunStep } from './run-step'

it('starts the timeline on start and calls the next function', () => {
  const actions = []
  const timeline = {
    play () { actions.push('play') },
  }
  const next = () => actions.push('next')

  const step = new RunStep(timeline)
  step.start(next)

  expect(actions).toEqual(['play', 'next'])
})

it('stops the timeline on stop', () => {
  let stopped = false
  const timeline = {
    stop () { stopped = true },
  }
  const step = new RunStep(timeline)
  step.stop()

  expect(stopped).toEqual(true)
})
