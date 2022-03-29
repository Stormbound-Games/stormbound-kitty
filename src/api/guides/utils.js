import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
name,
"slug": slug.current,
id,
category,
"authors": user[] -> { name, "slug": slug.current },
date,
"cardId": card -> { "id": id.current }.id,
excerpt
`

export const MAPPER = guide => {
  guide.date = serializeDate(guide.date)
  delete guide.text

  return guide
}
