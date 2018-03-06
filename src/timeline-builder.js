import { Timeline } from './timeline'
import { CallbackEvent } from './events/callback-event'
import { DelayEvent } from './events/delay-event'
import { CssAnimationEvent } from './events/css-animation-event'
import { SetStyleEvent } from './events/set-style-event'

export class TimelineBuilder {
  constructor () {
    this._events = []
  }

  callback () {
    this._events.push(new CallbackEvent(...arguments))
    return this
  }

  delay () {
    this._events.push(new DelayEvent(...arguments))
    return this
  }

  cssAnimation () {
    this._events.push(new CssAnimationEvent(...arguments))
    return this
  }

  setStyle () {
    this._events.push(new SetStyleEvent(...arguments))
    return this
  }

  buildTimeline () {
    return new Timeline(this._events)
  }
}
