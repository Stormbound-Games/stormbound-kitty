import React, { Fragment } from 'react'
import Dialog from '../Dialog'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Share from '../Share'
import './index.css'

export default class CBShareButton extends React.Component {
  state = {
    includeStats: false,
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
        title={this.state.includeStats ? this.props.title : undefined}
        content={this.state.includeStats ? this.props.content : undefined}
      >
        {({ share, hasCopied, canUseShareAPI }) => (
          <Fragment>
            <CTA onClick={this.open} type="button">
              Share card
            </CTA>
            <Dialog
              id="card-builder-share-dialog"
              title="Share card"
              dialogRef={dialog => (this.dialog = dialog)}
              image="/assets/images/cards/collector-mirz.png"
              close={this.close}
              ctaProps={{
                onClick: share,
                type: 'button',
                disabled: hasCopied,
                children: hasCopied
                  ? '✓ Copied!'
                  : canUseShareAPI
                  ? 'Share card'
                  : 'Copy link'
              }}
            >
              <p>
                Your card is automatically saved to the URL of the page as you
                work on it. You can safely reload the page, or bookmark it to
                come back to it later.
              </p>

              <p>
                If you would like to share your card with others, you can easily
                do so with the button below.
              </p>

              <div className="CBShareDialog__checkbox">
                <Checkbox
                  name="include-stats"
                  id="include-stats"
                  checked={this.state.includeStats}
                  onChange={event =>
                    this.setState({ includeStats: event.target.checked })
                  }
                >
                  Include stats as text
                </Checkbox>
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
