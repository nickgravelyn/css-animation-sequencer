import { TweenStep } from './tween-step'

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
  const step = new TweenStep(elem, 1, {})
  step.start(jest.fn())
  expect(elem.addEventListener).toHaveBeenCalledWith('animationend', step.listener)
  expect(elem.classList.add).toHaveBeenCalledWith(step.animation)
})

it('creates a listener that calls stop and next', () => {
  const elem = makeFakeElem()
  const step = new TweenStep(elem, 1, {})
  step.stop = jest.fn()
  const next = jest.fn()
  step.start(next)

  expect(next).not.toHaveBeenCalled()
  expect(step.stop).not.toHaveBeenCalled()
  step.listener()
  expect(next).toHaveBeenCalled()
  expect(step.stop).toHaveBeenCalled()
})

it('removes event listener and class on stop', () => {
  const elem = makeFakeElem()
  const step = new TweenStep(elem, 1, {})
  step.listener = 'some listener'
  step.stop()

  expect(elem.removeEventListener).toHaveBeenCalledWith('animationend', step.listener)
  expect(elem.classList.remove).toHaveBeenCalledWith(step.animation)
})

it('can create good css', () => {
  const step = new TweenStep({}, 1234, { opacity: 0 })
  const css = step.createCss()
  expect(css).toContain(`.${step.animation} {`)
  expect(css).toContain(`animation-name: ${step.animation};`)
  expect(css).toContain('animation-duration: 1.234s;')
  expect(css).toContain('animation-fill-mode: both;')
  expect(css).toContain('animation-timing-function: ease;')
  expect(css).toContain(`@keyframes ${step.animation} { to { opacity: 0; } }`)
})

it('puts easing from an options block into the css', () => {
  const step = new TweenStep({}, 1234, { opacity: 0 }, { timingFunction: 'ease-in-out' })
  const css = step.createCss()
  expect(css).toContain(`animation-timing-function: ease-in-out;`)
})

it('puts fill mode from an options block into the css', () => {
  const step = new TweenStep({}, 1234, { opacity: 0 }, { fillMode: 'forwards' })
  const css = step.createCss()
  expect(css).toContain(`animation-fill-mode: forwards;`)
})
