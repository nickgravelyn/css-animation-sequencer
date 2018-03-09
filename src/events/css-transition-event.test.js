import { CssTransitionEvent } from './css-transition-event'

jest.useFakeTimers()

const makeFakeElem = () => ({
  addEventListener (event, fn) {
    this.event = event
    this.fn = fn
  },
  removeEventListener: jest.fn(),
  style: {
    opacity: 0,
    removeProperty: jest.fn(),
  },
})

test('start has timeout on next tick to set the transition property and change state to the new style', () => {
  const elem = makeFakeElem()
  const event = new CssTransitionEvent(elem, 1.23, { opacity: 1 })

  event.start(jest.fn())

  jest.advanceTimersByTime(1)

  expect(elem.style.opacity).toEqual(1)
  expect(elem.style.transition).toEqual('opacity 1.23s')
})

test('start adds listener for transitionend', () => {
  const elem = makeFakeElem()
  const event = new CssTransitionEvent(elem, 1.23, { opacity: 1 })

  event.start(jest.fn())

  expect(elem.event).toEqual('transitionend')
  expect(elem.fn).toBeDefined()
})

test('creates a listener that removes transition style, removes listener, and completes on next tick', () => {
  const elem = makeFakeElem()
  const event = new CssTransitionEvent(elem, 1.23, { opacity: 1 })
  const complete = jest.fn()

  event.start(complete)

  jest.advanceTimersByTime(1)

  expect(complete).not.toHaveBeenCalled()
  expect(elem.removeEventListener).not.toHaveBeenCalled()

  // Invoke our transitionend listener
  elem.fn()

  expect(elem.style.opacity).toEqual(1)
  expect(elem.style.removeProperty).toHaveBeenCalledWith('transition')
  expect(elem.removeEventListener).toHaveBeenCalledWith('transitionend', elem.fn)

  expect(complete).not.toHaveBeenCalled()

  jest.advanceTimersByTime(1)

  expect(complete).toHaveBeenCalled()
})
