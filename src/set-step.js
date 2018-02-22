import applyState from './apply-state'

export class SetStep {
  constructor (element, state) {
    this._element = element
    this._state = state
  }

  start (next) {
    applyState(this._element, this._state)
    next()
  }
}
