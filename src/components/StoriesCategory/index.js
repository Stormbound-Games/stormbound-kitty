import React from 'react'
import stories from '../../data/stories'
import PageMeta from '../PageMeta'
import StoriesHeader from '../StoriesHeader'
import Stories from '../Stories'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'
import sortCards from '../../helpers/sortCards'
import useViewportWidth from '../../hooks/useViewportWidth'
import { STORY_CATEGORIES } from '../../constants/stories'

export default function StoriesCategory(props) {
  const viewportWidth = useViewportWidth()
  const categoryName = capitalise(props.category)
  const categoryStories = stories.filter(
    story => story.category === props.category
  )
  const sortCardsInCategory = (a, b) =>
    sortCards()(getRawCardData(a.cardId), getRawCardData(b.cardId))

  return (
    <>
      <StoriesHeader background={STORY_CATEGORIES[props.category].background}>
        {viewportWidth >= 700
          ? STORY_CATEGORIES[props.category].title
          : `${categoryName} stories`}
      </StoriesHeader>

      <Stories
        stories={categoryStories.sort(sortCardsInCategory)}
        columns={3}
      />

      <PageMeta
        title={`${categoryName} stories`}
        description={`Stories from the community about ${categoryName} Stormbound cards`}
      />
    </>
  )
}
