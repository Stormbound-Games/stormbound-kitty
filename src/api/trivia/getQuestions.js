import { getEntries } from '#helpers/sanity'
import { FIELDS } from './utils.js'
import getDynamicQuestions from '#helpers/getDynamicQuestions'
import getCards from '#api/cards/getCards'

const getQuestions = async ({ isPreview, cards } = {}) => {
  if (!cards) cards = await getCards({ isPreview })
  const questions = await getEntries({
    conditions: ['_type == "trivia"'],
    fields: FIELDS,
    options: { isPreview },
  })
  const dynamicQuestions = await getDynamicQuestions(cards)

  return [...questions, ...dynamicQuestions]
}

export default getQuestions
