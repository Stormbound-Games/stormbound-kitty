import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import ShareDialog from '~/components/ShareDialog'
import Spacing from '~/components/Spacing'
import styles from './styles'

export default React.memo(function BattleSimShareButton(props) {
  const { css } = useFela()
  const [hideInterface, setHideInterface] = React.useState(false)
  const processURL = url =>
    hideInterface && !url.endsWith('/display') ? url + '/display' : url

  return (
    <ShareDialog
      label='Share board'
      disabled={props.disabled}
      image='https://cdn.sanity.io/images/5hlpazgd/production/77baae150df0e9784678c1147fd1fa0d0fcbb9ee-512x512.png'
      share={{ processURL, shortenURL: true }}
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

      <Spacing top='BASE'>
        <div className={css(styles.checkbox)}>
          <Checkbox
            id='hide-interface'
            checked={hideInterface}
            onChange={event => setHideInterface(event.target.checked)}
          >
            Hide editing interface
          </Checkbox>
        </div>
      </Spacing>
    </ShareDialog>
  )
})
