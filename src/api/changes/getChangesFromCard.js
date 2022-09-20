import { getEntries } from '#helpers/sanity'
import { FIELDS, MAPPER } from './utils.js'

const getChangesFromCard = async ({ id, isPreview } = {}) => {
  const changes = await getEntries({
    conditions: ['_type == "changelog"', 'card -> id.current match $id'],
    params: { id },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })
  const hasReleaseChange = changes.some(
    change =>
      change.description === 'Added to the game' ||
      change.description === 'Added in Brawl mode'
  )

  if (!hasReleaseChange) {
    changes.push({
      date: '2017-09-18',
      description: 'Released with the game',
      id: id,
      type: 'INFO',
      timestamp: 1505728800000,
    })
  }

  return changes.map(MAPPER).sort((a, b) => b.timestamp - a.timestamp)
}

export default getChangesFromCard
