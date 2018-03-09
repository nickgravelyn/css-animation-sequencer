import { applyStyle } from '../lib/apply-style'

/**
  An event that uses CSS transitions to animate from one style
  state to another.
*/
export class CssTransitionEvent {
  /**
    Initializes the event.

    @param {HTMLElement} element -
      The element to apply the style transition to.
    @param {Number} duration -
      The duration (in seconds) for the transition.
    @param {Object} style -
      An object representing the style keys and values to transition to.
    @param {Object} options -
      Options for the transition.
    @param {String} options.timingFunction -
      Timing function to use for the transition. Defaults to 'ease'.
  */
  constructor (element, duration, style, { timingFunction = 'ease' } = {}) {
    this._element = element
    this._style = style
    this._transition = `${Object.keys(this._style).map(k => `${k} ${duration}s ${timingFunction}`).join(', ')}`
    this._onTransitionEnd = this._onTransitionEnd.bind(this)
    this._startTransition = this._startTransition.bind(this)
  }

  /** @ignore */
  start (complete) {
    this._complete = complete
    this._element.addEventListener('transitionend', this._onTransitionEnd)
    setTimeout(this._startTransition)
  }

  /** @ignore */
  stop () {
    this._element.removeEventListener('transitionend', this._onTransitionEnd)
    this._element.style.removeProperty('transition')
  }

  _startTransition () {
    this._element.style.transition = this._transition
    applyStyle(this._element, this._style)
  }

  _onTransitionEnd () {
    this.stop()
    setTimeout(this._complete)
  }
}
