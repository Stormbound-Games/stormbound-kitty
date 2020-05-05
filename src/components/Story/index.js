import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Article from '../Article'
import Error from '../Error'
import Notice from '../Notice'
import Loader from '../Loader'
import MicroMarkdown from '../MicroMarkdown'
import PageMeta from '../PageMeta'
import StoriesMore from '../StoriesMore'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'
import useFetch from '../../hooks/useFetch'

export default function Story(props) {
  const match = useRouteMatch()
  const { storyId: id } = match.params
  const path = '/stories/' + id + '.json'
  const { data: story, error, loading } = useFetch(path)
  const card = story ? getRawCardData(story.cardId) : {}

  return (
    <div className='Story'>
      {error ? (
        <Error error='Error fetching story.' />
      ) : loading ? (
        <Loader />
      ) : story ? (
        <Article
          title={story.title}
          author={story.author}
          readingTime={getReadingTime(story.content)}
          backLink={{
            to: '/stories/' + story.category,
            children: 'Back to stories',
          }}
        >
          <MicroMarkdown content={story.content} />
        </Article>
      ) : null}

      <StoriesMore {...story} />

      <Notice>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </Notice>

      {story && (
        <PageMeta
          title={story.title}
          author={story.author}
          image={card.image}
          description={getExcerpt(story.content.replace('---', ''), 160)}
        />
      )}
    </div>
  )
}
