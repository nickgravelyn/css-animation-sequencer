export class Timeline {
  constructor (events = []) {
    this._events = events.slice(0)
    this._playing = false
    this._startNext = this._startNext.bind(this)
  }

  add (event) {
    this._events.push(event)
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
