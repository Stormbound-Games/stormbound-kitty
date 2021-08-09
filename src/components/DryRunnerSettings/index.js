import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '../Checkbox'
import DryRunnerEqualsMode from '../DryRunnerEqualsMode'
import DryRunnerBrawlModifiers from '../DryRunnerBrawlModifiers'
import DryRunnerRNGField from '../DryRunnerRNGField'
import Title from '../Title'
import styles from './styles'

export default React.memo(function DryRunnerSettings(props) {
  const { css } = useFela()
  return (
    <div className={css(styles.container)}>
      <Title>Settings</Title>

      <Checkbox
        extend={styles.displayChance}
        name='display-chance'
        id='display-chance'
        checked={props.displayChance}
        onChange={event => props.setDisplayChance(event.target.checked)}
        data-testid='display-chance'
      >
        Drawing odds
        <span className={css(styles.info)}>
          Display drawing odds in the deck
        </span>
      </Checkbox>

      <DryRunnerEqualsMode
        equalsMode={props.equalsMode}
        setEqualsMode={props.setEqualsMode}
      />

      <DryRunnerBrawlModifiers
        modifier={props.modifier}
        setModifier={props.setModifier}
      />

      <DryRunnerRNGField
        RNG={props.RNG}
        setRNG={props.setRNG}
        deck={props.deck}
      />
    </div>
  )
})
