import React from 'react'
import CTA from '~/components/CTA'
import Dialog from '~/components/Dialog'
import useShare from '~/hooks/useShare'

export default React.memo(function ShareDialog(props) {
  const dialog = React.useRef(null)
  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()
  const { share, hasCopied, canUseShareAPI } = useShare(props.share)

  return (
    <>
      <CTA
        onClick={open}
        type='button'
        disabled={props.disabled}
        extend={props.extend}
      >
        {props.label}
      </CTA>
      <Dialog
        id='share-dialog'
        title={props.label}
        dialogRef={instance => (dialog.current = instance)}
        image={props.image}
        close={close}
        ctaProps={{
          onClick: share,
          type: 'button',
          disabled: hasCopied,
          children: hasCopied
            ? '✓ Copied!'
            : canUseShareAPI
            ? props.label
            : props.ctaLabel || 'Copy link',
        }}
      >
        {props.children}
      </Dialog>
    </>
  )
})
