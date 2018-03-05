export class CssAnimationEvent {
  constructor (element, className) {
    this.element = element
    this.animation = className
  }

  start (complete) {
    this.listener = () => {
      this.stop()
      complete()
    }

    this.element.addEventListener('animationend', this.listener)
    this.element.classList.add(this.animation)
  }

  stop () {
    this.element.removeEventListener('animationend', this.listener)
    this.element.classList.remove(this.animation)
  }
}
