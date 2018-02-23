export class DelayStep {
  constructor (time) {
    this.time = time
  }

  start (next) {
    setTimeout(next, this.time)
  }
}
