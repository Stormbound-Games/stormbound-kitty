import arrayRandom from '../arrayRandom'
import shuffle from '../shuffle'
import questions from '../../bot/commands/trivia/questions'
import { LETTERS } from '../../bot/commands/trivia'

const getRandomQuestion = difficulty => {
  // Consider all questions matching the current difficulty (if defined).
  const matchesDifficulty = question =>
    !difficulty || difficulty === question.difficulty
  const candidates = questions.filter(matchesDifficulty)

  // Pick a question at random.
  let question = arrayRandom(candidates)

  // If the question is dynamic (function), resolve it.
  if (typeof question === 'function') {
    question = question()
  }

  // Shuffle all options while discarding the answer if it is part of it (which
  // can happen in ranges and dynamically generated arrays).
  const options = shuffle(
    question.options.filter(option => option !== question.answer)
  )

  // Compose the choices by combining 4 wrong options and the correct answer,
  // making them all a string for consistency, and shuffle the 5 of them to
  // vary the position of the correct answer.
  const choices = shuffle(
    [...options.slice(0, LETTERS.length - 1), question.answer].map(String)
  )

  // Stringify the answer as well for consistency.
  question.answer = String(question.answer)

  return { question, choices }
}

export default getRandomQuestion
