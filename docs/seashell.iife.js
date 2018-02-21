var Seashell = (function (exports) {
'use strict';

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

var SetStep = function () {
  function SetStep(element, state) {
    classCallCheck(this, SetStep);

    this._element = element;
    this._state = state;
  }

  SetStep.prototype.start = function start(next) {
    applyState(this._element, this._state);
    next();
  };

  SetStep.prototype.stop = function stop() {};

  SetStep.prototype.createCss = function createCss() {};

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

  ToStep.prototype.start = function start(next) {
    var _this = this;

    this._listener = function () {
      _this.stop();
      applyState(_this._element, _this._state);
      next();
    };

    this._element.addEventListener('animationend', this._listener);
    this._element.classList.add(this._animation);
  };

  ToStep.prototype.stop = function stop() {
    this._element.removeEventListener('animationend', this._listener);
    this._element.classList.remove(this._animation);
  };

  ToStep.prototype.createCss = function createCss(timelineId) {
    var css = '.' + this._animation + ' { animation: ' + this._animation + ' ' + this._duration / 1000 + 's both; } ';
    css += '@keyframes ' + this._animation + ' { to { ';

    for (var key in this._state) {
      if (this._state.hasOwnProperty(key)) {
        css += key + ': ' + this._state[key] + '; ';
      }
    }

    return css + '} }';
  };

  return ToStep;
}();

var RunStep = function () {
  function RunStep(timeline) {
    classCallCheck(this, RunStep);

    this._timeline = timeline;
  }

  RunStep.prototype.start = function start(next) {
    this._timeline.play();
    next();
  };

  RunStep.prototype.stop = function stop() {
    this._timeline.stop();
  };

  RunStep.prototype.createCss = function createCss() {};

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

  Timeline.prototype.set = function set$$1(element, state) {
    this._throwIfBaked();
    this._steps.push(new SetStep(element, state));
  };

  Timeline.prototype.to = function to(element, duration, state) {
    this._throwIfBaked();
    this._steps.push(new ToStep(element, duration, state));
  };

  Timeline.prototype.run = function run(timeline) {
    this._throwIfBaked();
    this._steps.push(new RunStep(timeline));
  };

  Timeline.prototype.play = function play() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this._baked) this._bake();

    this._iterations = options.iterations || 1;
    this._stepIndex = 0;
    this._runStep();
  };

  Timeline.prototype.stop = function stop() {
    this._steps[this._stepIndex].stop();
    this._styleElement.parentNode.removeChild(this._styleElement);
    this._styleElement = null;
    this._baked = false;
  };

  Timeline.prototype._throwIfBaked = function _throwIfBaked() {
    if (this._baked) throw new Error('Cannot add to a Timeline after play is called');
  };

  Timeline.prototype._runStep = function _runStep() {
    if (this._iterations === 0) {
      this.stop();
      return;
    }

    this._steps[this._stepIndex].start(this._nextExecute);
  };

  Timeline.prototype._toNextStep = function _toNextStep() {
    this._stepIndex++;
    if (this._steps.length <= this._stepIndex) {
      this._stepIndex = 0;

      if (this._iterations === Infinity) return;
      if (this._iterations > 0) this._iterations--;
    }
  };

  Timeline.prototype._bake = function _bake() {
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
  };

  return Timeline;
}();

exports.Timeline = Timeline;

return exports;

}({}));
