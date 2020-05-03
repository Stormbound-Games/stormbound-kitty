import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../Error'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import HeaderBanner from '../HeaderBanner'
import InfoHint from '../InfoHint'
import Stories from '../Stories'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'
import sortCards from '../../helpers/sortCards'
import useViewportWidth from '../../hooks/useViewportWidth'
import useFetch from '../../hooks/useFetch'
import { STORY_CATEGORIES } from '../../constants/stories'

export default function StoriesCategory(props) {
  const { loading, error, data: stories = [] } = useFetch('/stories.json')
  const viewportWidth = useViewportWidth()
  const categoryName = capitalise(props.category)
  const categoryStories = stories.filter(
    story => story.category === props.category
  )
  const sortCardsInCategory = (a, b) =>
    sortCards()(getRawCardData(a.cardId), getRawCardData(b.cardId))

  return (
    <>
      <HeaderBanner
        background={STORY_CATEGORIES[props.category].background}
        title={
          viewportWidth >= 700
            ? STORY_CATEGORIES[props.category].title
            : `${categoryName} stories`
        }
      />

      {error ? (
        <Error error='Error fetching stories.' />
      ) : loading ? (
        <Loader />
      ) : (
        <Stories
          stories={categoryStories.sort(sortCardsInCategory)}
          columns={3}
        />
      )}

      <InfoHint icon='quill'>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </InfoHint>

      <PageMeta
        title={`${categoryName} stories`}
        description={`Read immersive stories from the community about ${categoryName} Stormbound cards`}
      />
    </>
  )
}
