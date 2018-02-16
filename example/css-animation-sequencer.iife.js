var CssAnimationSequencer = (function () {
  'use strict'

  var Animation = function Animation (element, className, sequencer) {
    var this$1 = this

    this._element = element
    this._className = className

    this._listener = function () {
      this$1.stop()
      sequencer._doNextAnimation()
    }
  }

  Animation.prototype.start = function start () {
    this._element.classList.add(this._className)
    this._element.addEventListener('animationend', this._listener)
  }

  Animation.prototype.stop = function stop () {
    this._element.classList.remove(this._className)
    this._element.removeEventListener('animationend', this._listener)
  }

  var CssAnimationSequencer = function CssAnimationSequencer () {
    this._animations = []
  }

  CssAnimationSequencer.prototype.add = function add (element, className) {
    this._animations.push(new Animation(element, className, this))
  }

  CssAnimationSequencer.prototype.play = function play (args) {
    if (args === void 0) args = {}

    this._loops = args.loops || 0
    this._next = 0
    this._doNextAnimation()
  }

  CssAnimationSequencer.prototype.stop = function stop () {
    var current = (this._next - 1) % this._animations.length
    this._animations[current].stop()
  }

  CssAnimationSequencer.prototype._doNextAnimation = function _doNextAnimation () {
    if (this._animations.length === this._next) {
      if (this._loops === 0) {
        return
      }
      if (this._loops > 0) {
        this._loops--
      }
      this._next = 0
    }

    this._animations[this._next++].start()
  }

  return CssAnimationSequencer
})()
