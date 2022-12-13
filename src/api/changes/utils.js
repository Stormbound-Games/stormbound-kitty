import serializeDate from '#helpers/serializeDate'

export const FIELDS = `
"id": coalesce(
  card -> id.current,
  *[ _type == "card" && _id in ["drafts." + ^.card._ref, ^.card._ref] ][0].id.current
),
type,
date,
description,
from[] { stat, value }
`

export const MAPPER = change => {
  change.timestamp = new Date(change.date).valueOf()
  change.date = serializeDate(change.date, false)
  change.from = change.from
    ? change.from.reduce((acc, entry) => {
        acc[entry.stat] = entry.value
        return acc
      }, {})
    : null

  return change
}
