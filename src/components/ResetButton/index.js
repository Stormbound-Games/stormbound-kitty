import React, { Fragment } from 'react'
import CTA from '../CTA'
import Dialog from '../Dialog'

export default class ResetButton extends React.Component {
  static defaultProps = {
    label: 'Reset',
    image: '/assets/images/cards/execution.png',
    confirm: 'Are you sure you would like to reset?'
  }

  open = () => this.dialog.show()
  close = () => this.dialog.hide()
  confirm = () => {
    this.props.reset()
    this.close()
  }

  render() {
    return (
      <Fragment>
        <CTA
          className="ResetButton"
          type="button"
          onClick={this.open}
          data-testid="reset-btn"
        >
          {this.props.label}
        </CTA>

        <Dialog
          id="reset-dialog"
          dialogRef={dialog => (this.dialog = dialog)}
          title={this.props.label}
          close={this.close}
          image={this.props.image}
          ctaProps={{
            type: 'button',
            onClick: this.confirm,
            'data-testid': 'reset-confirm-btn',
            children: 'Continue'
          }}
        >
          <p>{this.props.confirm}</p>
          {this.props.children}
        </Dialog>
      </Fragment>
    )
  }
}
