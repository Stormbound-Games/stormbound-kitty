import React from 'react'
import CTA from '~/components/CTA'
import Dialog from '~/components/Dialog'

export default React.memo(function ResetButton(props) {
  const label = props.label || 'Reset'
  const image =
    props.image ||
    'https://cdn.sanity.io/images/5hlpazgd/production/3886106424f6a20f584fa658760e7fe46bd35ab5-512x512.png'
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
        isFullWidthOnMobile={props.isFullWidthOnMobile}
      >
        {label}
      </CTA>

      <Dialog
        id='reset-dialog'
        dialogRef={instance => (dialog.current = instance)}
        title={label}
        close={close}
        image={image}
        ctaProps={{
          type: 'button',
          onClick: confirm,
          'data-testid': 'reset-confirm-btn',
          children: 'Proceed & reset',
        }}
      >
        <p>{confirmText}</p>
        {props.children}
      </Dialog>
    </>
  )
})
