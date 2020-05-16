import React from 'react'
import CTA from '../CTA'
import ShareDialog from '../ShareDialog'
import download from '../../helpers/download'
import './index.css'

const exportAsImage = () => {
  const deck = document.querySelector('#deck')

  // Scrolling back to the top of the page seems to help with having an accurate
  // visual representation of the deck.
  window.scrollTo(0, 0)

  import('html2canvas' /* webpackChunkName: 'html2canvas' */)
    .then(({ default: html2canvas }) => {
      return html2canvas(deck, {
        backgroundColor: null,
        ignoreElements: element => element.id === 'dialog-root',
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

      <CTA
        type='button'
        onClick={exportAsImage}
        className='DeckShareButton__button'
      >
        Download as image
      </CTA>
    </ShareDialog>
  )
})
