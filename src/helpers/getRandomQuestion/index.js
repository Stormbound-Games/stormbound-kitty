import arrayRandom from '#helpers/arrayRandom'
import shuffle from '#helpers/shuffle'

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

const getRandomQuestion = (questions, useRandomLetters = true) => {
  // Pick a question at random.
  const question = arrayRandom(questions)

  // Shuffle all options while discarding the answer if it is part of it and
  // preserve a maximum of 4. Then add the answer, and shuffle the resulting
  // array once more to avoid the answer being the last one.
  const options = shuffle(
    shuffle(question.options.filter(option => option !== question.answer))
      .slice(0, MAX_CHOICES - 1)
      .concat(question.answer)
  )

  // Create an object mapping letters (either random or not based on the
  // configuration) to choices (all strings for consistency).
  const letters = getLetters(MAX_CHOICES, useRandomLetters)
  const choices = options.reduce(
    (acc, choice, index) => ({ ...acc, [letters[index]]: String(choice) }),
    {}
  )

  return { question, choices }
}

export default getRandomQuestion
