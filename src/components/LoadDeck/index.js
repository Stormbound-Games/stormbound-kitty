import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CTA from '~/components/CTA'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import Spacing from '~/components/Spacing'
import { convertToSkId } from '~/helpers/convertDeckId'
import serialization from '~/helpers/serialization'

export default React.memo(function RandomDeckButton(props) {
  const { cardsIndexBySid } = React.useContext(CardsContext)
  const dialog = React.useRef(null)
  const { defineDeck } = props
  const [deckId, setDeckId] = React.useState('')
  const [hasFailed, setHasFailed] = React.useState(null)

  const loadDeck = React.useCallback(() => {
    try {
      const skId = convertToSkId(cardsIndexBySid, deckId)
      const deck = serialization.deck.deserialize(cardsIndexBySid, skId)

      defineDeck(deck)
    } catch (error) {
      console.error(error)
      setHasFailed(true)
    }
  }, [cardsIndexBySid, defineDeck, deckId])

  return (
    <>
      <CTA
        onClick={() => dialog.current.show()}
        type='button'
        data-testid='load-deck-btn'
      >
        {props.label || 'Load deck'}
      </CTA>
      <Dialog
        id='load-deck-dialog'
        title='Load deck from the game'
        dialogRef={instance => (dialog.current = instance)}
        image='https://cdn.sanity.io/images/5hlpazgd/production/596e054dac114d033c4ceca539e4af9f00ff6f87-512x512.png'
        close={() => dialog.current.hide()}
        ctaProps={{
          onClick: loadDeck,
          disabled: !deckId,
          type: 'button',
          children: 'Load deck',
          'data-testid': 'load-deck-dialog-confirm-btn',
        }}
      >
        <p>
          To load your deck in the deck builder, paste its ID number in the
          field below as copied from the game, then click the “Load deck” button
          below.
        </p>

        <Input
          label='Deck ID copied from Stormbound'
          onChange={event => {
            setDeckId(event.target.value)
            setHasFailed(false)
          }}
          value={deckId}
          aria-describedby='load-deck-error'
        />

        <Spacing top='SMALL'>
          <p id='load-deck-error' style={{ color: 'var(--light-ironclad)' }}>
            {hasFailed && (
              <>
                <Icon icon='warning' /> Unfortunately, that deck could not be
                loaded. Make sure you have copied it correctly from the game,
                and if the problem persists, report it on Discord.
              </>
            )}
          </p>
        </Spacing>
      </Dialog>
    </>
  )
})
