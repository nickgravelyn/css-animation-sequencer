export class DelayEvent {
  constructor (time) {
    this._time = time
  }

  start (complete) {
    this._timer = setTimeout(complete, this._time)
  }

  stop () {
    if (this._timer) {
      clearTimeout(this._timer)
    }
  }
}
