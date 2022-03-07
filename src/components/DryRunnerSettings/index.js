import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import DryRunnerEqualsMode from '~/components/DryRunnerEqualsMode'
import DryRunnerBrawlModifiers from '~/components/DryRunnerBrawlModifiers'
import DryRunnerRNGField from '~/components/DryRunnerRNGField'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function DryRunnerSettings(props) {
  const { css } = useFela()
  return (
    <div className={css(styles.container)}>
      <Title>Settings</Title>

      <Spacing bottom='BASE'>
        <Checkbox
          extend={styles.displayChance}
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
      </Spacing>

      <DryRunnerEqualsMode
        equalsMode={props.equalsMode}
        setEqualsMode={props.setEqualsMode}
      />

      <DryRunnerBrawlModifiers
        brawls={props.brawls}
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
