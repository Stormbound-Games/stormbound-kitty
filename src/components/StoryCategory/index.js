import React from 'react'
import { Link } from 'react-router-dom'
import { STORY_CATEGORIES } from '../../constants/stories'
import Error from '../Error'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import Stories from '../Stories'
import useFetch from '../../hooks/useFetch'
import useViewportWidth from '../../hooks/useViewportWidth'

export default React.memo(function StoryCategory(props) {
  const viewportWidth = useViewportWidth()
  const { data = [], loading, error } = useFetch('/stories.json')
  const stories = data
    .filter(story => story.category === props.category)
    .sort((a, b) => {
      const indexA = parseInt(a.title, 10)
      const indexB = parseInt(b.title, 10)

      return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
    })
  const { title, background, shortName } = STORY_CATEGORIES[props.category]

  return (
    <>
      <HeaderBanner
        background={background}
        title={viewportWidth >= 700 ? title : shortName}
      />

      {error ? (
        <Error error='Error fetching stories.' />
      ) : loading ? (
        <Loader />
      ) : (
        <Stories stories={stories} columns={3} />
      )}

      <Notice icon='quill'>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </Notice>

      <PageMeta
        title={`${title} stories`}
        description={`Read immersive stories from the community about ${title}`}
      />
    </>
  )
})
