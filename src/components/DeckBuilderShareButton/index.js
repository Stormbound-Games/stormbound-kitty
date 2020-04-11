import React, { Fragment } from 'react'
import CTA from '../CTA'
import Dialog from '../Dialog'
import Share from '../Share'
import download from '../../helpers/download'
import './index.css'

const DeckBuilderShareButton = props => {
  const dialog = React.useRef(null)
  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()

  const exportAsImage = () => {
    const deck = document.querySelector('#deck')

    import('html2canvas')
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

  return (
    <Share url={window.location.href}>
      {({ share, hasCopied, canUseShareAPI }) => (
        <Fragment>
          <CTA onClick={open} type='button'>
            {props.label || 'Share deck'}
          </CTA>
          <Dialog
            id='deck-builder-save-dialog'
            title='Share deck'
            dialogRef={instance => (dialog.current = instance)}
            image='/assets/images/cards/archdruid_earyn.png'
            close={close}
            ctaProps={{
              onClick: share,
              type: 'button',
              disabled: hasCopied,
              children: hasCopied
                ? '✓ Copied!'
                : canUseShareAPI
                ? 'Share deck'
                : 'Copy link',
            }}
          >
            <p>
              Your deck is automatically saved to the URL of the page as you
              work on it. You can safely reload the page, or bookmark it to come
              back to it later.
            </p>

            <p>
              If you would like to share your deck with others, you can easily
              do so by downloading it as an image, or by sharing it directly.
            </p>

            <CTA
              type='button'
              onClick={exportAsImage}
              className='DeckBuilderShareButton__button'
            >
              Download as image
            </CTA>
          </Dialog>
        </Fragment>
      )}
    </Share>
  )
}

export default DeckBuilderShareButton
