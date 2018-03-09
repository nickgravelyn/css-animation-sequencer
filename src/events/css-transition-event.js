function applyStyle (element, style) {
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      element.style[key] = style[key]
    }
  }
}

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
    @param {Object} from -
      An object representing the style keys and values to start from.
    @param {Object} to -
      An object representing the style keys and values to transition to.
  */
  constructor (element, duration, from, to) {
    this._element = element

    if (to === void 0) {
      this._from = null
      this._to = from
    } else {
      this._from = from
      this._to = to
    }

    this._transition = `${Object.keys(this._to).map(k => k + ' ' + duration + 's').join(', ')}`
    this._onTransitionEnd = this._onTransitionEnd.bind(this)
  }

  /** @ignore */
  start (complete) {
    this._complete = complete

    if (this._from) {
      applyStyle(this._element, this._from)
    }

    this._element.addEventListener('transitionend', this._onTransitionEnd)

    setTimeout(() => {
      this._element.style.transition = this._transition
      applyStyle(this._element, this._to)
    })
  }

  /** @ignore */
  stop () {
    this._element.removeEventListener('transitionend', this._onTransitionEnd)
    this._element.style.removeProperty('transition')
  }

  _onTransitionEnd () {
    this.stop()
    setTimeout(this._complete)
  }
}
