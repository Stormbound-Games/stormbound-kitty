import React from 'react'
import Checkbox from '../Checkbox'
import ShareDialog from '../ShareDialog'
import './index.css'

export default React.memo(function CardBuilderShareButton(props) {
  const [mode, setMode] = React.useState('LINK')
  const [hideInterface, setHideInterface] = React.useState(false)
  // If copying only the stats without the link, process the URL as null.
  const processURL = url =>
    mode === 'STATS' ? null : hideInterface ? url + '/display' : url

  return (
    <ShareDialog
      label='Share card'
      disabled={props.disabled}
      image='/assets/images/cards/collector_mirz.png'
      ctaLabel={
        'Copy ' +
        (mode === 'STATS' ? 'stats' : mode === 'LINK' ? 'link' : 'info')
      }
      share={{
        processURL,
        shortenURL: mode !== 'STATS',
        title: mode.includes('STATS') ? props.title : undefined,
        content: mode.includes('STATS') ? props.content : undefined,
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

      <label htmlFor='mode'>What to copy</label>
      <select
        id='mode'
        name='mode'
        required
        value={mode}
        onChange={event => setMode(event.target.value)}
      >
        <option value='LINK'>Link only</option>
        <option value='LINK_AND_STATS'>Link and stats as text</option>
        <option value='STATS'>Stats as text only</option>
      </select>

      <div className='CardBuilderShareDialog__checkbox'>
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
