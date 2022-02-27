import React from 'react'
import { useInView } from 'react-intersection-observer'
import { CardsContext } from '~/components/CardsProvider'
import BlocksRenderer from '~/components/BlocksRenderer'
import Page from '~/components/Page'
import HorizontalRule from '~/components/HorizontalRule'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import Link from '~/components/Link'
import Stories from '~/components/Stories'
import Title from '~/components/Title'
import { STORY_CATEGORIES } from '~/constants/stories'

export default React.memo(function Story(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const [ref, inView] = useInView()
  const { story, moreStories } = props

  return (
    <>
      <Page
        title={story.title}
        author={story.author}
        image={'/assets/images/cards/' + cardsIndex[story.cardId].image}
        description={story.excerpt}
        background={STORY_CATEGORIES[story.category].background}
        meta={story.readingTime}
        action={{
          to: '/stories/' + story.category,
          children: 'Back to stories',
        }}
        withAvif
        isEditorialContent
        withDropCap
      >
        <Page.Narrow>
          <BlocksRenderer value={story.content} />
        </Page.Narrow>
      </Page>

      <div ref={ref}>
        {inView && moreStories.length > 0 && (
          <>
            <Title>
              {story.saga ? (
                'Other chapters from this saga'
              ) : (
                <>
                  Other stories by{' '}
                  <Link to={`/members/${story.author.toLowerCase()}`}>
                    {story.author}
                  </Link>
                </>
              )}
            </Title>
            <Stories stories={moreStories} />
          </>
        )}
      </div>

      <HorizontalRule />

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
    </>
  )
})
