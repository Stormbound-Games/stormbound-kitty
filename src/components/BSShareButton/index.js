import React, { Fragment } from 'react'
import CTA from '../CTA'
import Checkbox from '../Checkbox'
import Dialog from '../Dialog'
import Share from '../Share'
import './index.css'

export default class BSShareButton extends React.Component {
  state = { hasCopied: false, hideInterface: false }

  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  render() {
    const url = window.location.href

    return (
      <Share url={this.state.hideInterface ? url + '/display' : url}>
        {({ share, hasCopied, canUseShareAPI }) => (
          <Fragment>
            <CTA onClick={this.open} type="button">
              Share board
            </CTA>

            <Dialog
              id="deck-builder-save-dialog"
              title="Share board"
              dialogRef={dialog => (this.dialog = dialog)}
              image="/assets/images/cards/olf_the_hammer.png"
              close={this.close}
              ctaProps={{
                onClick: share,
                type: 'button',
                disabled: hasCopied,
                children: hasCopied
                  ? '✓ Copied!'
                  : canUseShareAPI
                  ? 'Share board'
                  : 'Copy link'
              }}
            >
              <p>
                Your board is automatically saved to the URL of the page as you
                work on it. You can safely reload the page, or bookmark it to
                come back to it later.
              </p>

              <p>
                If you would like to share your board with others, you can
                easily do so with the button below.
              </p>

              <div className="BSShareButton__checkbox">
                <Checkbox
                  name="hide-interface"
                  id="hide-interface"
                  checked={this.state.hideInterface}
                  onChange={event =>
                    this.setState({ hideInterface: event.target.checked })
                  }
                >
                  Hide editing interface
                </Checkbox>
              </div>
            </Dialog>
          </Fragment>
        )}
      </Share>
    )
  }
}
