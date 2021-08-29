import React from 'react'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import ShareDialog from '~/components/ShareDialog'
import Spacing from '~/components/Spacing'
import download from '~/helpers/download'

const exportAsImage = () => {
  const deck = document.querySelector('#deck')

  // Scrolling back to the top of the page seems to help with having an accurate
  // visual representation of the deck.
  window.scrollTo(0, 0)

  import('html2canvas' /* webpackChunkName: 'html2canvas' */)
    .then(({ default: html2canvas }) => {
      return html2canvas(deck, {
        backgroundColor: null,
        ignoreElements: element => element.getAttribute('role') === 'dialog',
      })
    })
    .then(canvas =>
      download({
        content: canvas.toDataURL(),
        fileName: 'deck.png',
        mimeType: 'image/png',
        blob: false,
      })
    )
}

export default React.memo(function DeckShareButton(props) {
  return (
    <ShareDialog
      label='Share deck'
      disabled={props.disabled}
      image='/assets/images/cards/archdruid_earyn.png'
    >
      <p>
        Your deck is automatically saved to the URL of the page as you work on
        it. You can safely reload the page, or bookmark it to come back to it
        later.
      </p>

      <p>
        If you would like to share your deck with others, you can easily do so
        by downloading it as an image, or by sharing it directly.
      </p>

      <Spacing top='BASE'>
        <CTA type='button' onClick={exportAsImage}>
          <Only.Desktop>Download</Only.Desktop> as image
        </CTA>
      </Spacing>
    </ShareDialog>
  )
})
