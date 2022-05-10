import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
name,
"slug": slug.current,
id,
category,
"authors": users[] -> { name, "slug": slug.current },
date,
"cardId": card -> id.current,
excerpt
`

export const MAPPER = guide => {
  guide.date = serializeDate(guide.date)

  return guide
}
