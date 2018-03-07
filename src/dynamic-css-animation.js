export class DynamicCssAnimation {
  constructor () {
    this._name = 'seashell-' + Math.random().toString(36).substring(2)
    this.delay = 0
    this.direction = 'normal'
    this.fillMode = 'none'
    this.timingFunction = 'ease'
    this.iterationCount = 1
  }

  get name () {
    return this._name
  }

  generateCss () {
    const name = this._name
    return `.${name} {
  animation-delay: ${this.delay}s;
  animation-direction: ${this.direction};
  animation-duration: 0s;
  animation-fill-mode: ${this.fillMode};
  animation-iteration-count: ${this.iterationCount};
  animation-name: ${name};
  animation-timing-function: ${this.timingFunction};
}
@keyframes ${name} {
}`
  }
}
