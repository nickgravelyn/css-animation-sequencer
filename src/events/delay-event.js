export class DelayEvent {
  constructor (time) {
    this._time = time
  }

  start (complete) {
    setTimeout(complete, this._time)
  }
}
