import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import HallOfFameTeaser from '../HallOfFameTeaser'
import serialisation from '../../helpers/serialisation'
import './index.css'

export default React.memo(function FeedCardEntry(props) {
  const card = serialisation.card.deserialise(props.winner.id)

  return (
    <FeedEntry icon='wand' date={props.date}>
      {props.winner.author} has won a 🥇{' '}
      <span className='Highlight'>weekly card competition</span> (week #
      {props.week}, themed <span className='Highlight'>{props.name}</span>) with
      a card called <Link to={'/card/' + props.winner.id}>{card.name}</Link>.
      <div className='FeedEntryCard__container'>
        <HallOfFameTeaser {...props} number={props.week} />
      </div>
    </FeedEntry>
  )
})
