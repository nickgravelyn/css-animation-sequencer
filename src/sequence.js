class Animation {
  constructor (element, className, sequencer) {
    this._element = element
    this._className = className

    this._listener = () => {
      this.stop()
      sequencer._doNextAnimation()
    }
  }

  start () {
    this._element.classList.add(this._className)
    this._element.addEventListener('animationend', this._listener)
  }

  stop () {
    this._element.classList.remove(this._className)
    this._element.removeEventListener('animationend', this._listener)
  }
}

export class Sequence {
  constructor () {
    this._animations = []
  }

  add (element, className) {
    this._animations.push(new Animation(element, className, this))
  }

  play (args = {}) {
    this._loops = args.loops || 0
    this._next = 0
    this._doNextAnimation()
  }

  stop () {
    const current = (this._next - 1) % this._animations.length
    this._animations[current].stop()
  }

  _doNextAnimation () {
    if (this._animations.length === this._next) {
      if (this._loops === 0) return
      if (this._loops > 0) this._loops--
      this._next = 0
    }

    this._animations[this._next++].start()
  }
}
