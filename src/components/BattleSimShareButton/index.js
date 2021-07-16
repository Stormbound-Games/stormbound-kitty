import React from 'react'
import Checkbox from '../Checkbox'
import ShareDialog from '../ShareDialog'
import './index.css'

export default React.memo(function BattleSimShareButton(props) {
  const [hideInterface, setHideInterface] = React.useState(false)
  const processURL = url =>
    hideInterface && !url.endsWith('/display') ? url + '/display' : url

  return (
    <ShareDialog
      label='Share board'
      disabled={props.disabled}
      image='/assets/images/cards/olf_the_hammer.png'
      share={{ processURL }}
    >
      <p>
        Your board is automatically saved to the URL of the page as you work on
        it. You can safely reload the page, or bookmark it to come back to it
        later.
      </p>

      <p>
        If you would like to share your board with others, you can easily do so
        with the button below.
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
    </ShareDialog>
  )
})
