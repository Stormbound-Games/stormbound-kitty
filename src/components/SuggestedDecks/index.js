import React from 'react'
import { useHistory } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import BookmarkDeckButton from '../BookmarkDeckButton'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Loader from '../Loader'
import Row from '../Row'
import useViewportWidth from '../../hooks/useViewportWidth'
import chunk from '../../helpers/chunk'

export default React.memo(function SuggestedDecks(props) {
  const history = useHistory()
  const viewportWidth = useViewportWidth()
  const navigateToCard = card => history.push('/card/' + card.id + '/display')

  if (props.decks.length === 0) return null

  const rows = chunk(props.decks, 2)

  return rows.map(([a, b]) => (
    <LazyLoad
      resize
      placeholder={<Loader hideLabel />}
      height={viewportWidth > 700 ? 280 : 560}
      key={a.id}
    >
      <Row desktopOnly key={a.id}>
        <Column>
          <FeaturedDeck
            {...a}
            showUpgrades
            data-testid='deck-suggestion'
            onClick={navigateToCard}
            actions={[<BookmarkDeckButton {...a} />]}
          />
        </Column>
        <Column>
          {b ? (
            <FeaturedDeck
              {...b}
              showUpgrades
              data-testid='deck-suggestion'
              onClick={navigateToCard}
              actions={[<BookmarkDeckButton {...b} />]}
            />
          ) : null}
        </Column>
      </Row>
    </LazyLoad>
  ))
})
