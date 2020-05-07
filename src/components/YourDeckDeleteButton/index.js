import React from 'react'
import DiamondButton from '../DiamondButton'
import Dialog from '../Dialog'

export default React.memo(function ResetButton(props) {
  const dialog = React.useRef(null)
  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()
  const confirm = () => {
    props.delete()
    dialog.current.hide()
  }

  return (
    <>
      <DiamondButton
        aria-label='Delete deck'
        onClick={open}
        icon='bin'
        data-testid='delete-deck-btn'
      />

      <Dialog
        id='delete-dialog'
        data-testid='delete-dialog'
        dialogRef={instance => (dialog.current = instance)}
        title='Delete deck'
        close={close}
        image='/assets/images/cards/execution.png'
        ctaProps={{
          type: 'button',
          onClick: confirm,
          'data-testid': 'delete-confirm-btn',
          children: 'Delete',
        }}
      >
        <p>Are you sure you want to delete that deck? It cannot be undone.</p>
      </Dialog>
    </>
  )
})
