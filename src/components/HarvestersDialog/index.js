import React from 'react'
import CardsGallery from '../CardsGallery'
import Dialog from '../Dialog'
import './index.css'

export default React.memo(function HarvestersDialog(props) {
  return (
    <Dialog
      id='harvesters-dialog'
      className='Dialog__content'
      role='alertdialog'
      close={() => {
        props.dialog.current.hide()
        props.setCards([])
      }}
      dialogRef={instance => (props.dialog.current = instance)}
      title='Choose the card to copy'
      image='/assets/images/cards/harvesters_of_souls.png'
    >
      {props.cards.length && (
        <CardsGallery
          cards={props.cards}
          cardsPerPage={props.cards.length}
          hideNavButtons
          onCardClick={id => {
            const chosenCard = props.cards.find(
              suggestedCard => suggestedCard.id === id
            )
            props.addCardToDeck(chosenCard)
            props.setCards([])
            props.dialog.current.hide()
          }}
        />
      )}
    </Dialog>
  )
})
