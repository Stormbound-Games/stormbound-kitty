import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import chapters from '../../data/stories.easternHeat'
import Column from '../Column'
import CTA from '../CTA'
import Image from '../Image'
import InfoHint from '../InfoHint'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Stories from '../Stories'
import StoryContent from '../StoryContent'
import Title from '../Title'
import getExcerpt from '../../helpers/getExcerpt'
import '../Story/index.css'

export default React.memo(function StoryEasternHeat(props) {
  const match = useRouteMatch()
  const chapter = +match.params.chapter
  const story = chapters[chapter - 1]
  const otherChapters = chapters.filter(c => c.title !== story.title)

  return (
    <div className='Story'>
      <Row desktopOnly wideGutter>
        <Column width='2/3'>
          <StoryContent title={story.title} content={story.content} />
          <Title>Other chapters from Eastern Heat</Title>
          <Stories stories={otherChapters} columns={2} />
        </Column>

        <Column width='1/3'>
          <div className='Story__aside'>
            <Image src={story.card.image} alt={story.card.name} />
            <InfoHint>
              Looking to contribute to the Stormbound lore?{' '}
              <Link to='/faq#adding-a-story'>
                Have your own story published
              </Link>
              .
            </InfoHint>
            <hr />
            <CTA className='Story__back' to='/stories/eastern-heat'>
              Back to stories
            </CTA>
          </div>
        </Column>
      </Row>

      <PageMeta
        title={story.title}
        author={story.author}
        image={story.card.image}
        description={getExcerpt(story.content, 160)}
      />
    </div>
  )
})
