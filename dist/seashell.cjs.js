'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var applyState = (function (element, state) {
  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      element.style[key] = state[key];
    }
  }
});

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

var randomInt = function randomInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

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

var RunStep = function () {
  function RunStep(timeline) {
    classCallCheck(this, RunStep);

    this._timeline = timeline;
  }

  createClass(RunStep, [{
    key: "start",
    value: function start(next) {
      this._timeline.play();
      next();
    }
  }, {
    key: "stop",
    value: function stop() {
      this._timeline.stop();
    }
  }, {
    key: "createCss",
    value: function createCss() {}
  }]);
  return RunStep;
}();

var Timeline = function () {
  function Timeline() {
    var _this = this;

    classCallCheck(this, Timeline);

    this._steps = [];
    this._baked = false;

    this._nextExecute = function () {
      _this._toNextStep();
      _this._runStep();
    };
  }

  createClass(Timeline, [{
    key: 'set',
    value: function set$$1(element, state) {
      this._throwIfBaked();
      this._steps.push(new SetStep(element, state));
    }
  }, {
    key: 'to',
    value: function to(element, duration, state) {
      this._throwIfBaked();
      this._steps.push(new ToStep(element, duration, state));
    }
  }, {
    key: 'run',
    value: function run(timeline) {
      this._throwIfBaked();
      this._steps.push(new RunStep(timeline));
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
    key: '_throwIfBaked',
    value: function _throwIfBaked() {
      if (this._baked) throw new Error('Cannot add to a Timeline after play is called');
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

exports.Timeline = Timeline;
