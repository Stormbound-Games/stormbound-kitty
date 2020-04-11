import React, { Fragment } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Title from '../Title'
import CTA from '../CTA'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Column from '../Column'
import Error from '../Error'
import stories from '../../data/stories'
import './index.css'
import getRawCardData from '../../helpers/getRawCardData'
import microMarkdown from '../../helpers/microMarkdown'
import getExcerpt from '../../helpers/getExcerpt'

const getStoriesFromAuthor = author =>
  stories.filter(story => story.author === author)

const Story = props => {
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
        <Column width={66}>
          <div className='Story__content'>
            <Title element='h1' className='Story__title'>
              {story.title}
            </Title>

            <article>
              {story.content.split('\n').map((paragraph, index) => (
                <p key={index} className='Story__paragraph'>
                  {microMarkdown(paragraph)}
                </p>
              ))}
            </article>
          </div>
        </Column>

        <Column width={33}>
          {!!card.image && (
            <Fragment>
              <img src={card.image} alt={card.name} />
              <hr />
            </Fragment>
          )}

          <p className='Story__author'>Story by {story.author}</p>

          {storiesByAuthor.length > 1 && (
            <p>
              You might enjoy these other stories from the same author:{' '}
              {storiesByAuthor
                .filter(s => story.title !== s.title)
                .map((story, index) => {
                  const id = window.btoa(
                    encodeURIComponent(story.title + '-' + story.author)
                  )

                  return (
                    <Fragment key={id}>
                      <Link to={'/stories/' + id}>{story.title}</Link>
                      {index !== storiesByAuthor.length - 2 ? ', ' : ''}
                    </Fragment>
                  )
                })}
              .
            </p>
          )}

          <Row desktopOnly>
            <Column>
              <CTA to='/stories'>Back to stories</CTA>
            </Column>
            <Column />
          </Row>
        </Column>
      </Row>

      <PageMeta
        title={story.title || 'Story'}
        description={getExcerpt(story.content, 200)}
      />
    </div>
  )
}

export default Story
