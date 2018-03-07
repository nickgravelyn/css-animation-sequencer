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
  */
  constructor (element, className) {
    this._element = element
    this._animation = className
    this._onAnimationEnd = this._onAnimationEnd.bind(this)
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
    setTimeout(this._complete)
  }
}
