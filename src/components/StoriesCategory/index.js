import React from 'react'
import stories from '../../data/stories'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import StoriesHeader from '../StoriesHeader'
import StoryTeaser from '../StoryTeaser'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'
import sortCards from '../../helpers/sortCards'
import chunk from '../../helpers/chunk'
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

      {chunk(categoryStories.sort(sortCardsInCategory), 3).map((row, index) => {
        return (
          <Row key={index} wideGutter desktopOnly>
            <Column width='1/3'>{row[0] && <StoryTeaser {...row[0]} />}</Column>
            <Column width='1/3'>{row[1] && <StoryTeaser {...row[1]} />}</Column>
            <Column width='1/3'>{row[2] && <StoryTeaser {...row[2]} />}</Column>
          </Row>
        )
      })}

      <PageMeta
        title={`${categoryName} stories`}
        description={`Stories from the community about ${categoryName} Stormbound cards`}
      />
    </>
  )
}
