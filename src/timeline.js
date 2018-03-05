class AsyncDecorator {
  constructor (event) {
    this._event = event
    this._complete = () => { this._inProgress = false }
  }

  start (startNext) {
    if (this._inProgress) {
      throw new Error('Async event started a new iteration before the previous completed')
    }
    this._inProgress = true
    this._event.start(this._complete)
    startNext()
  }
}

export class Timeline {
  constructor () {
    this._events = []
    this._playing = false
    this._startNext = this._startNext.bind(this)
  }

  add (event, { async = false } = {}) {
    if (async) {
      this._events.push(new AsyncDecorator(event))
    } else {
      this._events.push(event)
    }
  }

  start ({ iterations = 1 } = {}) {
    this._playing = true
    this._current = -1
    this._iterations = iterations
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
        return
      }

      this._iterations--
      this._current = 0
    }

    this._events[this._current].start(this._startNext)
  }
}
