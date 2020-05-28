import React from 'react'
import { useHistory } from 'react-router-dom'
import Advice from '../DeckAdvice'
import Column from '../Column'
import Deck from '../Deck'
import DeckStatsChart from '../DeckStatsChart'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ShareButton from '../DeckShareButton'
import Stats from '../DeckStats'
import Title from '../Title'
import getDeckBuilderMetaTags from '../../helpers/getDeckBuilderMetaTags'

export default React.memo(function DeckDetailView(props) {
  const history = useHistory()

  return (
    <>
      <h1 className='VisuallyHidden'>Deck Detail</h1>

      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>Your deck</Title>
          <Deck
            id='deck'
            deck={props.deck}
            highlightedCards={props.highlightedCards}
            onClick={card => history.push('/card/' + card.id + '/display')}
            onClickLabel='Open card in card builder'
          />

          <Row>
            <Column>
              <ShareButton label='Share deck' />
            </Column>
          </Row>
        </Column>

        <Column width='1/3'>
          <Stats deck={props.deck} highlight={props.highlight} />
          <DeckStatsChart deck={props.deck} />
        </Column>

        <Column width='1/3'>
          <Advice deck={props.deck} highlight={props.highlight} />
        </Column>
      </Row>

      <PageMeta {...getDeckBuilderMetaTags(props.deck)} title='Deck Details' />
    </>
  )
})
