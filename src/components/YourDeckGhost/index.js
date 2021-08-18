import React from 'react'
import { useFela } from 'react-fela'
import Deck from '~/components/Deck'
import Spacing from '~/components/Spacing'
import BlankButton from '~/components/BlankButton'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import styles from './styles'

export default React.memo(function YourDeckGhost(props) {
  const { css } = useFela()
  const { decks } = React.useContext(PersonalDecksContext)
  const label = decks.length === 0 ? 'Add your deck' : 'Add a new deck'

  return (
    <Spacing bottom='LARGE'>
      <div className={css(styles.ghost)} data-testid='ghost-deck'>
        <BlankButton
          extend={styles.button}
          onClick={props.onClick}
          data-testid='ghost-deck-btn'
          label={label}
        />
        <Deck deck={[]} orientation='horizontal' />
        <span className={css(styles.name)} aria-hidden>
          {label}
        </span>
      </div>
    </Spacing>
  )
})
