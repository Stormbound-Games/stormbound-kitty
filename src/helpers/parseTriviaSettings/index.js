import clamp from '../clamp'

const parseTriviaSettings = message => {
  const params = {}
  const modeMatch = message.match(/(card|question|image)/i)
  const durationMatch = message.match(/(\d+)/)

  if (!modeMatch) return {}

  params.mode = modeMatch[1].toUpperCase()

  if (message.includes('hard')) {
    params.difficulty = 'HARD'
  }

  if (durationMatch) {
    params.duration = +(durationMatch[1] || undefined)
  }

  if (isNaN(params.duration)) {
    params.duration = params.mode === 'QUESTION' ? 15 : 75
  } else {
    const min = params.mode === 'QUESTION' ? 8 : 30
    const max = params.mode === 'QUESTION' ? 20 : 120
    params.duration = clamp(params.duration, min, max)
  }

  return params
}

export default parseTriviaSettings
