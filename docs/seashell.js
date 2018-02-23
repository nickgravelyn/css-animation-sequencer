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

    this.element = element;
    this.state = state;
  }

  SetStep.prototype.start = function start(next) {
    applyState(this.element, this.state);
    next();
  };

  return SetStep;
}();

var randomInt = function randomInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

var defaultOptions = {
  timingFunction: 'ease',
  fillMode: 'both'
};

var TweenStep = function () {
  function TweenStep(element, duration, state, options) {
    classCallCheck(this, TweenStep);

    this.element = element;
    this.duration = duration;
    this.state = state;
    this.animation = 'seashell-' + randomInt();
    this.options = options ? Object.assign({}, defaultOptions, options) : defaultOptions;
  }

  TweenStep.prototype.start = function start(next) {
    var _this = this;

    this.listener = function () {
      _this.stop();
      applyState(_this.element, _this.state);
      next();
    };

    this.element.addEventListener('animationend', this.listener);
    this.element.classList.add(this.animation);
  };

  TweenStep.prototype.stop = function stop() {
    this.element.removeEventListener('animationend', this.listener);
    this.element.classList.remove(this.animation);
  };

  TweenStep.prototype.createCss = function createCss() {
    var css = '.' + this.animation + ' {';
    css += ' animation-name: ' + this.animation + ';';
    css += ' animation-duration: ' + this.duration / 1000 + 's;';
    css += ' animation-fill-mode: ' + this.options.fillMode + ';';
    css += ' animation-timing-function: ' + this.options.timingFunction + ';';
    css += ' }\n';
    css += '@keyframes ' + this.animation + ' { to { ';
    for (var key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        css += key + ': ' + this.state[key] + '; ';
      }
    }
    css += '} }\n';
    return css;
  };

  return TweenStep;
}();

var defaultOptions$1 = {
  async: false
};

var TimelineStep = function () {
  function TimelineStep(timeline, options) {
    classCallCheck(this, TimelineStep);

    this.timeline = timeline;
    this.options = options ? Object.assign({}, defaultOptions$1, options) : defaultOptions$1;
  }

  TimelineStep.prototype.start = function start(next) {
    if (this.options.async) {
      this.timeline.start();
      next();
    } else {
      this.timeline.start({ onComplete: next });
    }
  };

  TimelineStep.prototype.stop = function stop() {
    this.timeline.stop();
  };

  TimelineStep.prototype.createCss = function createCss() {
    return this.timeline.createCss();
  };

  return TimelineStep;
}();

var defaultOptions$2 = {
  async: false
};

var PredefinedStep = function () {
  function PredefinedStep(element, className, options) {
    classCallCheck(this, PredefinedStep);

    this.element = element;
    this.animation = className;
    this.options = options ? Object.assign({}, defaultOptions$2, options) : defaultOptions$2;
  }

  PredefinedStep.prototype.start = function start(next) {
    var _this = this;

    this.listener = function () {
      _this.stop();
      if (!_this.options.async) {
        next();
      }
    };

    this.element.addEventListener('animationend', this.listener);
    this.element.classList.add(this.animation);

    if (this.options.async) {
      next();
    }
  };

  PredefinedStep.prototype.stop = function stop() {
    this.element.removeEventListener('animationend', this.listener);
    this.element.classList.remove(this.animation);
  };

  return PredefinedStep;
}();

var Timeline = function () {
  function Timeline() {
    var _this = this;

    classCallCheck(this, Timeline);

    this.steps = [];
    this.baked = false;

    this.nextExecute = function () {
      _this.toNextStep();
      _this.runStep();
    };
  }

  Timeline.prototype.set = function set$$1() {
    this.throwIfBaked();
    this.steps.push(new (Function.prototype.bind.apply(SetStep, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };

  Timeline.prototype.tween = function tween() {
    this.throwIfBaked();
    this.steps.push(new (Function.prototype.bind.apply(TweenStep, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };

  Timeline.prototype.play = function play() {
    this.throwIfBaked();

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args[0] instanceof Timeline) {
      var timeline = args.shift();
      timeline.bakedByParent = true;
      this.steps.push(new (Function.prototype.bind.apply(TimelineStep, [null].concat([timeline], args)))());
    } else {
      this.steps.push(new (Function.prototype.bind.apply(PredefinedStep, [null].concat(args)))());
    }

    return this;
  };

  Timeline.prototype.start = function start() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.bake();
    this.iterations = options.iterations || 1;
    this.onComplete = options.onComplete;
    this.stepIndex = 0;
    this.runStep();
  };

  Timeline.prototype.stop = function stop() {
    var current = this.steps[this.stepIndex];
    if (current && current.stop) {
      current.stop();
    }

    if (!this.bakedByParent) {
      this._styleElement.parentNode.removeChild(this._styleElement);
      this._styleElement = null;
      this.baked = false;
    }
  };

  Timeline.prototype.throwIfBaked = function throwIfBaked() {
    if (this.baked) throw new Error('Cannot add to a Timeline after play is called');
  };

  Timeline.prototype.runStep = function runStep() {
    if (this.iterations === 0) {
      this.stop();
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    this.steps[this.stepIndex].start(this.nextExecute);
  };

  Timeline.prototype.toNextStep = function toNextStep() {
    this.stepIndex++;
    if (this.steps.length <= this.stepIndex) {
      this.stepIndex = 0;

      if (this.iterations === Infinity) return;
      if (this.iterations > 0) this.iterations--;
    }
  };

  Timeline.prototype.bake = function bake() {
    if (this.baked) return;
    if (this.bakedByParent) return;

    this._styleElement = document.createElement('style');
    this._styleElement.textContent += this.createCss();
    document.head.appendChild(this._styleElement);

    this.baked = true;
  };

  Timeline.prototype.createCss = function createCss() {
    var timelineCss = '';
    for (var i = 0; i < this.steps.length; ++i) {
      var step = this.steps[i];
      if (!step.createCss) {
        continue;
      }
      timelineCss += step.createCss() + '\n';
    }
    return timelineCss;
  };

  return Timeline;
}();

exports.Timeline = Timeline;

return exports;

}({}));
