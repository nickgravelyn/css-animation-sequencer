export class TimelineStep {
  constructor (timeline, { async } = { async: false }) {
    this.timeline = timeline
    this.async = async
  }

  start (next) {
    if (this.async === true) {
      this.timeline.start()
      next()
    } else {
      this.timeline.start({ onComplete: next })
    }
  }

  stop () {
    this.timeline.stop()
  }

  createCss () {
    return this.timeline.createCss()
  }
}
