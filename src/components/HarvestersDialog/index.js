import React from 'react'
import CardsGallery from '../CardsGallery'
import Dialog from '../Dialog'

export default React.memo(function HarvestersDialog(props) {
  return (
    <Dialog
      id='harvesters-dialog'
      dialogRef={instance => (props.dialogRef.current = instance)}
      close={() => {}}
      title='Choose the card to copy'
      image='/assets/images/cards/harvesters_of_souls.png'
    >
      {props.cards.length && (
        <CardsGallery
          cards={props.cards}
          cardsPerPage={props.cards.length}
          hideNavButtons={true}
          onCardClick={id => {
            const chosenCard = props.cards.find(
              suggestedCard => suggestedCard.id === id
            )
            props.addCardToDeck(chosenCard)
            props.dialogRef.current.hide()
          }}
        />
      )}
    </Dialog>
  )
})
