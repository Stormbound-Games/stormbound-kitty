import React from 'react'
import { STORY_CATEGORIES } from '../../constants/stories'
import Page from '../Page'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'

export default React.memo(function StoryIndex(props) {
  return (
    <Page
      title='Stories'
      description={'Read immersive stories from the community about Stormbound'}
      withAvif
    >
      {chunk(Object.keys(STORY_CATEGORIES), 3).map((row, index) => (
        <Row desktopOnly wideGutter key={index}>
          <Row.Column width='1/3'>
            <Teaser
              meta={STORY_CATEGORIES[row[0]].shortName}
              title={STORY_CATEGORIES[row[0]].title}
              excerpt={STORY_CATEGORIES[row[0]].content}
              cardId={STORY_CATEGORIES[row[0]].cardId}
              to={`/stories/${row[0]}`}
            />
          </Row.Column>
          <Row.Column width='1/3'>
            {row[1] && (
              <Teaser
                meta={STORY_CATEGORIES[row[1]].shortName}
                title={STORY_CATEGORIES[row[1]].title}
                excerpt={STORY_CATEGORIES[row[1]].content}
                cardId={STORY_CATEGORIES[row[1]].cardId}
                to={`/stories/${row[1]}`}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[2] && (
              <Teaser
                meta={STORY_CATEGORIES[row[2]].shortName}
                title={STORY_CATEGORIES[row[2]].title}
                excerpt={STORY_CATEGORIES[row[2]].content}
                cardId={STORY_CATEGORIES[row[2]].cardId}
              />
            )}
          </Row.Column>
        </Row>
      ))}
    </Page>
  )
})
