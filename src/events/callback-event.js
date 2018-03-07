/**
  An event that invokes a function when started
*/
export class CallbackEvent {
  /**
    Initializes the event.

    @param {Function} callback - The function to invoke when the event starts.
  */
  constructor (callback) {
    this._callback = callback
  }

  /** @ignore */
  start (complete) {
    this._callback()
    complete()
  }

  /** @ignore */
  stop () {
  }
}
