import { SetStyleEvent } from './set-style-event'

test('sets style fields and completes', () => {
  const element = { style: { opacity: 0.5 } }
  const newStyle = { left: '50px', top: '20px' }
  const event = new SetStyleEvent(element, newStyle)
  const complete = jest.fn()
  event.start(complete)

  expect(element.style).toEqual({ opacity: 0.5, left: '50px', top: '20px' })
  expect(complete).toHaveBeenCalled()
})

it('has a stop method', () => {
  const event = new SetStyleEvent({}, {})
  expect(event.stop).toBeInstanceOf(Function)
})
