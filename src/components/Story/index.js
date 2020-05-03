import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Article from '../Article'
import Error from '../Error'
import InfoHint from '../InfoHint'
import Loader from '../Loader'
import MicroMarkdown from '../MicroMarkdown'
import PageMeta from '../PageMeta'
import Stories from '../Stories'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'
import useFetch from '../../hooks/useFetch'

const getStoriesFromAuthor = (stories = [], story) =>
  story ? stories.filter(s => s.author === story.author) : []

export default function Story(props) {
  const match = useRouteMatch()
  const { storyId: id } = match.params
  const path = '/stories/' + id + '.json'
  const { data: story, loading } = useFetch(path)
  const { data: stories = [] } = useFetch('/stories.json')
  const card = story ? getRawCardData(story.cardId) : {}
  const storiesFromAuthor = getStoriesFromAuthor(stories, story)

  return (
    <div className='Story'>
      {loading ? (
        <Loader />
      ) : story ? (
        <Article
          title={story.title}
          author={story.author}
          readingTime={getReadingTime(story.content)}
          backLink={{
            to: '/stories',
            children: 'Back to stories',
          }}
        >
          <MicroMarkdown content={story.content} />
        </Article>
      ) : (
        <Error error='Error fetching stories.' />
      )}

      {storiesFromAuthor.length > 1 && (
        <>
          <Title>
            Other stories by{' '}
            <Link to={`/member/${story.author}`}>{story.author}</Link>
          </Title>
          <Stories
            stories={storiesFromAuthor.filter(s => story.title !== s.title)}
            columns={3}
          />
        </>
      )}

      <InfoHint>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </InfoHint>

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
