export default class CssAnimationSequencer {
  constructor () {
    this._animations = []
  }

  add (element, className) {
    this._animations.push({ element, className })
  }

  play (args = {}) {
    this._loops = args.loops || 0
    this._next = 0
    this._doNextAnimation()
  }

  _doNextAnimation () {
    if (this._animations.length === this._next) {
      if (this._loops == 0)
        return
      if (this._loops > 0)
        this._loops--

      this._next = 0
    }

    const { element, className } = this._animations[this._next++]

    element.classList.add(className)

    const listener = () => {
      element.classList.remove(className)
      element.removeEventListener('animationend', listener)
      this._doNextAnimation()
    }
    element.addEventListener('animationend', listener)
  }
}
