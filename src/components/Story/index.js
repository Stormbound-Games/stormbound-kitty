import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import Article from '../Article'
import Error from '../Error'
import Notice from '../Notice'
import Only from '../Only'
import Link from '../Link'
import Loader from '../Loader'
import MicroMarkdown from '../MicroMarkdown'
import PageMeta from '../PageMeta'
import StoriesMore from '../StoriesMore'
import { STORY_CATEGORIES } from '../../constants/stories'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'
import useFetch from '../../hooks/useFetch'

export default React.memo(function Story(props) {
  const [ref, inView] = useInView()
  const match = useRouteMatch()
  const { storyId: id } = match.params
  const path = '/stories/' + id + '.json'
  const { data: story, error, loading } = useFetch(path)
  const card = story ? getRawCardData(story.cardId) : {}
  const { background } = story ? STORY_CATEGORIES[story.category] : {}
  const type = story ? story.type : undefined

  return (
    <>
      {error ? (
        <Error error='Error fetching story.' />
      ) : loading ? (
        <Loader />
      ) : story ? (
        <Article
          extend={
            type === 'poem'
              ? { textAlign: 'center', fontSize: '120%' }
              : undefined
          }
          title={story.title}
          author={story.author}
          background={background}
          meta={getReadingTime(story.content)}
          action={{
            to: '/stories/' + story.category,
            children: 'Back to stories',
          }}
          withAvif
          isEditorialContent
          withDropCap={story.type !== 'poem'}
        >
          <Article.Narrow>
            <MicroMarkdown content={story.content} />
          </Article.Narrow>
        </Article>
      ) : null}

      <div ref={ref}>{inView && <StoriesMore {...story} />}</div>

      <hr />

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

      {story && (
        <PageMeta
          title={story.title}
          author={story.author}
          image={'/assets/images/cards/' + card.image}
          description={getExcerpt(story.content.replace('---', ''), 160)}
        />
      )}
    </>
  )
})
