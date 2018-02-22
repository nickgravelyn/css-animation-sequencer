import applyState from './apply-state'

export class SetStep {
  constructor (element, state) {
    this.element = element
    this.state = state
  }

  start (next) {
    applyState(this.element, this.state)
    next()
  }
}
