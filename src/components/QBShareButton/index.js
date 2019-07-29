import React, { Fragment } from 'react'
import Share from '../Share'
import CTA from '../CTA'
import Dialog from '../Dialog'
import './index.css'

export default class QBShareButton extends React.Component {
  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  render() {
    return (
      <Share url={window.location.href}>
        {({ share, hasCopied, canUseShareAPI }) => (
          <Fragment>
            <CTA onClick={this.open} type="button">
              Share quest
            </CTA>
            <Dialog
              id="quest-builder-share-dialog"
              title="Share quest"
              dialogRef={dialog => (this.dialog = dialog)}
              image="/assets/images/cards/siren_of_the_seas.png"
              close={this.close}
              ctaProps={{
                onClick: share,
                type: 'button',
                disabled: hasCopied,
                children: hasCopied
                  ? '✓ Copied!'
                  : canUseShareAPI
                  ? 'Share quest'
                  : 'Copy link'
              }}
            >
              <p>
                Your quest is automatically saved to the URL of the page as you
                work on it. You can safely reload the page, or bookmark it to
                come back to it later.
              </p>

              <p>
                If you would like to share your quest with others, you can
                easily do so with the button below.
              </p>
            </Dialog>
          </Fragment>
        )}
      </Share>
    )
  }
}
