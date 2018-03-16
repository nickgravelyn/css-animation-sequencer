import { applyStyle } from '../lib/apply-style'

/**
  An event that applies a CSS animation to an element.
*/
export class CssAnimationEvent {
  /**
    Initializes the event.

    @param {HTMLElement} element -
      The element to apply the animation to.
    @param {String} className -
      A CSS class that has an `animation` property on it.
    @param {Object} options -
      Options for the event.
    @param {Array<string>} options.keepComputedStyles -
      An array of style names to keep from computed styles when the animation completes.
  */
  constructor (element, className, { keepComputedStyles = [] } = {}) {
    this._element = element
    this._animation = className
    this._onAnimationEnd = this._onAnimationEnd.bind(this)
    this._keepComputedStyles = keepComputedStyles.slice(0)
  }

  /** @ignore */
  start (complete) {
    this._complete = complete
    this._element.addEventListener('animationend', this._onAnimationEnd)
    this._element.classList.add(this._animation)
  }

  /** @ignore */
  stop () {
    this._element.removeEventListener('animationend', this._onAnimationEnd)
    this._element.classList.remove(this._animation)
  }

  _onAnimationEnd () {
    this.stop()

    if (this._keepComputedStyles.length) {
      const computedStyles = window.getComputedStyle(this._element)
      const styleToApply = this._keepComputedStyles.reduce((a, b) => {
        a[b] = computedStyles[b]
        return a
      }, {})
      applyStyle(this._element, styleToApply)
    }

    setTimeout(this._complete)
  }
}
