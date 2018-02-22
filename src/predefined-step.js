export class PredefinedStep {
  constructor (element, className) {
    this.element = element
    this.animation = className
  }

  start (next) {
    this.listener = () => {
      this.stop()
      next()
    }

    this.element.addEventListener('animationend', this.listener)
    this.element.classList.add(this.animation)
  }

  stop () {
    this.element.removeEventListener('animationend', this.listener)
    this.element.classList.remove(this.animation)
  }
}
