import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
author,
date,
entries
`

export const MAPPER = contribution => {
  contribution.date = serializeDate(contribution.date)
  return contribution
}
