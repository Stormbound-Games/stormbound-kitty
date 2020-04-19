import React from 'react'
import { useHistory } from 'react-router-dom'
import Advice from '../DeckBuilderAdvice'
import Column from '../Column'
import Deck from '../Deck'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ShareButton from '../DeckBuilderShareButton'
import Stats from '../DeckBuilderStats'
import Title from '../Title'

const DeckBuilderDetailView = props => {
  const history = useHistory()

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
            onClick={card => history.push('/card/' + card.id + '/display')}
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

      <PageMeta
        title='Deck Detail'
        description='Details and advice about the deck.'
      />
    </>
  )
}

export default DeckBuilderDetailView
