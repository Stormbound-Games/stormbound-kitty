import { getLongCurrency } from '~/helpers/encoding'
import { getShortCurrency } from '~/helpers/encoding'
import { base64Decode, base64Encode } from '~/helpers/base64'

const QUEST_PROPERTIES = [
  { name: 'name', resolve: value => decodeURIComponent(value) },
  { name: 'amount', resolve: value => +value },
  { name: 'currency', resolve: value => getLongCurrency(value) },
  { name: 'difficulty', resolve: value => +value },
  { name: 'description', resolve: value => decodeURIComponent(value) },
]

export const deserializeQuest = string =>
  string.split(';').reduce((acc, value, index) => {
    const property = QUEST_PROPERTIES[index]
    acc[property.name] = property.resolve(value)

    return acc
  }, {})

export const serializeQuest = formState =>
  [
    encodeURIComponent(formState.name),
    formState.amount,
    getShortCurrency(formState.currency),
    formState.difficulty,
    encodeURIComponent(formState.description),
  ].join(';')

const quest = {
  serialize: quest => base64Encode(serializeQuest(quest)),
  deserialize: hash => deserializeQuest(base64Decode(hash)),
}

export default quest
