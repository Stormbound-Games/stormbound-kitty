import React from 'react'
import CardsGallery from '../CardsGallery'
import Dialog from '../Dialog'
import styles from './styles'
import useViewportSize from '../../hooks/useViewportSize'

export default React.memo(function HarvestersDialog(props) {
  const { viewportWidth } = useViewportSize()
  return (
    <Dialog
      id='harvesters-dialog'
      extend={{
        dialog: styles.content,
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
        cardsPerPage={viewportWidth < 850 ? 4 : 6}
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
