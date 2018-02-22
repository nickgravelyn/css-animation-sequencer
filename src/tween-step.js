import applyState from './apply-state'

const randomInt = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

export class TweenStep {
  constructor (element, duration, state) {
    this.element = element
    this.duration = duration
    this.state = state
    this.animation = `seashell-${randomInt()}`
  }

  start (next) {
    this.listener = () => {
      this.stop()
      applyState(this.element, this.state)
      next()
    }

    this.element.addEventListener('animationend', this.listener)
    this.element.classList.add(this.animation)
  }

  stop () {
    this.element.removeEventListener('animationend', this.listener)
    this.element.classList.remove(this.animation)
  }

  createCss () {
    let css = `.${this.animation} { animation: ${this.animation} ${this.duration / 1000}s both; } `
    css += `@keyframes ${this.animation} { to { `

    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        css += `${key}: ${this.state[key]}; `
      }
    }

    return css + '} }'
  }
}
