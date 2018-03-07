/**
  An event that simply delays a {@link Timeline} from continuing
*/
export class DelayEvent {
  /**
    Initializes the event.

    @param {Number} time - The time to delay, in seconds.
  */
  constructor (time) {
    this._time = time * 1000
  }

  /** @ignore */
  start (complete) {
    this._timer = setTimeout(complete, this._time)
  }

  /** @ignore */
  stop () {
    if (this._timer) {
      clearTimeout(this._timer)
    }
  }
}
