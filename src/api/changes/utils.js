import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"id": card -> id,
type,
date,
description,
from[] { stat, value }
`

export const MAPPER = change => {
  change.date = serializeDate(change.date, false)
  change.timestamp = new Date(change.date).valueOf()
  change.from = change.from
    ? change.from.reduce((acc, entry) => {
        acc[entry.stat] = entry.value
        return acc
      }, {})
    : null

  return change
}
