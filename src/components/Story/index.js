import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import stories from '../../data/stories'
import Article from '../Article'
import Error from '../Error'
import InfoHint from '../InfoHint'
import MicroMarkdown from '../MicroMarkdown'
import PageMeta from '../PageMeta'
import Stories from '../Stories'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'

const getStoriesFromAuthor = author =>
  stories.filter(story => story.author === author)

export default function Story(props) {
  const match = useRouteMatch()
  const { storyId: id } = match.params

  let story = null
  let storiesByAuthor = []

  try {
    const decoded = decodeURIComponent(window.atob(id))
    const [title, author] = decoded.split('-')
    storiesByAuthor = getStoriesFromAuthor(author)
    story = storiesByAuthor.find(story => story.title === title)

    if (!story) throw new Error('STORY_NOT_FOUND')
  } catch (error) {
    return <Error error={'Story ' + id + ' not found'} />
  }

  const card = getRawCardData(story.cardId)

  return (
    <div className='Story'>
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

      {storiesByAuthor.length > 1 && (
        <>
          <Title>
            Other stories by{' '}
            <Link to={`/member/${story.author}`}>{story.author}</Link>
          </Title>
          <Stories
            stories={storiesByAuthor.filter(s => story.title !== s.title)}
            columns={3}
          />
        </>
      )}

      <InfoHint>
        Looking to contribute to the Stormbound lore?{' '}
        <Link to='/faq#adding-a-story'>Have your own story published</Link>.
      </InfoHint>

      <PageMeta
        title={story.title}
        author={story.author}
        image={card.image}
        description={getExcerpt(story.content.replace('---', ''), 160)}
      />
    </div>
  )
}
