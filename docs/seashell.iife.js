var Seashell = (function (exports) {
'use strict';

var Animation = function Animation (element, className, sequencer) {
  var this$1 = this;

  this._element = element;
  this._className = className;

  this._listener = function () {
    this$1.stop();
    setTimeout(function () { return sequencer._doNextAnimation(); });
  };
};

Animation.prototype.start = function start () {
  this._element.classList.add(this._className);
  this._element.addEventListener('animationend', this._listener);
};

Animation.prototype.stop = function stop () {
  this._element.classList.remove(this._className);
  this._element.removeEventListener('animationend', this._listener);
};

var Sequence = function Sequence () {
  this._animations = [];
};

Sequence.prototype.add = function add (element, className) {
  this._animations.push(new Animation(element, className, this));
};

Sequence.prototype.play = function play (args) {
    if ( args === void 0 ) args = {};

  this._loops = args.loops || 0;
  this._next = 0;
  this._doNextAnimation();
};

Sequence.prototype.stop = function stop () {
  var current = (this._next - 1) % this._animations.length;
  this._animations[current].stop();
};

Sequence.prototype._doNextAnimation = function _doNextAnimation () {
  if (this._animations.length === this._next) {
    if (this._loops === 0) { return }
    if (this._loops > 0) { this._loops--; }
    this._next = 0;
  }

  this._animations[this._next++].start();
};

function keyframeFromState (state) {
  var keyframe = '';

  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      keyframe += key + ": " + (state[key]) + "; ";
    }
  }

  return ("{ " + keyframe + "}")
}

var AnimationBuilder = function AnimationBuilder (name, initialState) {
  this._name = name;
  this._initialState = initialState;
  this._keyframes = [];
};

AnimationBuilder.prototype.to = function to (duration, state) {
  this._keyframes.push({ duration: duration, state: state });
};

AnimationBuilder.prototype.buildCss = function buildCss () {
  var totalDuration = this._keyframes.reduce(function (a, c) { return a + c.duration; }, 0);

  var css = '';
  css += "@keyframes " + (this._name) + " { 0% " + (keyframeFromState(this._initialState)) + " ";
  var runningPercentage = 0;
  this._keyframes.forEach(function (f) {
    runningPercentage += f.duration / totalDuration * 100;
    css += runningPercentage + "% " + (keyframeFromState(f.state)) + " ";
  });
  css += '}';
  css += " ." + (this._name) + " { animation-name: " + (this._name) + "; animation-duration: " + (totalDuration / 1000) + "s; animation-fill-mode: both; }";
  return css
};

exports.Sequence = Sequence;
exports.AnimationBuilder = AnimationBuilder;

return exports;

}({}));
