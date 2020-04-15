import React from 'react'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Dialog from '../Dialog'
import useShare from '../../hooks/useShare'
import './index.css'

const BattleSimShareButton = props => {
  const dialog = React.useRef(null)
  const [hideInterface, setHideInterface] = React.useState(false)
  const url = window.location.href
  const { share, hasCopied, canUseShareAPI } = useShare({
    url: hideInterface ? url + '/display' : url,
  })

  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()

  return (
    <>
      <CTA onClick={open} type='button' disabled={props.disabled}>
        Share board
      </CTA>

      <Dialog
        id='deck-builder-save-dialog'
        title='Share board'
        dialogRef={instance => (dialog.current = instance)}
        image='/assets/images/cards/olf_the_hammer.png'
        close={close}
        ctaProps={{
          onClick: share,
          type: 'button',
          disabled: hasCopied,
          children: hasCopied
            ? '✓ Copied!'
            : canUseShareAPI
            ? 'Share board'
            : 'Copy link',
        }}
      >
        <p>
          Your board is automatically saved to the URL of the page as you work
          on it. You can safely reload the page, or bookmark it to come back to
          it later.
        </p>

        <p>
          If you would like to share your board with others, you can easily do
          so with the button below.
        </p>

        <div className='BattleSimShareButton__checkbox'>
          <Checkbox
            name='hide-interface'
            id='hide-interface'
            checked={hideInterface}
            onChange={event => setHideInterface(event.target.checked)}
          >
            Hide editing interface
          </Checkbox>
        </div>
      </Dialog>
    </>
  )
}

export default BattleSimShareButton
