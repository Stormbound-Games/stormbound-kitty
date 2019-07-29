import React, { Fragment } from 'react'
import Dialog from '../Dialog'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Share from '../Share'
import './index.css'

export default class TLBShareButton extends React.Component {
  state = {
    hideInterface: false
  }

  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  render() {
    const url = window.location.href

    return (
      <Share
        shortenURL
        url={
          this.state.hideInterface
            ? url.endsWith('/display')
              ? url
              : url + '/display'
            : url
        }
        title={this.props.title}
        content={this.props.content}
      >
        {({ share, hasCopied, canUseShareAPI }) => (
          <Fragment>
            <CTA onClick={this.open} type="button">
              Share list
            </CTA>
            <Dialog
              id="list-builder-share-dialog"
              title="Share list"
              dialogRef={dialog => (this.dialog = dialog)}
              image="/assets/images/cards/project_ph03-nix.png"
              close={this.close}
              ctaProps={{
                onClick: share,
                type: 'button',
                disabled: hasCopied,
                children: hasCopied
                  ? '✓ Copied!'
                  : canUseShareAPI
                  ? 'Share list'
                  : 'Copy link'
              }}
            >
              <p>
                Your list is automatically saved to the URL of the page as you
                work on it. You can safely reload the page, or bookmark it to
                come back to it later.
              </p>

              <p>
                If you would like to share your list with others, you can easily
                do so with the button below.
              </p>

              <div className="TLBShareButton__checkbox">
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
