import clamp from '../clamp'

const parseTriviaSettings = message => {
  const params = {}
  const modeMatch = message.match(/(card|question)/i)
  const durationMatch = message.match(/(\d+)/)

  if (!modeMatch) return {}

  params.mode = modeMatch[1].toUpperCase()

  if (durationMatch) {
    params.duration = +(durationMatch[1] || undefined)
  }

  if (isNaN(params.duration)) {
    params.duration = params.mode === 'CARD' ? 75 : 15
  } else {
    const min = params.mode === 'CARD' ? 30 : 8
    const max = params.mode === 'CARD' ? 120 : 20
    params.duration = clamp(params.duration, min, max)
  }

  return params
}

export default parseTriviaSettings
