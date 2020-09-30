import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import BattleSimPuzzle from '../BattleSimPuzzle'
import './index.css'

export default React.memo(function FeedPuzzleEntry(props) {
  const difficulty = ['easy', 'medium', 'hard'][props.difficulty - 1]
  const prefix = /^[aeiou]/.test(difficulty) ? 'an' : 'a'

  return (
    <FeedEntry icon='sword' date={props.date}>
      {props.author} has created {prefix} {difficulty} puzzle called{' '}
      <Link to={'/sim/' + props.board}>{props.name}</Link>.
      <div className='FeedEntryPuzzle__container'>
        <BattleSimPuzzle {...props} />
      </div>
    </FeedEntry>
  )
})
