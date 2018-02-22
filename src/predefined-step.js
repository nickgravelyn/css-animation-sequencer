export class PredefinedStep {
  constructor (element, className) {
    this._element = element
    this._animation = className
  }

  start (next) {
    this._listener = () => {
      this.stop()
      next()
    }

    this._element.addEventListener('animationend', this._listener)
    this._element.classList.add(this._animation)
  }

  stop () {
    this._element.removeEventListener('animationend', this._listener)
    this._element.classList.remove(this._animation)
  }
}
