import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import stories from '../../data/stories'
import Column from '../Column'
import CTA from '../CTA'
import Error from '../Error'
import Image from '../Image'
import InfoHint from '../InfoHint'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Stories from '../Stories'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import microMarkdown from '../../helpers/microMarkdown'
import getExcerpt from '../../helpers/getExcerpt'
import './index.css'

const getStoriesFromAuthor = author =>
  stories.filter(story => story.author === author)

export default function Story(props) {
  const match = useRouteMatch()
  const id = match.params.storyId

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
      <Row desktopOnly wideGutter>
        <Column width='2/3'>
          <article className='Story__content'>
            <Title element='h1' className='Story__title'>
              {story.title}
            </Title>
            {story.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().length === 0) return null
              if (paragraph.trim() === '---') return <hr key={index} />

              return (
                <p key={index} className='Story__paragraph'>
                  {microMarkdown(paragraph)}
                </p>
              )
            })}
          </article>

          {storiesByAuthor.length > 1 && (
            <>
              <Title>
                Other stories by{' '}
                <Link to={`/member/${story.author}`}>{story.author}</Link>
              </Title>
              <Stories
                stories={storiesByAuthor.filter(s => story.title !== s.title)}
                columns={2}
              />
            </>
          )}
        </Column>

        <Column width='1/3'>
          <div className='Story__aside'>
            {!!card.image && <Image src={card.image} alt={card.name} />}

            <InfoHint>
              Looking to contribute to the Stormbound lore?{' '}
              <Link to='/faq#adding-a-story'>
                Have your own story published
              </Link>
              .
            </InfoHint>

            <hr />

            <CTA className='Story__back' to='/stories'>
              Back to stories
            </CTA>
          </div>
        </Column>
      </Row>

      <PageMeta
        title={story.title}
        author={story.author}
        image={card.image}
        description={getExcerpt(story.content.replace('---', ''), 160)}
      />
    </div>
  )
}
