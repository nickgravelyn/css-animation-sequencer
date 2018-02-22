import applyState from './apply-state'

const randomInt = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

export class TweenStep {
  constructor (element, duration, state, { timingFunction } = { timingFunction: 'ease' }) {
    this.element = element
    this.duration = duration
    this.state = state
    this.animation = `seashell-${randomInt()}`
    this.timingFunction = timingFunction
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
    let css = `.${this.animation} {
  animation-name: ${this.animation};
  animation-duration: ${this.duration / 1000}s;
  animation-fill-mode: both;
  animation-timing-function: ${this.timingFunction};
}
`
    css += `@keyframes ${this.animation} {
  to {\n`

    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        css += `    ${key}: ${this.state[key]};\n`
      }
    }

    return css + `  }
}`
  }
}
