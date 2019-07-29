import React, { Fragment } from 'react'
import CTA from '../CTA'
import Dialog from '../Dialog'
import Share from '../Share'
import download from '../../helpers/download'
import './index.css'

export default class DBShareButton extends React.Component {
  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  exportAsImage = () => {
    const deck = document.querySelector('#deck')

    import('html2canvas')
      .then(({ default: html2canvas }) => {
        return html2canvas(deck, { backgroundColor: null })
      })
      .then(canvas =>
        download({
          content: canvas.toDataURL(),
          fileName: 'deck.png',
          mimeType: 'image/png',
          ignoreElements: element => element.id === 'dialog-root',
          blob: false
        })
      )
  }

  render() {
    return (
      <Share url={window.location.href}>
        {({ share, hasCopied, canUseShareAPI }) => (
          <Fragment>
            <CTA onClick={this.open} type="button">
              {this.props.label || 'Share deck'}
            </CTA>
            <Dialog
              id="deck-builder-save-dialog"
              title="Share deck"
              dialogRef={dialog => (this.dialog = dialog)}
              image="/assets/images/cards/archdruid_earyn.png"
              close={this.close}
              ctaProps={{
                onClick: share,
                type: 'button',
                disabled: hasCopied,
                children: hasCopied
                  ? '✓ Copied!'
                  : canUseShareAPI
                  ? 'Share deck'
                  : 'Copy link'
              }}
            >
              <p>
                Your deck is automatically saved to the URL of the page as you
                work on it. You can safely reload the page, or bookmark it to
                come back to it later.
              </p>

              <p>
                If you would like to share your deck with others, you can easily
                do so by downloading it as an image, or by sharing it directly.
              </p>

              <CTA
                type="button"
                onClick={this.exportAsImage}
                className="DBShareButton__button"
              >
                Download as image
              </CTA>
            </Dialog>
          </Fragment>
        )}
      </Share>
    )
  }
}
