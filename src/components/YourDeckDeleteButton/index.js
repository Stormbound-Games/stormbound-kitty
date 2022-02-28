import React from 'react'
import DiamondButton from '~/components/DiamondButton'
import Dialog from '~/components/Dialog'

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
        label='Delete deck'
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
        image='https://cdn.sanity.io/images/5hlpazgd/production/3886106424f6a20f584fa658760e7fe46bd35ab5-512x512.png'
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
