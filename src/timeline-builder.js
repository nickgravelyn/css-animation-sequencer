import {
  Timeline,
  CallbackEvent,
  DelayEvent,
} from '.'

export class TimelineBuilder {
  constructor () {
    this._events = []
  }

  addCallback (fn) {
    this._events.push(new CallbackEvent(fn))
    return this
  }

  addDelay (time) {
    this._events.push(new DelayEvent(time))
    return this
  }

  build () {
    return new Timeline(this._events)
  }
}
