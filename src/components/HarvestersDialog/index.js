import React from 'react'
import CardsGallery from '~/components/CardsGallery'
import Dialog from '~/components/Dialog'
import styles from './styles'
import useViewportSize from '~/hooks/useViewportSize'

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
      image='https://cdn.sanity.io/images/5hlpazgd/production/8048600441cb8eccd9234e84292fc324802d0028-263x300.png'
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
