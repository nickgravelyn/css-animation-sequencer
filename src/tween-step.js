import applyState from './apply-state'

const randomInt = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

const defaultOptions = {
  timingFunction: 'ease',
  fillMode: 'both',
}

export class TweenStep {
  constructor (element, duration, state, options) {
    this.element = element
    this.duration = duration
    this.state = state
    this.animation = `seashell-${randomInt()}`
    this.options = options ? Object.assign({}, defaultOptions, options) : defaultOptions
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
    let css = `.${this.animation} {`
    css += ` animation-name: ${this.animation};`
    css += ` animation-duration: ${this.duration / 1000}s;`
    css += ` animation-fill-mode: ${this.options.fillMode};`
    css += ` animation-timing-function: ${this.options.timingFunction};`
    css += ' }\n'
    css += `@keyframes ${this.animation} { to { `
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        css += `${key}: ${this.state[key]}; `
      }
    }
    css += `} }\n`
    return css
  }
}
