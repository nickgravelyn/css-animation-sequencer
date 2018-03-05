export class ConcurrentEvent {
  constructor (...children) {
    this._children = children
  }

  start (complete) {
    let runningCount = this._children.length
    const childComplete = () => {
      runningCount--
      if (runningCount === 0) {
        complete()
      }
    }

    for (let i = 0; i < this._children.length; ++i) {
      this._children[i].start(childComplete)
    }
  }

  stop () {
    for (let i = 0; i < this._children.length; ++i) {
      this._children[i].stop()
    }
  }
}
