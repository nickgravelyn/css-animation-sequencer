export class TimelineStep {
  constructor (timeline, options) {
    this.timeline = timeline
    this.options = options || {}
  }

  start (next) {
    if (this.options.async === true) {
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
