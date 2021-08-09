import React from 'react'
import CardsGallery from '../CardsGallery'
import Dialog from '../Dialog'
import styles from './styles'

export default React.memo(function HarvestersDialog(props) {
  return (
    <Dialog
      id='harvesters-dialog'
      extend={{
        dialog: styles.dialog,
        body: styles.body,
      }}
      role='alertdialog'
      close={() => {
        props.setCards([])
      }}
      dialogRef={instance => (props.dialog.current = instance)}
      title='Choose the card to copy'
      image='/assets/images/cards/harvesters_of_souls.png'
    >
      <CardsGallery
        extend={{
          list: styles.list,
          item: styles.item,
        }}
        cards={props.cards}
        cardsPerPage={props.cards.length}
        hideNavButtons
        onCardClick={id => {
          const chosenCard = props.cards.find(
            suggestedCard => suggestedCard.id === id
          )
          props.addCardToDeck(chosenCard)
          props.setCards([])
        }}
      />
    </Dialog>
  )
})
