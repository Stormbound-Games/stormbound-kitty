import React from 'react'
import ShareDialog from '../ShareDialog'

export default React.memo(function QuestBuilderShareButton(props) {
  return (
    <ShareDialog
      label='Share quest'
      disabled={props.disabled}
      image='/assets/images/cards/siren_of_the_seas.png'
    >
      <p>
        Your quest is automatically saved to the URL of the page as you work on
        it. You can safely reload the page, or bookmark it to come back to it
        later.
      </p>

      <p>
        If you would like to share your quest with others, you can easily do so
        with the button below.
      </p>
    </ShareDialog>
  )
})
