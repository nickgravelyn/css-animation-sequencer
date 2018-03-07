export class DynamicCssAnimation {
  constructor () {
    this._name = 'seashell-' + Math.random().toString(36).substring(2)
    this._delay = 0
    this._direction = 'normal'
    this._fillMode = 'none'
    this._timingFunction = 'ease'
  }

  get name () {
    return this._name
  }

  get delay () {
    return this._delay
  }
  set delay (value) {
    this._delay = value
  }

  get direction () {
    return this._direction
  }
  set direction (value) {
    this._direction = value
  }

  get fillMode () {
    return this._fillMode
  }
  set fillMode (value) {
    this._fillMode = value
  }

  get timingFunction () {
    return this._timingFunction
  }
  set timingFunction (value) {
    this._timingFunction = value
  }

  generateCss () {
    const name = this._name
    return `.${name} {
  animation-delay: ${this._delay}s;
  animation-direction: ${this._direction};
  animation-duration: 0s;
  animation-fill-mode: ${this._fillMode};
  animation-name: ${name};
  animation-timing-function: ${this._timingFunction};
}
@keyframes ${name} {
}`
  }
}
