export class RunStep {
  constructor (timeline) {
    this._timeline = timeline
  }

  start (next) {
    this._timeline.start()
    next()
  }

  stop () {
    this._timeline.stop()
  }
}
