import React from 'react'
import Advice from '../DeckBuilderAdvice'
import CardZoom from '../CardZoom'
import Column from '../Column'
import Deck from '../Deck'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ShareButton from '../DeckBuilderShareButton'
import Stats from '../DeckBuilderStats'
import Title from '../Title'

const DeckBuilderDetailView = props => {
  const [zoomed, zoom] = React.useState(null)

  return (
    <>
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
    </>
  )
}

export default DeckBuilderDetailView
