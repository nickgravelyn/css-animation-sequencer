const defaultOptions = {
  async: false,
}

export class PredefinedStep {
  constructor (element, className, options = {}) {
    this.element = element
    this.animation = className
    this.options = Object.assign({}, defaultOptions, options)
  }

  start (next) {
    this.listener = () => {
      this.stop()
      if (!this.options.async) {
        next()
      }
    }

    this.element.addEventListener('animationend', this.listener)
    this.element.classList.add(this.animation)

    if (this.options.async) {
      next()
    }
  }

  stop () {
    this.element.removeEventListener('animationend', this.listener)
    this.element.classList.remove(this.animation)
  }
}
