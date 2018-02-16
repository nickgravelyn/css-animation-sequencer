export default class CssAnimationSequencer {
  constructor () {
    this._animations = []
  }

  add (element, className) {
    this._animations.push({ element, className })
  }

  play () {
    this._doNextAnimation()
  }

  _doNextAnimation () {
    if (this._animations.length === 0) return

    const { element, className } = this._animations.shift()

    element.classList.add(className)

    const listener = () => {
      element.classList.remove(className)
      this._doNextAnimation()
    }
    element.addEventListener('animationend', listener)
  }
}
