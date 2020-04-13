import React from 'react'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Dialog from '../Dialog'
import useShare from '../../hooks/useShare'
import './index.css'

const CardBuilderShareButton = props => {
  const dialog = React.useRef(null)
  const [includeStats, setIncludeStats] = React.useState(false)
  const [hideInterface, setHideInterface] = React.useState(false)
  const url = window.location.href
  const shareUrl = hideInterface
    ? url.endsWith('/display')
      ? url
      : url + '/display'
    : url
  const { share, hasCopied, canUseShareAPI } = useShare({
    url: shareUrl,
    shortenURL: true,
    title: includeStats ? props.title : undefined,
    content: includeStats ? props.content : undefined,
  })

  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()

  return (
    <>
      <CTA onClick={open} type='button'>
        Share card
      </CTA>
      <Dialog
        id='card-builder-share-dialog'
        title='Share card'
        dialogRef={instance => (dialog.current = instance)}
        image='/assets/images/cards/collector-mirz.png'
        close={close}
        ctaProps={{
          onClick: share,
          type: 'button',
          disabled: hasCopied,
          children: hasCopied
            ? '✓ Copied!'
            : canUseShareAPI
            ? 'Share card'
            : 'Copy link',
        }}
      >
        <p>
          Your card is automatically saved to the URL of the page as you work on
          it. You can safely reload the page, or bookmark it to come back to it
          later.
        </p>

        <p>
          If you would like to share your card with others, you can easily do so
          with the button below.
        </p>

        <div className='CardBuilderShareDialog__checkbox'>
          <Checkbox
            name='include-stats'
            id='include-stats'
            checked={includeStats}
            onChange={event => setIncludeStats(event.target.checked)}
          >
            Include stats as text
          </Checkbox>
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

export default CardBuilderShareButton
