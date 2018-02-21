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

var randomInt = function randomInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

var applyState = function applyState(element, state) {
  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      element.style[key] = state[key];
    }
  }
};

var SetStep = function () {
  function SetStep(element, state) {
    classCallCheck(this, SetStep);

    this._element = element;
    this._state = state;
  }

  createClass(SetStep, [{
    key: 'start',
    value: function start(next) {
      applyState(this._element, this._state);
      next();
    }
  }, {
    key: 'stop',
    value: function stop() {}
  }, {
    key: 'createCss',
    value: function createCss() {}
  }]);
  return SetStep;
}();

var ToStep = function () {
  function ToStep(element, duration, state) {
    classCallCheck(this, ToStep);

    this._element = element;
    this._duration = duration;
    this._state = state;
    this._animation = 'seashell-' + randomInt();
  }

  createClass(ToStep, [{
    key: 'start',
    value: function start(next) {
      var _this = this;

      this._listener = function () {
        _this.stop();
        applyState(_this._element, _this._state);
        next();
      };

      this._element.addEventListener('animationend', this._listener);
      this._element.classList.add(this._animation);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._element.removeEventListener('animationend', this._listener);
      this._element.classList.remove(this._animation);
    }
  }, {
    key: 'createCss',
    value: function createCss(timelineId) {
      var css = '.' + this._animation + ' { animation: ' + this._animation + ' ' + this._duration / 1000 + 's both; } ';
      css += '@keyframes ' + this._animation + ' { to { ';

      for (var key in this._state) {
        if (this._state.hasOwnProperty(key)) {
          css += key + ': ' + this._state[key] + '; ';
        }
      }

      return css + '} }';
    }
  }]);
  return ToStep;
}();

var Timeline = function () {
  function Timeline() {
    var _this2 = this;

    classCallCheck(this, Timeline);

    this._steps = [];
    this._baked = false;

    this._nextExecute = function () {
      _this2._toNextStep();
      _this2._runStep();
    };
  }

  createClass(Timeline, [{
    key: 'set',
    value: function set$$1(element, state) {
      if (this._baked) throw new Error('Cannot add to a Timeline after play is called');
      this._steps.push(new SetStep(element, state));
    }
  }, {
    key: 'to',
    value: function to(element, duration, state) {
      if (this._baked) throw new Error('Cannot add to a Timeline after play is called');
      this._steps.push(new ToStep(element, duration, state));
    }
  }, {
    key: 'play',
    value: function play() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this._baked) this._bake();

      this._iterations = options.iterations || 1;
      this._stepIndex = 0;
      this._runStep();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._steps[this._stepIndex].stop();
      this._styleElement.parentNode.removeChild(this._styleElement);
      this._styleElement = null;
      this._baked = false;
    }
  }, {
    key: '_runStep',
    value: function _runStep() {
      if (this._iterations === 0) {
        this.stop();
        return;
      }

      this._steps[this._stepIndex].start(this._nextExecute);
    }
  }, {
    key: '_toNextStep',
    value: function _toNextStep() {
      this._stepIndex++;
      if (this._steps.length <= this._stepIndex) {
        this._stepIndex = 0;

        if (this._iterations === Infinity) return;
        if (this._iterations > 0) this._iterations--;
      }
    }
  }, {
    key: '_bake',
    value: function _bake() {
      if (this._baked) return;

      this._styleElement = document.createElement('style');
      for (var i = 0; i < this._steps.length; ++i) {
        var css = this._steps[i].createCss();
        if (css) {
          this._styleElement.textContent += css + '\n';
        }
      }
      document.head.appendChild(this._styleElement);

      this._baked = true;
    }
  }]);
  return Timeline;
}();

exports.Sequence = Sequence;
exports.AnimationBuilder = AnimationBuilder;
exports.Timeline = Timeline;

return exports;

}({}));
