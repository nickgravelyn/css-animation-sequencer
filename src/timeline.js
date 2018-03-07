import { CallbackEvent } from './events/callback-event'
import { ConcurrentEvent } from './events/concurrent-event'
import { CssAnimationEvent } from './events/css-animation-event'
import { DelayEvent } from './events/delay-event'
import { SetStyleEvent } from './events/set-style-event'
import { TimelineEvent } from './events/timeline-event'

export class Timeline {
  constructor () {
    this._events = []
    this._playing = false
    this._startNext = this._startNext.bind(this)
  }

  add (event) {
    this._events.push(event)
    return this
  }

  addCallback () {
    this.add(new CallbackEvent(...arguments))
    return this
  }

  addConcurrent () {
    this.add(new ConcurrentEvent(...arguments))
    return this
  }

  addCssAnimation () {
    this.add(new CssAnimationEvent(...arguments))
    return this
  }

  addDelay () {
    this.add(new DelayEvent(...arguments))
    return this
  }

  addSetStyle () {
    this.add(new SetStyleEvent(...arguments))
    return this
  }

  addTimeline () {
    this.add(new TimelineEvent(...arguments))
    return this
  }

  start ({ iterations = 1, onComplete = null } = {}) {
    this._playing = true
    this._current = -1
    this._iterations = iterations
    this._onComplete = onComplete
    this._startNext()
  }

  stop () {
    if (!this._playing) {
      return
    }
    this._events[this._current].stop()
  }

  _startNext () {
    this._current++

    if (this._current >= this._events.length) {
      if (this._iterations <= 1) {
        this._playing = false
        if (this._onComplete) {
          this._onComplete()
        }
        return
      }

      this._iterations--
      this._current = 0
    }

    this._events[this._current].start(this._startNext)
  }
}
