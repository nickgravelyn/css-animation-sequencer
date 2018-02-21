import { SetStep } from './set-step'
import { ToStep } from './to-step'
import { RunStep } from './run-step'

export class Timeline {
  constructor () {
    this._steps = []
    this._baked = false

    this._nextExecute = () => {
      this._toNextStep()
      this._runStep()
    }
  }

  set (element, state) {
    this._throwIfBaked()
    this._steps.push(new SetStep(element, state))
  }

  to (element, duration, state) {
    this._throwIfBaked()
    this._steps.push(new ToStep(element, duration, state))
  }

  run (timeline) {
    this._throwIfBaked()
    this._steps.push(new RunStep(timeline))
  }

  play (options = {}) {
    if (!this._baked) this._bake()

    this._iterations = options.iterations || 1
    this._stepIndex = 0
    this._runStep()
  }

  stop () {
    this._steps[this._stepIndex].stop()
    this._styleElement.parentNode.removeChild(this._styleElement)
    this._styleElement = null
    this._baked = false
  }

  _throwIfBaked () {
    if (this._baked) throw new Error('Cannot add to a Timeline after play is called')
  }

  _runStep () {
    if (this._iterations === 0) {
      this.stop()
      return
    }

    this._steps[this._stepIndex].start(this._nextExecute)
  }

  _toNextStep () {
    this._stepIndex++
    if (this._steps.length <= this._stepIndex) {
      this._stepIndex = 0

      if (this._iterations === Infinity) return
      if (this._iterations > 0) this._iterations--
    }
  }

  _bake () {
    if (this._baked) return

    this._styleElement = document.createElement('style')
    for (let i = 0; i < this._steps.length; ++i) {
      const css = this._steps[i].createCss()
      if (css) {
        this._styleElement.textContent += `${css}\n`
      }
    }
    document.head.appendChild(this._styleElement)

    this._baked = true
  }
}
