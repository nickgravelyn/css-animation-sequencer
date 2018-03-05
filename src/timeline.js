export class Timeline {
  constructor () {
    this.events = []
    this.playing = false
    this.startNext = this.startNext.bind(this)
  }

  add (event) {
    this.events.push(event)
  }

  start ({ iterations = 1 } = {}) {
    this.playing = true
    this.current = -1
    this.iterations = iterations
    this.startNext()
  }

  stop () {
    if (!this.playing) {
      return
    }
    this.events[this.current].stop()
  }

  startNext () {
    this.current++

    if (this.current >= this.events.length) {
      if (this.iterations <= 1) {
        this.playing = false
        return
      }

      this.iterations--
      this.current = 0
    }

    this.events[this.current].start(this.startNext)
  }
}
