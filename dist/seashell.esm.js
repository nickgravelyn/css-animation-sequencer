var applyState = (element, state) => {
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      element.style[key] = state[key];
    }
  }
}

class SetStep {
  constructor (element, state) {
    this._element = element;
    this._state = state;
  }

  start (next) {
    applyState(this._element, this._state);
    next();
  }

  stop () {}
  createCss () {}
}

const randomInt = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

class ToStep {
  constructor (element, duration, state) {
    this._element = element;
    this._duration = duration;
    this._state = state;
    this._animation = `seashell-${randomInt()}`;
  }

  start (next) {
    this._listener = () => {
      this.stop();
      applyState(this._element, this._state);
      next();
    };

    this._element.addEventListener('animationend', this._listener);
    this._element.classList.add(this._animation);
  }

  stop () {
    this._element.removeEventListener('animationend', this._listener);
    this._element.classList.remove(this._animation);
  }

  createCss (timelineId) {
    let css = `.${this._animation} { animation: ${this._animation} ${this._duration / 1000}s both; } `;
    css += `@keyframes ${this._animation} { to { `;

    for (const key in this._state) {
      if (this._state.hasOwnProperty(key)) {
        css += `${key}: ${this._state[key]}; `;
      }
    }

    return css + '} }'
  }
}

class RunStep {
  constructor (timeline) {
    this._timeline = timeline;
  }

  start (next) {
    this._timeline.play();
    next();
  }

  stop () {
    this._timeline.stop();
  }

  createCss () {}
}

class Timeline {
  constructor () {
    this._steps = [];
    this._baked = false;

    this._nextExecute = () => {
      this._toNextStep();
      this._runStep();
    };
  }

  set (element, state) {
    this._throwIfBaked();
    this._steps.push(new SetStep(element, state));
  }

  to (element, duration, state) {
    this._throwIfBaked();
    this._steps.push(new ToStep(element, duration, state));
  }

  run (timeline) {
    this._throwIfBaked();
    this._steps.push(new RunStep(timeline));
  }

  play (options = {}) {
    if (!this._baked) this._bake();

    this._iterations = options.iterations || 1;
    this._stepIndex = 0;
    this._runStep();
  }

  stop () {
    this._steps[this._stepIndex].stop();
    this._styleElement.parentNode.removeChild(this._styleElement);
    this._styleElement = null;
    this._baked = false;
  }

  _throwIfBaked () {
    if (this._baked) throw new Error('Cannot add to a Timeline after play is called')
  }

  _runStep () {
    if (this._iterations === 0) {
      this.stop();
      return
    }

    this._steps[this._stepIndex].start(this._nextExecute);
  }

  _toNextStep () {
    this._stepIndex++;
    if (this._steps.length <= this._stepIndex) {
      this._stepIndex = 0;

      if (this._iterations === Infinity) return
      if (this._iterations > 0) this._iterations--;
    }
  }

  _bake () {
    if (this._baked) return

    this._styleElement = document.createElement('style');
    for (let i = 0; i < this._steps.length; ++i) {
      const css = this._steps[i].createCss();
      if (css) {
        this._styleElement.textContent += `${css}\n`;
      }
    }
    document.head.appendChild(this._styleElement);

    this._baked = true;
  }
}

export { Timeline };
