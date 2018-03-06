export class CallbackEvent {
  constructor (callback) {
    this._callback = callback
  }

  start (complete) {
    this._callback()
    complete()
  }

  stop () {
  }
}
