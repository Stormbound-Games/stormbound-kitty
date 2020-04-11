import React, { Fragment } from 'react'
import PageMeta from '../PageMeta'
import Deck from '../Deck'
import ShareButton from '../DeckBuilderShareButton'
import Stats from '../DeckBuilderStats'
import Advice from '../DeckBuilderAdvice'
import Title from '../Title'
import Row from '../Row'
import Column from '../Column'
import CardZoom from '../CardZoom'

const DeckBuilderDetailView = props => {
  const [zoomed, zoom] = React.useState(null)

  return (
    <Fragment>
      <h1 className='visually-hidden'>Deck Detail</h1>

      <Row desktopOnly wideGutter>
        <Column width={33}>
          <Title>Your deck</Title>
          <Deck
            id='deck'
            deck={props.deck}
            highlightedCards={props.highlightedCards}
            onClick={zoom}
            onClickLabel='Enlarge card'
          />

          <Row>
            <Column>
              <ShareButton label='Share deck' />
            </Column>
          </Row>
        </Column>

        <Column width={33}>
          <Stats deck={props.deck} highlight={props.highlight} />
        </Column>

        <Column width={33}>
          <Advice deck={props.deck} highlight={props.highlight} />
        </Column>
      </Row>

      <CardZoom
        cardId={zoomed ? zoomed.id : null}
        level={zoomed ? zoomed.level : null}
        close={() => zoom(null)}
      />

      <PageMeta
        title='Deck Detail'
        description='Details and advice about the deck.'
      />
    </Fragment>
  )
}

export default DeckBuilderDetailView
