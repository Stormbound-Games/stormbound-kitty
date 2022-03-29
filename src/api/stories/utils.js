import serializeDate from '~/helpers/serializeDate'
import getReadingTime from '~/helpers/getReadingTime'
import getExcerpt from '~/helpers/getExcerpt'

export const FIELDS = `
title,
date,
"author": user -> { name, "slug": slug.current },
"slug": slug.current,
"cardId": cardRef -> { "id": id.current }.id,
"cardData": card,
category,
saga,
"text": pt::text(body)
`

export const MAPPER = story => {
  story.date = serializeDate(story.date)
  story.readingTime = getReadingTime(story.text)
  story.excerpt = getExcerpt(story.text, 150)
  delete story.text

  if (story.cardData) {
    story.cardData = JSON.parse(story.cardData)
  }

  return story
}
