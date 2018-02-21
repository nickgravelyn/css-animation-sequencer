import applyState from './apply-state'

const randomInt = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

export class ToStep {
  constructor (element, duration, state) {
    this._element = element
    this._duration = duration
    this._state = state
    this._animation = `seashell-${randomInt()}`
  }

  start (next) {
    this._listener = () => {
      this.stop()
      applyState(this._element, this._state)
      next()
    }

    this._element.addEventListener('animationend', this._listener)
    this._element.classList.add(this._animation)
  }

  stop () {
    this._element.removeEventListener('animationend', this._listener)
    this._element.classList.remove(this._animation)
  }

  createCss (timelineId) {
    let css = `.${this._animation} { animation: ${this._animation} ${this._duration / 1000}s both; } `
    css += `@keyframes ${this._animation} { to { `

    for (const key in this._state) {
      if (this._state.hasOwnProperty(key)) {
        css += `${key}: ${this._state[key]}; `
      }
    }

    return css + '} }'
  }
}
