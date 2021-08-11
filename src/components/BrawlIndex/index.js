import React from 'react'
import Page from '../Page'
import Row from '../Row'
import Teaser from '../Teaser'
import Title from '../Title'
import chunk from '../../helpers/chunk'
import getBrawlDescription from '../../helpers/getBrawlDescription'
import { BRAWLS } from '../../constants/brawl'

const BrawlTeaser = React.memo(function BrawlTeaser(props) {
  return (
    <Teaser
      large={props.large}
      data-testid='teaser'
      meta={props.label}
      title={props.title}
      cardId={props.cardId}
      excerpt={props.description}
      to={`/brawl/${props.id.toLowerCase().replace(/_/g, '-')}`}
    />
  )
})

export default React.memo(function BrawlIndex() {
  return (
    <Page
      title='Brawl Tracker'
      description='Find all the Brawl modes from Stormbound and their ideal decks'
    >
      <Title>Brawls</Title>

      {chunk(BRAWLS, 3).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          <Row.Column width='1/3'>
            {row[0] && (
              <BrawlTeaser
                {...row[0]}
                description={getBrawlDescription(row[0].id)}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[1] && (
              <BrawlTeaser
                {...row[1]}
                description={getBrawlDescription(row[1].id)}
              />
            )}
          </Row.Column>
          <Row.Column width='1/3'>
            {row[2] && (
              <BrawlTeaser
                {...row[2]}
                description={getBrawlDescription(row[2].id)}
              />
            )}
          </Row.Column>
        </Row>
      ))}
    </Page>
  )
})
