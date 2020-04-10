import React, { Fragment } from 'react'
import CTA from '../CTA'
import Dialog from '../Dialog'

const ResetButton = props => {
  const dialog = React.useRef(null)
  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()
  const confirm = () => {
    props.reset()
    dialog.current.hide()
  }

  return (
    <Fragment>
      <CTA
        className='ResetButton'
        type='button'
        onClick={open}
        data-testid='reset-btn'
      >
        {props.label}
      </CTA>

      <Dialog
        id='reset-dialog'
        dialogRef={instance => (dialog.current = instance)}
        title={props.label}
        close={close}
        image={props.image}
        ctaProps={{
          type: 'button',
          onClick: confirm,
          'data-testid': 'reset-confirm-btn',
          children: 'Continue',
        }}
      >
        <p>{props.confirm}</p>
        {props.children}
      </Dialog>
    </Fragment>
  )
}

ResetButton.defaultProps = {
  label: 'Reset',
  image: '/assets/images/cards/execution.png',
  confirm: 'Are you sure you would like to reset?',
}
export default ResetButton
