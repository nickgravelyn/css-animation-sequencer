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

var CallbackEvent = function () {
  function CallbackEvent(callback) {
    classCallCheck(this, CallbackEvent);
    this._callback = callback;
  }
  CallbackEvent.prototype.start = function start(complete) {
    this._callback();
    complete();
  };
  CallbackEvent.prototype.stop = function stop() {};
  return CallbackEvent;
}();

var ConcurrentEvent = function () {
  function ConcurrentEvent() {
    classCallCheck(this, ConcurrentEvent);
    for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }
    this._children = children;
  }
  ConcurrentEvent.prototype.start = function start(complete) {
    var len = this._children.length;
    var runningCount = len;
    var childComplete = function childComplete() {
      runningCount--;
      if (runningCount === 0) {
        complete();
      }
    };
    for (var i = 0; i < len; ++i) {
      this._children[i].start(childComplete);
    }
  };
  ConcurrentEvent.prototype.stop = function stop() {
    for (var i = 0, len = this._children.length; i < len; ++i) {
      this._children[i].stop();
    }
  };
  return ConcurrentEvent;
}();

function applyStyle(element, style) {
  for (var key in style) {
    if (style.hasOwnProperty(key)) {
      element.style[key] = style[key];
    }
  }
}

var CssAnimationEvent = function () {
  function CssAnimationEvent(element, className) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$keepComputedStyl = _ref.keepComputedStyles,
        keepComputedStyles = _ref$keepComputedStyl === undefined ? [] : _ref$keepComputedStyl;
    classCallCheck(this, CssAnimationEvent);
    this._element = element;
    this._animation = className;
    this._onAnimationEnd = this._onAnimationEnd.bind(this);
    this._keepComputedStyles = keepComputedStyles.slice(0);
  }
  CssAnimationEvent.prototype.start = function start(complete) {
    this._complete = complete;
    this._element.addEventListener('animationend', this._onAnimationEnd);
    this._element.classList.add(this._animation);
  };
  CssAnimationEvent.prototype.stop = function stop() {
    this._element.removeEventListener('animationend', this._onAnimationEnd);
    this._element.classList.remove(this._animation);
  };
  CssAnimationEvent.prototype._onAnimationEnd = function _onAnimationEnd() {
    this.stop();
    if (this._keepComputedStyles.length) {
      var computedStyles = window.getComputedStyle(this._element);
      var styleToApply = this._keepComputedStyles.reduce(function (a, b) {
        a[b] = computedStyles[b];
        return a;
      }, {});
      applyStyle(this._element, styleToApply);
    }
    setTimeout(this._complete);
  };
  return CssAnimationEvent;
}();

var CssTransitionEvent = function () {
  function CssTransitionEvent(element, duration, style) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$timingFunction = _ref.timingFunction,
        timingFunction = _ref$timingFunction === undefined ? 'ease' : _ref$timingFunction;
    classCallCheck(this, CssTransitionEvent);
    this._element = element;
    this._style = style;
    this._transition = '' + Object.keys(this._style).map(function (k) {
      return k + ' ' + duration + 's ' + timingFunction;
    }).join(', ');
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
    this._startTransition = this._startTransition.bind(this);
  }
  CssTransitionEvent.prototype.start = function start(complete) {
    this._complete = complete;
    this._element.addEventListener('transitionend', this._onTransitionEnd);
    setTimeout(this._startTransition);
  };
  CssTransitionEvent.prototype.stop = function stop() {
    this._element.removeEventListener('transitionend', this._onTransitionEnd);
    this._element.style.removeProperty('transition');
  };
  CssTransitionEvent.prototype._startTransition = function _startTransition() {
    this._element.style.transition = this._transition;
    applyStyle(this._element, this._style);
  };
  CssTransitionEvent.prototype._onTransitionEnd = function _onTransitionEnd() {
    this.stop();
    setTimeout(this._complete);
  };
  return CssTransitionEvent;
}();

var DelayEvent = function () {
  function DelayEvent(time) {
    classCallCheck(this, DelayEvent);
    this._time = time * 1000;
  }
  DelayEvent.prototype.start = function start(complete) {
    this._timer = setTimeout(complete, this._time);
  };
  DelayEvent.prototype.stop = function stop() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  };
  return DelayEvent;
}();

var SetStyleEvent = function () {
  function SetStyleEvent(element, style) {
    classCallCheck(this, SetStyleEvent);
    this._element = element;
    this._style = style;
  }
  SetStyleEvent.prototype.start = function start(complete) {
    applyStyle(this._element, this._style);
    complete();
  };
  SetStyleEvent.prototype.stop = function stop() {};
  return SetStyleEvent;
}();

var TimelineEvent = function () {
  function TimelineEvent(timeline) {
    classCallCheck(this, TimelineEvent);
    this._timeline = timeline;
  }
  TimelineEvent.prototype.start = function start(complete) {
    this._timeline.start({ onComplete: complete });
  };
  TimelineEvent.prototype.stop = function stop() {
    this._timeline.stop();
  };
  return TimelineEvent;
}();

var Timeline = function () {
  function Timeline() {
    classCallCheck(this, Timeline);
    this._events = [];
    this._playing = false;
    this._startNext = this._startNext.bind(this);
  }
  Timeline.prototype.add = function add(event) {
    this._events.push(event);
    return this;
  };
  Timeline.prototype.addCallback = function addCallback() {
    this.add(new (Function.prototype.bind.apply(CallbackEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.addConcurrent = function addConcurrent() {
    this.add(new (Function.prototype.bind.apply(ConcurrentEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.addCssAnimation = function addCssAnimation() {
    this.add(new (Function.prototype.bind.apply(CssAnimationEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.addCssTransition = function addCssTransition() {
    this.add(new (Function.prototype.bind.apply(CssTransitionEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.addDelay = function addDelay() {
    this.add(new (Function.prototype.bind.apply(DelayEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.addSetStyle = function addSetStyle() {
    this.add(new (Function.prototype.bind.apply(SetStyleEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.addTimeline = function addTimeline() {
    this.add(new (Function.prototype.bind.apply(TimelineEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };
  Timeline.prototype.branch = function branch(fn) {
    var timelines = Array(fn.length).fill().map(function () {
      return new Timeline();
    });
    fn.apply(undefined, timelines);
    return this.addConcurrent.apply(this, timelines.map(function (t) {
      return new TimelineEvent(t);
    }));
  };
  Timeline.prototype.start = function start() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$iterations = _ref.iterations,
        iterations = _ref$iterations === undefined ? 1 : _ref$iterations,
        _ref$onComplete = _ref.onComplete,
        onComplete = _ref$onComplete === undefined ? null : _ref$onComplete;
    this._playing = true;
    this._current = -1;
    this._iterations = iterations;
    this._onComplete = onComplete;
    this._startNext();
  };
  Timeline.prototype.stop = function stop() {
    if (!this._playing) {
      return;
    }
    this._events[this._current].stop();
  };
  Timeline.prototype._startNext = function _startNext() {
    if (!this._playing) {
      return;
    }
    this._current++;
    if (this._current >= this._events.length) {
      if (this._iterations <= 1) {
        this._playing = false;
        if (this._onComplete) {
          this._onComplete();
        }
        return;
      }
      this._iterations--;
      this._current = 0;
    }
    this._events[this._current].start(this._startNext);
  };
  return Timeline;
}();

var DynamicCssAnimation = function () {
  function DynamicCssAnimation() {
    classCallCheck(this, DynamicCssAnimation);
    this._name = 'seashell-' + Math.random().toString(36).substring(2);
    this._duration = 0;
    this._keyframes = [];
    this.delay = 0;
    this.direction = 'normal';
    this.fillMode = 'none';
    this.timingFunction = 'ease';
    this.iterationCount = 1;
  }
  DynamicCssAnimation.prototype.addKeyFrame = function addKeyFrame(duration, style) {
    this._keyframes.push({ duration: duration, style: style });
    this._duration += duration;
    return this;
  };
  DynamicCssAnimation.prototype.generateStyle = function generateStyle() {
    if (!this._styleSheet) {
      this._styleSheet = document.createElement('style');
      this._styleSheet.dataset.seashell = this._name;
      document.head.appendChild(this._styleSheet);
    }
    this._styleSheet.textContent = this.createCssString();
  };
  DynamicCssAnimation.prototype.destroyStyle = function destroyStyle() {
    if (this._styleSheet) {
      this._styleSheet.parentNode.removeChild(this._styleSheet);
      this._styleSheet = null;
    }
  };
  DynamicCssAnimation.prototype.createCssString = function createCssString() {
    var name = this._name;
    var css = '.' + name + ' {\n  animation-delay: ' + this.delay + 's;\n  animation-direction: ' + this.direction + ';\n  animation-duration: ' + this._duration + 's;\n  animation-fill-mode: ' + this.fillMode + ';\n  animation-iteration-count: ' + this.iterationCount + ';\n  animation-name: ' + name + ';\n  animation-timing-function: ' + this.timingFunction + ';\n}\n@keyframes ' + name + ' {\n';
    var runningTime = 0;
    for (var i = 0, len = this._keyframes.length; i < len; ++i) {
      var frame = this._keyframes[i];
      runningTime += frame.duration;
      var percentage = runningTime === 0 ? 0 : runningTime / this._duration * 100;
      css += '  ' + percentage + '% {\n';
      for (var key in frame.style) {
        if (frame.style.hasOwnProperty(key)) {
          css += '    ' + key + ': ' + frame.style[key] + ';\n';
        }
      }
      css += '  }\n';
    }
    css += '}';
    return css;
  };
  createClass(DynamicCssAnimation, [{
    key: 'name',
    get: function get$$1() {
      return this._name;
    }
  }]);
  return DynamicCssAnimation;
}();

exports.Timeline = Timeline;
exports.CallbackEvent = CallbackEvent;
exports.ConcurrentEvent = ConcurrentEvent;
exports.CssAnimationEvent = CssAnimationEvent;
exports.CssTransitionEvent = CssTransitionEvent;
exports.DelayEvent = DelayEvent;
exports.SetStyleEvent = SetStyleEvent;
exports.TimelineEvent = TimelineEvent;
exports.DynamicCssAnimation = DynamicCssAnimation;

return exports;

}({}));
