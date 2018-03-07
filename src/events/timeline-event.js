/**
  An event that runs a {@link Timeline}.
*/
export class TimelineEvent {
  /**
    Initializes the event.

    @param {Timeline} timeline - The timeline to run.
  */
  constructor (timeline) {
    this._timeline = timeline
  }

  /** @ignore */
  start (complete) {
    this._timeline.start({ onComplete: complete })
  }

  /** @ignore */
  stop () {
    this._timeline.stop()
  }
}
