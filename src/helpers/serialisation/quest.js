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

export const deserialiseQuest = string =>
  string.split(';').reduce((acc, value, index) => {
    const property = QUEST_PROPERTIES[index]
    acc[property.name] = property.resolve(value)

    return acc
  }, {})

export const serialiseQuest = formState =>
  [
    encodeURIComponent(formState.name),
    formState.amount,
    getShortCurrency(formState.currency),
    formState.difficulty,
    encodeURIComponent(formState.description),
  ].join(';')

export default {
  serialise: quest => base64Encode(serialiseQuest(quest)),
  deserialise: hash => deserialiseQuest(base64Decode(hash)),
}
