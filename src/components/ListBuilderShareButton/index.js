import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import ShareDialog from '~/components/ShareDialog'
import Spacing from '~/components/Spacing'
import styles from './styles'

export default React.memo(function ListBuilderShareButton(props) {
  const { css } = useFela()
  const [hideInterface, setHideInterface] = React.useState(false)
  const processURL = url =>
    hideInterface && !url.endsWith('/display') ? url + '/display' : url

  return (
    <ShareDialog
      label='Share list'
      disabled={props.disabled}
      image='https://cdn.sanity.io/images/5hlpazgd/production/75fe3608b1fb8b5a814addd5633268dde65aa978-512x512.png'
      share={{
        processURL,
        title: props.title,
        content: props.content,
        shortenURL: true,
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

      <Spacing bottom='BASE'>
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
