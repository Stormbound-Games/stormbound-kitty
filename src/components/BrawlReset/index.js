import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '../BrawlProvider'
import Checkbox from '../Checkbox'
import CTA from '../CTA'
import Dialog from '../Dialog'
import Info from '../Info'
import Spacing from '../Spacing'
import styles from './styles'

export default React.memo(function BrawlReset(props) {
  const { css } = useFela()
  const { brawl, resetBrawl } = React.useContext(BrawlContext)
  const [discard, setDiscard] = React.useState(false)
  const dialog = React.useRef()
  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()

  if (brawl.matches.length === 0) return null

  return (
    <>
      <Info
        icon='crown'
        title='Reset data'
        CTA={
          <CTA onClick={open} data-testid='reset-btn'>
            Reset Brawl
          </CTA>
        }
      >
        <p>
          If this data is from a past Brawl or just irrelevant, you can reset it
          to record a brand new Brawl. You will be asked to confirm.
        </p>
      </Info>
      <Dialog
        id='reset-dialog'
        data-testid='reset-dialog'
        dialogRef={instance => (dialog.current = instance)}
        title='Reset Brawl data'
        close={close}
        image='/assets/images/cards/execution.png'
        ctaProps={{
          type: 'button',
          onClick: () => {
            setDiscard(false)
            resetBrawl(discard)
            close()
          },
          'data-testid': 'reset-confirm-btn',
          children: 'Reset',
        }}
      >
        <p>
          You can reset this Brawl data so you can start recording a new Brawl
          from scratch.
        </p>
        <p>
          The current data will be locally saved for comparison analysis with
          newer Brawls. If you do not want to save this data at all, check the
          following checkbox.{' '}
          <strong className='Highlight'>This cannot be undone.</strong>
        </p>
        <Spacing bottom='BASE'>
          <div className={css(styles.checkbox)}>
            <Checkbox
              id='discard-brawl'
              value={discard}
              onChange={event => setDiscard(event.target.checked)}
            >
              Discard this Brawl data
            </Checkbox>
          </div>
        </Spacing>
      </Dialog>
    </>
  )
})
