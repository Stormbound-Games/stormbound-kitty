import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import Loader from '~/components/Loader'
import Stories from '~/components/Stories'
import useLazyLoad from '~/hooks/useLazyLoad'
import useViewportSize from '~/hooks/useViewportSize'

export default React.memo(function StoryCategory(props) {
  const { viewportWidth } = useViewportSize()
  const { loading: loadingMore, items, ref } = useLazyLoad(props.stories, 3 * 2)
  const { title, background, shortName } = props.category

  return (
    <Page
      background={background}
      title={viewportWidth >= 700 ? title : shortName}
      description={`Read immersive stories from the community about ${title}`}
      action={{ to: '/stories', children: 'Back to stories' }}
    >
      <Stories stories={items} />
      {loadingMore && <Loader />}
      <div ref={ref} />

      <Notice icon='quill'>
        Looking to contribute to the Stormbound lore?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-story' }}>
          Have your own story published
        </Link>
        .
      </Notice>
    </Page>
  )
})
