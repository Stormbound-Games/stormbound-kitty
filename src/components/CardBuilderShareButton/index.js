import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import Select from '~/components/Select'
import ShareDialog from '~/components/ShareDialog'
import Spacing from '~/components/Spacing'
import styles from './styles'

export default React.memo(function CardBuilderShareButton(props) {
  const { css } = useFela()
  const [mode, setMode] = React.useState('LINK')
  const [hideInterface, setHideInterface] = React.useState(false)
  // If copying only the stats without the link, process the URL as null.
  const processURL = url =>
    mode === 'STATS'
      ? null
      : hideInterface && !url.endsWith('/display')
      ? url + '/display'
      : url

  return (
    <ShareDialog
      label='Share card'
      disabled={props.disabled}
      image='https://cdn.sanity.io/images/5hlpazgd/production/d7567c8333cfa033713404794775bc0b939f5715-301x300.png'
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

      <Select
        label='What to copy'
        id='mode'
        required
        value={mode}
        onChange={event => setMode(event.target.value)}
      >
        <option value='LINK'>Link only</option>
        <option value='LINK_AND_STATS'>Link and stats as text</option>
        <option value='STATS'>Stats as text only</option>
      </Select>

      <Spacing vertical='BASE'>
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
