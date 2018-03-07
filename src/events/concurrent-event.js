/**
  An event that concurrently starts any number of children.

  This event is used to have simultaneous animations or timelines. All
  children of the event are started when the event are started, and the
  event doesn't complete until all children have completed.
*/
export class ConcurrentEvent {
  /**
    Initializes the event.

    @param {Array<Object>} ...children - The events to run concurrently.
  */
  constructor (...children) {
    this._children = children
  }

  /** @ignore */
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

  /** @ignore */
  stop () {
    for (let i = 0, len = this._children.length; i < len; ++i) {
      this._children[i].stop()
    }
  }
}
