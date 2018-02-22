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

var TweenStep = function () {
  function TweenStep(element, duration, state) {
    classCallCheck(this, TweenStep);

    this.element = element;
    this.duration = duration;
    this.state = state;
    this.animation = 'seashell-' + randomInt();
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

  TweenStep.prototype.createCss = function createCss(timelineId) {
    var css = '.' + this.animation + ' { animation: ' + this.animation + ' ' + this.duration / 1000 + 's both; } ';
    css += '@keyframes ' + this.animation + ' { to { ';

    for (var key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        css += key + ': ' + this.state[key] + '; ';
      }
    }

    return css + '} }';
  };

  return TweenStep;
}();

var TimelineStep = function () {
  function TimelineStep(timeline) {
    classCallCheck(this, TimelineStep);

    this.timeline = timeline;
  }

  TimelineStep.prototype.start = function start(next) {
    this.timeline.start();
    next();
  };

  TimelineStep.prototype.stop = function stop() {
    this.timeline.stop();
  };

  TimelineStep.prototype.createCss = function createCss() {
    return this.timeline.createCss();
  };

  return TimelineStep;
}();

var PredefinedStep = function () {
  function PredefinedStep(element, className) {
    classCallCheck(this, PredefinedStep);

    this.element = element;
    this.animation = className;
  }

  PredefinedStep.prototype.start = function start(next) {
    var _this = this;

    this.listener = function () {
      _this.stop();
      next();
    };

    this.element.addEventListener('animationend', this.listener);
    this.element.classList.add(this.animation);
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

  Timeline.prototype.set = function set$$1(element, state) {
    this.throwIfBaked();
    this.steps.push(new SetStep(element, state));
  };

  Timeline.prototype.tween = function tween(element, duration, state) {
    this.throwIfBaked();
    this.steps.push(new TweenStep(element, duration, state));
  };

  Timeline.prototype.play = function play() {
    this.throwIfBaked();

    if (arguments.length === 1) {
      var timeline = arguments[0];
      timeline.bakedByParent = true;
      this.steps.push(new TimelineStep(timeline));
      return;
    }

    this.steps.push(new PredefinedStep(arguments[0], arguments[1]));
  };

  Timeline.prototype.start = function start() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.bake();
    this.iterations = options.iterations || 1;
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
