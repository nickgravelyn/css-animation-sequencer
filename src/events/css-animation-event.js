export class CssAnimationEvent {
  constructor (element, className) {
    this._element = element
    this._animation = className
    this._onAnimationEnd = this._onAnimationEnd.bind(this)
  }

  start (complete) {
    this._complete = complete
    this._element.addEventListener('animationend', this._onAnimationEnd)
    this._element.classList.add(this._animation)
  }

  stop () {
    this._element.removeEventListener('animationend', this._onAnimationEnd)
    this._element.classList.remove(this._animation)
  }

  _onAnimationEnd () {
    this.stop()
    this._complete()
  }
}
