import { PredefinedStep } from './predefined-step'

function makeFakeElem () {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
  }
}

it('adds event listener and class on start', () => {
  const elem = makeFakeElem()
  const step = new PredefinedStep(elem, 'anim-class')
  step.start(jest.fn())
  expect(elem.addEventListener).toHaveBeenCalledWith('animationend', step.listener)
  expect(elem.classList.add).toHaveBeenCalledWith('anim-class')
})

it('creates a listener that calls stop and next', () => {
  const elem = makeFakeElem()
  const step = new PredefinedStep(elem, 'anim-class')
  step.stop = jest.fn()
  const next = jest.fn()
  step.start(next)

  expect(next).not.toHaveBeenCalled()
  expect(step.stop).not.toHaveBeenCalled()
  step.listener()
  expect(next).toHaveBeenCalled()
  expect(step.stop).toHaveBeenCalled()
})

it('creates a listener that calls stop but calls next immediately if async is true', () => {
  const elem = makeFakeElem()
  const step = new PredefinedStep(elem, 'anim-class', { async: true })
  step.stop = jest.fn()
  const next = jest.fn()
  step.start(next)

  expect(next).toHaveBeenCalled()
  expect(step.stop).not.toHaveBeenCalled()
  step.listener()
  expect(step.stop).toHaveBeenCalled()
})

it('removes event listener and class on stop', () => {
  const elem = makeFakeElem()
  const step = new PredefinedStep(elem, 'anim-class')
  step.listener = 'some listener'
  step.stop()

  expect(elem.removeEventListener).toHaveBeenCalledWith('animationend', step.listener)
  expect(elem.classList.remove).toHaveBeenCalledWith('anim-class')
})
