import React from 'react'
import CTA from '../CTA'
import Dialog from '../Dialog'

export default React.memo(function ResetButton(props) {
  const label = props.label || 'Reset'
  const image = props.image || '/assets/images/cards/execution.png'
  const confirmText = props.confirm || 'Are you sure you would like to reset?'

  const dialog = React.useRef(null)
  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()
  const confirm = () => {
    props.reset()
    dialog.current.hide()
  }

  return (
    <>
      <CTA
        type='button'
        onClick={open}
        data-testid='reset-btn'
        disabled={props.disabled}
      >
        {label}
      </CTA>

      <Dialog
        id='reset-dialog'
        data-testid='reset-dialog'
        dialogRef={instance => (dialog.current = instance)}
        title={label}
        close={close}
        image={image}
        ctaProps={{
          type: 'button',
          onClick: confirm,
          'data-testid': 'reset-confirm-btn',
          children: 'Continue',
        }}
      >
        <p>{confirmText}</p>
        {props.children}
      </Dialog>
    </>
  )
})
