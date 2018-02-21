function keyframeFromState (state) {
  let keyframe = ''

  for (let key in state) {
    if (state.hasOwnProperty(key)) {
      keyframe += `${key}: ${state[key]}; `
    }
  }

  return `{ ${keyframe}}`
}

export class AnimationBuilder {
  constructor (name, initialState) {
    this._name = name
    this._initialState = initialState
    this._keyframes = []
  }

  to (duration, state) {
    this._keyframes.push({ duration, state })
  }

  buildCss () {
    const totalDuration = this._keyframes.reduce((a, c) => a + c.duration, 0)

    let css = ''
    css += `@keyframes ${this._name} { 0% ${keyframeFromState(this._initialState)} `
    let runningPercentage = 0
    this._keyframes.forEach(f => {
      runningPercentage += f.duration / totalDuration * 100
      css += `${runningPercentage}% ${keyframeFromState(f.state)} `
    })
    css += '}'
    css += ` .${this._name} { animation-name: ${this._name}; animation-duration: ${totalDuration / 1000}s; animation-fill-mode: both; }`
    return css
  }
}
