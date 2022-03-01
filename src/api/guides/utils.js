import serializeDate from '~/helpers/serializeDate'
import getExcerpt from '~/helpers/getExcerpt'

export const FIELDS = `
_id,
name,
"slug": slug.current,
id,
category,
authors,
date,
"cardId": card -> id,
"text": pt::text(content)
`

export const MAPPER = guide => {
  guide.date = serializeDate(guide.date)
  guide.excerpt = getExcerpt(guide.text, 150)
  delete guide.text

  return guide
}
