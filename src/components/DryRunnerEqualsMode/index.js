import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import Dialog from '~/components/Dialog'
import Spacing from '~/components/Spacing'
import styles from './styles'

export default React.memo(function DryRunnerEqualsMode(props) {
  const { css } = useFela()
  const dialogRef = React.useRef()

  return (
    <Spacing bottom='LARGE'>
      <Checkbox
        id='equals-mode'
        data-testid='equals-mode'
        checked={props.equalsMode}
        onChange={event => dialogRef.current.show()}
      >
        Equal levels
        <span className={css(styles.info)}>Set all cards to level 1</span>
      </Checkbox>
      <Dialog
        id='equals-mode-dialog'
        data-testid='equals-mode-dialog'
        title='Equals mode'
        dialogRef={instance => (dialogRef.current = instance)}
        image='https://cdn.sanity.io/images/5hlpazgd/production/3886106424f6a20f584fa658760e7fe46bd35ab5-512x512.png'
        close={() => dialogRef.current.hide()}
        ctaProps={{
          onClick: () => {
            props.setEqualsMode(!props.equalsMode)
            dialogRef.current.hide()
          },
          'data-testid': 'reset-confirm-btn',
          children: 'Reset game',
        }}
      >
        Toggling “Equals” mode will reset the game. Are you sure you want to?
        Don’t worry, you’ll keep your deck.
      </Dialog>
    </Spacing>
  )
})
