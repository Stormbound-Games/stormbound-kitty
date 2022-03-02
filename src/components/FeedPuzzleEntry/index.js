import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import BattleSimPuzzle from '~/components/BattleSimPuzzle'
import styles from './styles'

export default React.memo(function FeedPuzzleEntry(props) {
  const { css } = useFela()
  const difficulty = ['easy', 'medium', 'hard'][props.difficulty - 1]
  const prefix = /^[aeiou]/.test(difficulty) ? 'an' : 'a'

  return (
    <FeedEntry icon='sword' date={props.date}>
      {props.user.name} has created {prefix} {difficulty} puzzle called{' '}
      <Link to={'/simulators/battle/' + props.board}>{props.name}</Link>.
      <div className={css(styles.container)}>
        <BattleSimPuzzle {...props} />
      </div>
    </FeedEntry>
  )
})
