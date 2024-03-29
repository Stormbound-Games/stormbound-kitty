import React from 'react'
import { useFela } from 'react-fela'
import CardLink from '#components/CardLink'
import Checkbox from '#components/Checkbox'
import DryRunnerEqualsMode from '#components/DryRunnerEqualsMode'
import DryRunnerBrawlModifiers from '#components/DryRunnerBrawlModifiers'
import DryRunnerRNGField from '#components/DryRunnerRNGField'
import Spacing from '#components/Spacing'
import Title from '#components/Title'
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
          <span className={css(styles.info)}>Drawing odds</span>
          Display drawing odds in the deck
        </Checkbox>
      </Spacing>

      <Spacing bottom='BASE'>
        <DryRunnerEqualsMode
          equalsMode={props.equalsMode}
          setEqualsMode={props.setEqualsMode}
        />
      </Spacing>

      <Spacing bottom='LARGE'>
        <Checkbox
          extend={styles.opponentFinch}
          id='opponent-finch'
          checked={props.opponentFinch}
          onChange={event => props.setOpponentFinch(event.target.checked)}
          data-testid='opponent-finch'
        >
          <span className={css(styles.info)}>Opponent Malicious Finch</span>
          Force the presence of <CardLink id='N106' /> in the opponent’s deck
        </Checkbox>
      </Spacing>

      <DryRunnerBrawlModifiers
        brawls={props.brawls}
        modifier={props.modifier}
        setModifier={props.setModifier}
      />

      <DryRunnerRNGField
        RNG={props.RNG}
        setRNG={props.setRNG}
        deck={props.deck}
        opponentDeck={props.opponentDeck}
      />
    </div>
  )
})
