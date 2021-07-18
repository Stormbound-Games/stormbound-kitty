import React from 'react'
import { Link } from 'react-router-dom'
import FeaturedDeck from '../FeaturedDeck'
import FeedEntry from '../FeedEntry'
import Tags from '../Tags'
import capitalise from '../../helpers/capitalise'
import getFactionFromDeckID from '../../helpers/getFactionFromDeckID'
import './index.css'

export default React.memo(function FeedDeckEntry(props) {
  const faction = getFactionFromDeckID(props.id)
  const prefix = /^[aeiou]/.test(faction) ? 'an' : 'a'

  return (
    <FeedEntry icon='stack' date={props.date}>
      {props.author} has set up {prefix} {capitalise(faction)} deck with tags{' '}
      <Tags tags={props.tags} /> called{' '}
      <Link to={'/deck/' + props.id + '/detail'}>{props.name}</Link>.
      <div className='FeedDeckEntry__container'>
        <FeaturedDeck {...props} />
      </div>
    </FeedEntry>
  )
})
