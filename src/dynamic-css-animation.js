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

  generateStyle () {
    if (!this._styleSheet) {
      this._styleSheet = document.createElement('style')
      document.head.appendChild(this._styleSheet)
    }

    this._styleSheet.textContent = this.createCssString()
  }

  destroyStyle () {
    if (this._styleSheet) {
      this._styleSheet.parentNode.removeChild(this._styleSheet)
      this._styleSheet = null
    }
  }

  createCssString () {
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
