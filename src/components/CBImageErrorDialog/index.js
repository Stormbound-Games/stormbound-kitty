import React from 'react'
import Dialog from '../Dialog'
import './index.css'

export default class CBImageErrorDialog extends React.Component {
  registerDialog = dialog => {
    this.dialog = dialog
    this.props.dialogRef(dialog)
  }

  close = () => this.dialog.hide()

  render() {
    return (
      <Dialog
        id="image-error-dialog"
        dialogRef={this.registerDialog}
        title="Cannot load image"
        close={this.close}
        image="/assets/images/cards/collector_mirz.png"
      >
        <p>
          Unfortunately it looks like it is not possible to load that image,
          either because it’s not actually an image format or because the
          website protects it from being linked from other places.
        </p>

        <p>
          You can either pick another image, or try to save it and upload it to
          an image sharing service such as{' '}
          <a
            href="https://imgur.com/upload"
            target="_blank"
            rel="noopener noreferrer"
          >
            imgur
          </a>
          .
        </p>
      </Dialog>
    )
  }
}
