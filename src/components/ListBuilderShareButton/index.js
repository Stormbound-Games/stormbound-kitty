import React from 'react'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Dialog from '../Dialog'
import useShare from '../../hooks/useShare'
import './index.css'

const ListBuilderShareButton = props => {
  const [hideInterface, setHideInterface] = React.useState(false)
  const dialog = React.useRef(null)
  const url = window.location.href
  const shareUrl = hideInterface
    ? url.endsWith('/display')
      ? url
      : url + '/display'
    : url
  const { share, hasCopied, canUseShareAPI } = useShare({
    url: shareUrl,
    title: props.title,
    content: props.content,
    shortenURL: true,
  })

  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()

  return (
    <>
      <CTA onClick={open} type='button'>
        Share list
      </CTA>
      <Dialog
        id='list-builder-share-dialog'
        title='Share list'
        dialogRef={instance => (dialog.current = instance)}
        image='/assets/images/cards/project_ph03-nix.png'
        close={close}
        ctaProps={{
          onClick: share,
          type: 'button',
          disabled: hasCopied,
          children: hasCopied
            ? '✓ Copied!'
            : canUseShareAPI
            ? 'Share list'
            : 'Copy link',
        }}
      >
        <p>
          Your list is automatically saved to the URL of the page as you work on
          it. You can safely reload the page, or bookmark it to come back to it
          later.
        </p>

        <p>
          If you would like to share your list with others, you can easily do so
          with the button below.
        </p>

        <div className='ListBuilderShareButton__checkbox'>
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

export default ListBuilderShareButton
