var Seashell = (function (exports) {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Animation = function () {
  function Animation(element, className, sequencer) {
    var _this = this;

    classCallCheck(this, Animation);

    this._element = element;
    this._className = className;

    this._listener = function () {
      _this.stop();
      setTimeout(function () {
        return sequencer._doNextAnimation();
      });
    };
  }

  createClass(Animation, [{
    key: 'start',
    value: function start() {
      this._element.classList.add(this._className);
      this._element.addEventListener('animationend', this._listener);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._element.classList.remove(this._className);
      this._element.removeEventListener('animationend', this._listener);
    }
  }]);
  return Animation;
}();

var Sequence = function () {
  function Sequence() {
    classCallCheck(this, Sequence);

    this._animations = [];
  }

  createClass(Sequence, [{
    key: 'add',
    value: function add(element, className) {
      this._animations.push(new Animation(element, className, this));
    }
  }, {
    key: 'play',
    value: function play() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._loops = args.loops || 0;
      this._next = 0;
      this._doNextAnimation();
    }
  }, {
    key: 'stop',
    value: function stop() {
      var current = (this._next - 1) % this._animations.length;
      this._animations[current].stop();
    }
  }, {
    key: '_doNextAnimation',
    value: function _doNextAnimation() {
      if (this._animations.length === this._next) {
        if (this._loops === 0) return;
        if (this._loops > 0) this._loops--;
        this._next = 0;
      }

      this._animations[this._next++].start();
    }
  }]);
  return Sequence;
}();

function keyframeFromState(state) {
  var keyframe = '';

  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      keyframe += key + ': ' + state[key] + '; ';
    }
  }

  return '{ ' + keyframe + '}';
}

var AnimationBuilder = function () {
  function AnimationBuilder(name, initialState) {
    classCallCheck(this, AnimationBuilder);

    this._name = name;
    this._initialState = initialState;
    this._keyframes = [];
  }

  createClass(AnimationBuilder, [{
    key: 'to',
    value: function to(duration, state) {
      this._keyframes.push({ duration: duration, state: state });
    }
  }, {
    key: 'buildCss',
    value: function buildCss() {
      var totalDuration = this._keyframes.reduce(function (a, c) {
        return a + c.duration;
      }, 0);

      var css = '';
      css += '@keyframes ' + this._name + ' { 0% ' + keyframeFromState(this._initialState) + ' ';
      var runningPercentage = 0;
      this._keyframes.forEach(function (f) {
        runningPercentage += f.duration / totalDuration * 100;
        css += runningPercentage + '% ' + keyframeFromState(f.state) + ' ';
      });
      css += '}';
      css += ' .' + this._name + ' { animation-name: ' + this._name + '; animation-duration: ' + totalDuration / 1000 + 's; animation-fill-mode: both; }';
      return css;
    }
  }]);
  return AnimationBuilder;
}();

exports.Sequence = Sequence;
exports.AnimationBuilder = AnimationBuilder;

return exports;

}({}));
