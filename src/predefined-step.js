export class PredefinedStep {
  constructor (element, className, { async } = { async: false }) {
    this.element = element
    this.animation = className
    this.async = async
  }

  start (next) {
    this.listener = () => {
      this.stop()
      if (!this.async) { next() }
    }

    this.element.addEventListener('animationend', this.listener)
    this.element.classList.add(this.animation)

    if (this.async) { next() }
  }

  stop () {
    this.element.removeEventListener('animationend', this.listener)
    this.element.classList.remove(this.animation)
  }
}
