export class TimelineEvent {
  constructor (timeline) {
    this._timeline = timeline
  }

  start (complete) {
    this._timeline.start({ onComplete: complete })
  }

  stop () {
    this._timeline.stop()
  }
}
