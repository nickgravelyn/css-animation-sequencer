export class DelayEvent {
  constructor (time) {
    this.time = time
  }

  start (complete) {
    setTimeout(complete, this.time)
  }
}
