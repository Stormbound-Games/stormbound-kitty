import clamp from '../clamp'

const parseTriviaSettings = message => {
  const params = {}
  const modeMatch = message.match(/(card|question)/i)
  const durationMatch = message.match(/(\d+)/)
  const difficultyMatch = message.match(/(easy|medium|hard)/i)

  if (!modeMatch) return {}

  params.mode = modeMatch[1].toUpperCase()

  if (durationMatch) {
    params.duration = +(durationMatch[1] || undefined)
  }

  if (difficultyMatch) {
    params.difficulty = difficultyMatch[1].toUpperCase()
  }

  // If the duration is not provided, and the mode is `CARD`, rely on the
  // difficulty (if provided) to determine the duration of the game.
  if (isNaN(params.duration) && params.mode === 'CARD') {
    switch (params.difficulty) {
      case 'EASY':
        params.duration = 120
        break
      case 'HARD':
        params.duration = 30
        break
      case 'MEDIUM':
      default:
        params.duration = 75
        break
    }
    // If the duration is not provided, and the mode is `QUESTION`, do not use
    // the difficulty to determine the duration, since the difficulty is
    // already considered in the type of question that is asked.
  } else if (isNaN(params.duration)) {
    params.duration = 15
  } else {
    // Finally, if the duration is provided, clamp it based on the game mode
    // so it isn’t too short or too long either.
    if (params.mode === 'CARD') {
      params.duration = clamp(params.duration, 30, 120)
    } else if (params.mode === 'QUESTION') {
      params.duration = clamp(params.duration, 8, 20)
    }
  }

  return params
}

export default parseTriviaSettings
