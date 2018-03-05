import { CssAnimationEvent } from './css-animation-event'

function makeFakeElem () {
  return {
    addEventListener (event, fn) {
      this.event = event
      this.fn = fn
    },
    removeEventListener: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
  }
}

test('adds event listener and class on start', () => {
  const elem = makeFakeElem()
  const step = new CssAnimationEvent(elem, 'anim-class')
  step.start(jest.fn())

  expect(elem.event).toBe('animationend')
  expect(elem.fn).toBeDefined()
  expect(elem.classList.add).toHaveBeenCalledWith('anim-class')
})

test('creates a listener that removes class and listener and calls next', () => {
  const elem = makeFakeElem()
  const step = new CssAnimationEvent(elem, 'anim-class')
  const next = jest.fn()

  step.start(next)

  expect(next).not.toHaveBeenCalled()
  expect(elem.classList.remove).not.toHaveBeenCalled()
  expect(elem.removeEventListener).not.toHaveBeenCalled()

  // Invoke our animationend listener
  elem.fn()

  expect(next).toHaveBeenCalled()
  expect(elem.classList.remove).toHaveBeenCalledWith('anim-class')
  expect(elem.removeEventListener).toHaveBeenCalledWith('animationend', elem.fn)
})

test('removes event listener and class on stop', () => {
  const elem = makeFakeElem()
  const step = new CssAnimationEvent(elem, 'anim-class')

  step.start(jest.fn())
  step.stop()

  expect(elem.removeEventListener).toHaveBeenCalledWith('animationend', elem.fn)
  expect(elem.classList.remove).toHaveBeenCalledWith('anim-class')
})
