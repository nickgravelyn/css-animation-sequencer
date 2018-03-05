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

    for (const c of this._children) {
      c.start(childComplete)
    }
  }

  stop () {
    for (const c of this._children) {
      c.stop()
    }
  }
}
