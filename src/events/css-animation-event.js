export class CssAnimationEvent {
  constructor (element, className) {
    this._element = element
    this._animation = className
  }

  start (complete) {
    this.listener = () => {
      this.stop()
      complete()
    }

    this._element.addEventListener('animationend', this.listener)
    this._element.classList.add(this._animation)
  }

  stop () {
    this._element.removeEventListener('animationend', this.listener)
    this._element.classList.remove(this._animation)
  }
}
