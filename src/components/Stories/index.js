import React from 'react'
import CTA from '../CTA'
import Row from '../Row'
import Column from '../Column'
import PageMeta from '../PageMeta'
import stories from '../../data/stories'
import getRawCardData from '../../helpers/getRawCardData'
import getExcerpt from '../../helpers/getExcerpt'
import shuffle from '../../helpers/shuffle'
import './index.css'

const COLORS = {
  neutral: 'rgba(222, 215, 164, 0.5)',
  ironclad: 'var(--ironclad)',
  shadowfen: 'var(--shadowfen)',
  winter: 'var(--winter)',
  swarm: 'var(--swarm)'
}
const shuffledStories = shuffle(stories)

const Stories = props => (
  <div className="Stories">
    {shuffledStories.map(story => {
      const card = getRawCardData(story.cardId)
      const title = story.title || card.name || 'Story'
      const id = window.btoa(
        encodeURIComponent(story.title + '-' + story.author)
      )

      return (
        <div
          className="Stories__base"
          key={id}
          style={{ '--color': COLORS[card.faction || COLORS.neutral] }}
        >
          <h1 className="visually-hidden">Stories</h1>
          <div className="Stories__inner">
            <Row desktopOnly wideGutter>
              <Column width={66}>
                <h2 className="Stories__title">{title}</h2>
                <span className="Stories__author">By {story.author}</span>
                <p className="Stories__excerpt">
                  {getExcerpt(story.content || '', 200)}
                </p>
                <CTA
                  className="Stories__CTA"
                  aria-label={'Read story about ' + card.name}
                  to={'/stories/' + id}
                >
                  Read story
                </CTA>
              </Column>
              <Column width={33}>
                {!!card.image && (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="Stories__image"
                  />
                )}
              </Column>
            </Row>
          </div>
        </div>
      )
    })}

    <PageMeta
      title="Stories"
      description="Stories from the community about Stormbound cards"
    />
  </div>
)

export default Stories
