import React from 'react'
import CTA from '#components/CTA'
import ShareDialog from '#components/ShareDialog'

export default React.memo(function QuestBuilderShareButton(props) {
  return (
    <ShareDialog
      label='Share quest'
      image='https://cdn.sanity.io/images/5hlpazgd/production/5db4c3f8d328ebee249d79c9c48a8a45daa1f28c-512x512.png'
      trigger={triggerProps => (
        <CTA {...triggerProps} disabled={props.disabled}>
          Share quest
        </CTA>
      )}
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
