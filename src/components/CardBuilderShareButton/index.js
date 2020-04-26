import React from 'react'
import Checkbox from '../Checkbox'
import ShareDialog from '../ShareDialog'
import './index.css'

const CardBuilderShareButton = React.memo(props => {
  const [includeStats, setIncludeStats] = React.useState(false)
  const [hideInterface, setHideInterface] = React.useState(false)
  const url = window.location.href
  const shareUrl = hideInterface
    ? url.endsWith('/display')
      ? url
      : url + '/display'
    : url

  return (
    <ShareDialog
      label='Share card'
      disabled={props.disabled}
      image='/assets/images/cards/collector_mirz.png'
      share={{
        url: shareUrl,
        shortenURL: true,
        title: includeStats ? props.title : undefined,
        content: includeStats ? props.content : undefined,
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
    </ShareDialog>
  )
})

export default CardBuilderShareButton
