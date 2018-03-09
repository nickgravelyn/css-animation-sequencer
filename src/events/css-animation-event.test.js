import { CssAnimationEvent } from './css-animation-event'

jest.useFakeTimers()

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
  const event = new CssAnimationEvent(elem, 'anim-class')
  event.start(jest.fn())

  expect(elem.event).toEqual('animationend')
  expect(elem.fn).toBeDefined()
  expect(elem.classList.add).toHaveBeenCalledWith('anim-class')
})

test('creates a listener that removes class and listener and completes on next tick', () => {
  const elem = makeFakeElem()
  const event = new CssAnimationEvent(elem, 'anim-class')
  const complete = jest.fn()

  event.start(complete)

  expect(complete).not.toHaveBeenCalled()
  expect(elem.classList.remove).not.toHaveBeenCalled()
  expect(elem.removeEventListener).not.toHaveBeenCalled()

  // Invoke our animationend listener
  elem.fn()

  expect(elem.classList.remove).toHaveBeenCalledWith('anim-class')
  expect(elem.removeEventListener).toHaveBeenCalledWith('animationend', elem.fn)
  expect(complete).not.toHaveBeenCalled()

  jest.advanceTimersByTime(1)

  expect(complete).toHaveBeenCalled()
})

test('removes event listener and class on stop', () => {
  const elem = makeFakeElem()
  const event = new CssAnimationEvent(elem, 'anim-class')

  event.start(jest.fn())
  event.stop()

  expect(elem.removeEventListener).toHaveBeenCalledWith('animationend', elem.fn)
  expect(elem.classList.remove).toHaveBeenCalledWith('anim-class')
})
