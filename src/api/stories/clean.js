import getExcerpt from '~/helpers/getExcerpt'
import getReadingTime from '~/helpers/getReadingTime'
import blocksToText from '~/helpers/blocksToText'

const clean = story => {
  const [year, month] = story.date.split(/[-/]/g)
  const text = blocksToText(story.body)

  story.id = story.slug.current
  story.slug = story.slug.current
  story.date = month + '/' + year
  story.content = story.body
  story.excerpt = getExcerpt(text, 150)
  story.readingTime = getReadingTime(text)
  story.cardId = story.cardRef ? story.cardRef.id : null

  delete story.cardRef
  delete story._createdAt
  delete story._updatedAt
  delete story._id
  delete story._rev
  delete story._type

  return story
}

export default clean
