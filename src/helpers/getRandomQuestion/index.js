import arrayRandom from '../arrayRandom'
import shuffle from '../shuffle'
import questions from '../../bot/commands/trivia/questions'
import { LETTERS } from '../../bot/commands/trivia'

const getRandomQuestion = difficulty => {
  const matchesDifficulty = question =>
    !difficulty || difficulty === question.difficulty
  const candidates = questions.filter(matchesDifficulty)

  let question = arrayRandom(candidates)

  if (typeof question === 'function') {
    question = question()
  }

  const options = shuffle(
    question.options.filter(option => option !== question.answer)
  )
  const wrongChoices = options.slice(0, LETTERS.length - 1).map(String)
  const choices = shuffle([...wrongChoices, question.answer])

  return { question, choices }
}

export default getRandomQuestion
