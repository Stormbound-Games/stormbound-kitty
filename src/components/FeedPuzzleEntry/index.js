import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import BattleSimPuzzle from '~/components/BattleSimPuzzle'
import styles from './styles'

export default React.memo(function FeedPuzzleEntry(props) {
  const { css } = useFela()

  return (
    <FeedEntry icon='sword' date={props.date}>
      {props.user.name} has created a puzzle called{' '}
      <Link to={'/simulators/battle/' + props.board}>{props.name}</Link>.
      <div className={css(styles.container)}>
        <BattleSimPuzzle {...props} />
      </div>
    </FeedEntry>
  )
})
