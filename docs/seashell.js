var Seashell = (function (exports) {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Timeline = function () {
  function Timeline() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Timeline);

    this._events = events.slice(0);
    this._playing = false;
    this._startNext = this._startNext.bind(this);
  }

  Timeline.prototype.add = function add(event) {
    this._events.push(event);
    return this;
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

var CallbackEvent = function () {
  function CallbackEvent(callback) {
    classCallCheck(this, CallbackEvent);

    this._callback = callback;
  }

  CallbackEvent.prototype.start = function start(complete) {
    this._callback();
    complete();
  };

  return CallbackEvent;
}();

var DelayEvent = function () {
  function DelayEvent(time) {
    classCallCheck(this, DelayEvent);

    this._time = time;
  }

  DelayEvent.prototype.start = function start(complete) {
    setTimeout(complete, this._time);
  };

  return DelayEvent;
}();

var CssAnimationEvent = function () {
  function CssAnimationEvent(element, className) {
    classCallCheck(this, CssAnimationEvent);

    this._element = element;
    this._animation = className;
  }

  CssAnimationEvent.prototype.start = function start(complete) {
    var _this = this;

    this.listener = function () {
      _this.stop();
      complete();
    };

    this._element.addEventListener('animationend', this.listener);
    this._element.classList.add(this._animation);
  };

  CssAnimationEvent.prototype.stop = function stop() {
    this._element.removeEventListener('animationend', this.listener);
    this._element.classList.remove(this._animation);
  };

  return CssAnimationEvent;
}();

var SetStyleEvent = function () {
  function SetStyleEvent(element, style) {
    classCallCheck(this, SetStyleEvent);

    this._element = element;
    this._style = style;
  }

  SetStyleEvent.prototype.start = function start(complete) {
    for (var key in this._style) {
      if (this._style.hasOwnProperty(key)) {
        this._element.style[key] = this._style[key];
      }
    }

    complete();
  };

  return SetStyleEvent;
}();

var TimelineBuilder = function () {
  function TimelineBuilder() {
    classCallCheck(this, TimelineBuilder);

    this._events = [];
  }

  TimelineBuilder.prototype.callback = function callback() {
    this._events.push(new (Function.prototype.bind.apply(CallbackEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };

  TimelineBuilder.prototype.delay = function delay() {
    this._events.push(new (Function.prototype.bind.apply(DelayEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };

  TimelineBuilder.prototype.cssAnimation = function cssAnimation() {
    this._events.push(new (Function.prototype.bind.apply(CssAnimationEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };

  TimelineBuilder.prototype.setStyle = function setStyle() {
    this._events.push(new (Function.prototype.bind.apply(SetStyleEvent, [null].concat(Array.prototype.slice.call(arguments))))());
    return this;
  };

  TimelineBuilder.prototype.buildTimeline = function buildTimeline() {
    return new Timeline(this._events);
  };

  return TimelineBuilder;
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
    var runningCount = this._children.length;
    var childComplete = function childComplete() {
      runningCount--;
      if (runningCount === 0) {
        complete();
      }
    };

    for (var i = 0; i < this._children.length; ++i) {
      this._children[i].start(childComplete);
    }
  };

  ConcurrentEvent.prototype.stop = function stop() {
    for (var i = 0; i < this._children.length; ++i) {
      this._children[i].stop();
    }
  };

  return ConcurrentEvent;
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

exports.Timeline = Timeline;
exports.TimelineBuilder = TimelineBuilder;
exports.CallbackEvent = CallbackEvent;
exports.ConcurrentEvent = ConcurrentEvent;
exports.CssAnimationEvent = CssAnimationEvent;
exports.DelayEvent = DelayEvent;
exports.SetStyleEvent = SetStyleEvent;
exports.TimelineEvent = TimelineEvent;

return exports;

}({}));
