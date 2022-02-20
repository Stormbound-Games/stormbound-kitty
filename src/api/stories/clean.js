const clean = story => {
  const [year, month, day] = story.date.split('-')

  story.id = story.slug.current
  story.slug = story.slug.current
  story.date = month + '/' + year
  story.excerpt = story.content.slice(0, 150) + '…'

  delete story._createdAt
  delete story._updatedAt
  delete story._id
  delete story._rev
  delete story._type

  return story
}

export default clean
