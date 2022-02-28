import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CTA from '~/components/CTA'
import Input from '~/components/Input'
import Deck from '~/components/Deck'
import Dialog from '~/components/Dialog'
import serialization from '~/helpers/serialization'

export default React.memo(function BattleSimDeckImport(props) {
  const dialog = React.useRef(null)
  const { cardsIndexBySid } = React.useContext(CardsContext)
  const [deckURL, setDeckURL] = React.useState('')
  const [deck, setDeck] = React.useState([])
  const [hand, setHand] = React.useState([])
  const [error, setError] = React.useState(null)
  const { importDeck: importDeckFromProps } = props

  const registerDialog = instance => {
    dialog.current = instance

    if (dialog.current) {
      dialog.current.on('hide', () => {
        setDeckURL('')
        setDeck([])
        setHand([])
        setError(null)
      })
    }
  }

  const defineDeck = React.useCallback(
    event => {
      const url = event.target.value

      setDeckURL(url)

      try {
        const re = /\/deck\/([\w=%]+)(?:\/|$|\?)/i
        const [, id] = decodeURIComponent(url).match(re)
        setDeck(serialization.deck.deserialize(cardsIndexBySid, id))
        setError(null)
      } catch {
        setError('Unfortunately this deck could not be imported.')
      }
    },
    [cardsIndexBySid]
  )

  const importDeck = React.useCallback(() => {
    importDeckFromProps({ cards: deck, hand })
    dialog.current.hide()
  }, [importDeckFromProps, deck, hand])

  const addToHand = React.useCallback(({ id }) => {
    setHand(hand => {
      if (hand.includes(id)) return hand.filter(i => i !== id)
      if (hand.length < 4) return [...hand, id]
      return hand
    })
  }, [])

  return (
    <>
      <CTA
        onClick={() => dialog.current.show()}
        extend={{ margin: '0 auto var(--s-large)' }}
      >
        Import deck
      </CTA>
      <Dialog
        id='battle-sim-deck-import'
        title='Import a deck'
        dialogRef={registerDialog}
        image='https://cdn.sanity.io/images/5hlpazgd/production/77baae150df0e9784678c1147fd1fa0d0fcbb9ee-512x512.png'
        close={() => dialog.current.hide()}
        ctaProps={{
          onClick: importDeck,
          children: 'Import deck',
          disabled: deck.length === 0,
        }}
      >
        <p>
          You can import a deck directly from the deck builder: paste its URL in
          the field below. Once the deck has been succesfully loaded, you can
          select up to 4 cards to put in your hand.
        </p>

        <Input
          label='Deck URL'
          type='url'
          id='deck'
          required
          placeholder='e.g. https://stormbound-kitty.com/deck/NE4xLDRJMSw0TjMsNEk2LDRJOCw0STExLDRJMTUsNEkxMiw0TjI4LDRJMjAsNEkxOSw0STIx'
          onChange={defineDeck}
          value={deckURL}
          aria-describedby='deck-import-errors'
        />
        <p id='deck-import-errors'>{error}</p>

        {deck.length > 0 && (
          <Deck
            orientation='horizontal'
            deck={deck}
            highlightedCards={hand}
            onClick={addToHand}
            onClickLabel='Put card in hand'
          />
        )}
      </Dialog>
    </>
  )
})
