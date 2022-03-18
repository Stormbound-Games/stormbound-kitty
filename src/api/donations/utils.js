import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"user": user -> { name, "slug": slug.current },
date
`

export const MAPPER = donation => {
  donation.date = serializeDate(donation.date)
  return donation
}
