import { SetStep } from './set-step'
import { TweenStep } from './tween-step'
import { TimelineStep } from './timeline-step'
import { PredefinedStep } from './predefined-step'

export class Timeline {
  constructor () {
    this.steps = []
    this.baked = false

    this.nextExecute = () => {
      this.toNextStep()
      this.runStep()
    }
  }

  set (element, state) {
    this.throwIfBaked()
    this.steps.push(new SetStep(element, state))
  }

  tween (element, duration, state) {
    this.throwIfBaked()
    this.steps.push(new TweenStep(element, duration, state))
  }

  play () {
    this.throwIfBaked()

    if (arguments.length === 1) {
      const timeline = arguments[0]
      timeline.bakedByParent = true
      this.steps.push(new TimelineStep(timeline))
      return
    }

    this.steps.push(new PredefinedStep(arguments[0], arguments[1]))
  }

  start (options = {}) {
    this.bake()
    this.iterations = options.iterations || 1
    this.stepIndex = 0
    this.runStep()
  }

  stop () {
    const current = this.steps[this.stepIndex]
    if (current && current.stop) {
      current.stop()
    }

    if (!this.bakedByParent) {
      this._styleElement.parentNode.removeChild(this._styleElement)
      this._styleElement = null
      this.baked = false
    }
  }

  throwIfBaked () {
    if (this.baked) throw new Error('Cannot add to a Timeline after play is called')
  }

  runStep () {
    if (this.iterations === 0) {
      this.stop()
      return
    }

    this.steps[this.stepIndex].start(this.nextExecute)
  }

  toNextStep () {
    this.stepIndex++
    if (this.steps.length <= this.stepIndex) {
      this.stepIndex = 0

      if (this.iterations === Infinity) return
      if (this.iterations > 0) this.iterations--
    }
  }

  bake () {
    if (this.baked) return
    if (this.bakedByParent) return

    this._styleElement = document.createElement('style')
    this._styleElement.textContent += this.createCss()
    document.head.appendChild(this._styleElement)

    this.baked = true
  }

  createCss () {
    let timelineCss = ''
    for (let i = 0; i < this.steps.length; ++i) {
      const step = this.steps[i]
      if (!step.createCss) {
        continue
      }
      timelineCss += `${step.createCss()}\n`
    }
    return timelineCss
  }
}
