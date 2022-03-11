import React from 'react'
import { STORY_CATEGORIES } from '~/constants/stories'
import Page from '~/components/Page'
import Teasers from '~/components/Teasers'

const ITEMS = Object.keys(STORY_CATEGORIES).map(name => {
  const category = STORY_CATEGORIES[name]

  return {
    meta: category.shortName,
    title: category.title,
    excerpt: category.content,
    cardId: category.cardId,
    to: `/stories/${name}`,
  }
})

export default React.memo(function StoryIndex(props) {
  return (
    <Page
      title='Stories'
      description='Read immersive stories from the community about Stormbound'
    >
      <Teasers items={ITEMS} />
    </Page>
  )
})
