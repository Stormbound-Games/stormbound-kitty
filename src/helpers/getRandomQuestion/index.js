import arrayRandom from '../arrayRandom'
import shuffle from '../shuffle'
import questions from '../../bot/commands/trivia/questions'

const MAX_CHOICES = 5
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const getLetters = (amount, useRandomLetters = false) => {
  const letters = []

  for (let i = 0; i < amount; i++) {
    let letter = useRandomLetters ? arrayRandom(LETTERS) : LETTERS[i]

    while (useRandomLetters && letters.includes(letter)) {
      letter = arrayRandom(LETTERS)
    }

    letters.push(letter)
  }

  return letters
}

const getRandomQuestion = (useRandomLetters = true) => {
  // Pick a question at random.
  let question = arrayRandom(questions)

  // If the question is dynamic (function), resolve it.
  if (typeof question === 'function') {
    question = question()
  }

  // Shuffle all options while discarding the answer if it is part of it (which
  // can happen in ranges and dynamically generated arrays).
  const options = shuffle(
    question.options.filter(option => option !== question.answer)
  )

  // Compose the choices by combining 4 wrong options and the correct answer and
  // shuffle the 5 of them to vary the position of the correct answer. Create an
  // object mapping letters (either random or not based on the configuration) to
  // choices (all strings for consistency). making them all a string for
  // consistency.
  const letters = getLetters(MAX_CHOICES, useRandomLetters)
  const choices = shuffle([
    ...options.slice(0, MAX_CHOICES - 1),
    question.answer,
  ]).reduce(
    (choices, choice, index) => ({
      ...choices,
      [letters[index]]: String(choice),
    }),
    {}
  )

  return { question, choices }
}

export default getRandomQuestion
