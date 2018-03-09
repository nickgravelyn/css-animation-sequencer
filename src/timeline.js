import { CallbackEvent } from './events/callback-event'
import { ConcurrentEvent } from './events/concurrent-event'
import { CssAnimationEvent } from './events/css-animation-event'
import { CssTransitionEvent } from './events/css-transition-event'
import { DelayEvent } from './events/delay-event'
import { SetStyleEvent } from './events/set-style-event'
import { TimelineEvent } from './events/timeline-event'

/**
  Coordinating object that holds a list of events that are
  played sequentially to create animations.
*/
export class Timeline {
  /**
    Initializes a new Timeline.
  */
  constructor () {
    this._events = []
    this._playing = false
    this._startNext = this._startNext.bind(this)
  }

  /**
    Adds an event to the timeline.

    An event is any object that implements a basic interface consisting
    of `start` and `stop` methods. `start` is called with a completion
    callback function that the event must call when completion is reached.
    `stop` should stop any asynchronous work for the event and should **not**
    invoke the complete method passed into `start`.

    @param {Object} event - The event to add to the timeline
    @return {Timeline} The timeline, to support call chaining.
  */
  add (event) {
    this._events.push(event)
    return this
  }

  /**
    Constructs a {@link CallbackEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addCallback () {
    this.add(new CallbackEvent(...arguments))
    return this
  }

  /**
    Constructs a {@link ConcurrentEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addConcurrent () {
    this.add(new ConcurrentEvent(...arguments))
    return this
  }

  /**
    Constructs a {@link CssAnimationEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addCssAnimation () {
    this.add(new CssAnimationEvent(...arguments))
    return this
  }

  /**
    Constructs a {@link CssTransitionEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addCssTransition () {
    this.add(new CssTransitionEvent(...arguments))
    return this
  }

  /**
    Constructs a {@link DelayEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addDelay () {
    this.add(new DelayEvent(...arguments))
    return this
  }

  /**
    Constructs a {@link SetStyleEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addSetStyle () {
    this.add(new SetStyleEvent(...arguments))
    return this
  }

  /**
    Constructs a {@link TimelineEvent}, forwarding all arguments, and adds
    it to the timeline.
    @return {Timeline} The timeline, to support call chaining.
  */
  addTimeline () {
    this.add(new TimelineEvent(...arguments))
    return this
  }

  /**
    Creates a number of timelines, passes them to the function provided,
    and wraps them all in a {@link ConcurrentEvent}.

    The function passed in must have a defined `.length`. That length is used to
    know how many new timelines to create. This mainly means your function
    should not use rest parameters.

    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length

    @param {Function} fn -
      A function called that is expected to configure the newly created timelines.
    @return {Timeline} The timeline, to support call chaining.
  */
  branch (fn) {
    const timelines = Array(fn.length).fill().map(() => new Timeline())
    fn(...timelines)
    return this.addConcurrent(...timelines.map(t => new TimelineEvent(t)))
  }

  /**
    Starts playing the timeline.

    @param {Object} options -
      Playback options.
    @param {Number} options.iterations -
      The number of times to play through the events. Defaults to 1.
    @param {Function} options.onComplete -
      A function to invoke when the timeline finishes playing.
      This will never be invoked if iterations is set to `Infinity`.
  */
  start ({ iterations = 1, onComplete = null } = {}) {
    this._playing = true
    this._current = -1
    this._iterations = iterations
    this._onComplete = onComplete
    this._startNext()
  }

  /**
    Stops the timeline, if it is playing.

    Aside from preventing starting any new events, this also calls `stop`
    on the current event to allow it to clean up.
  */
  stop () {
    if (!this._playing) {
      return
    }
    this._events[this._current].stop()
  }

  _startNext () {
    if (!this._playing) {
      return
    }

    this._current++

    if (this._current >= this._events.length) {
      if (this._iterations <= 1) {
        this._playing = false
        if (this._onComplete) {
          this._onComplete()
        }
        return
      }

      this._iterations--
      this._current = 0
    }

    this._events[this._current].start(this._startNext)
  }
}
