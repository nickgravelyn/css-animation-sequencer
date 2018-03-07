export class DynamicCssAnimation {
  constructor () {
    this._name = 'seashell-' + Math.random().toString(36).substring(2)
    this._duration = 0
    this.delay = 0
    this.direction = 'normal'
    this.fillMode = 'none'
    this.timingFunction = 'ease'
    this.iterationCount = 1

    this._keyframes = []
  }

  get name () {
    return this._name
  }

  addKeyFrame (duration, style) {
    this._keyframes.push({ duration, style })
    this._duration += duration
    return this
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
    let css = `.${name} {
  animation-delay: ${this.delay}s;
  animation-direction: ${this.direction};
  animation-duration: ${this._duration}s;
  animation-fill-mode: ${this.fillMode};
  animation-iteration-count: ${this.iterationCount};
  animation-name: ${name};
  animation-timing-function: ${this.timingFunction};
}
@keyframes ${name} {\n`

    let runningTime = 0
    for (let i = 0, len = this._keyframes.length; i < len; ++i) {
      const frame = this._keyframes[i]
      runningTime += frame.duration
      const percentage = runningTime === 0 ? 0 : runningTime / this._duration * 100
      css += `  ${percentage}% {\n`
      for (const key in frame.style) {
        if (frame.style.hasOwnProperty(key)) {
          css += `    ${key}: ${frame.style[key]};\n`
        }
      }
      css += '  }\n'
    }

    css += '}'
    return css
  }
}
