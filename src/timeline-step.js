export class TimelineStep {
  constructor (timeline) {
    this.timeline = timeline
  }

  start (next) {
    this.timeline.start()
    next()
  }

  stop () {
    this.timeline.stop()
  }

  createCss () {
    return this.timeline.createCss()
  }
}
