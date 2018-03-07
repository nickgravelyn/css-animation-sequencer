export class ConcurrentEvent {
  constructor (...children) {
    this._children = children
  }

  start (complete) {
    const len = this._children.length
    let runningCount = len
    const childComplete = () => {
      runningCount--
      if (runningCount === 0) {
        complete()
      }
    }

    for (let i = 0; i < len; ++i) {
      this._children[i].start(childComplete)
    }
  }

  stop () {
    for (let i = 0, len = this._children.length; i < len; ++i) {
      this._children[i].stop()
    }
  }
}
