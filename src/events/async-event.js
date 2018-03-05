function setNotInProgress () {
  this._inProgress = false
}

export class AsyncEvent {
  constructor (event) {
    this._event = event
    this._setNotInProgress = setNotInProgress.bind(this)
  }

  start (complete) {
    if (this._inProgress) {
      throw new Error('Async event started a new iteration before the previous completed')
    }
    this._inProgress = true
    this._event.start(this._setNotInProgress)
    complete()
  }
}
