import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
date,
entries
`

export const MAPPER = contribution => {
  contribution.date = serializeDate(contribution.date)

  return contribution
}
