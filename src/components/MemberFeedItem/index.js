import React from 'react'
import { Link } from 'react-router-dom'
import BattleSimPuzzle from '../BattleSimPuzzle'
import FeaturedDeck from '../FeaturedDeck'
import HallOfFameTeaser from '../HallOfFameTeaser'
import Icon from '../Icon'
import Only from '../Only'
import capitalise from '../../helpers/capitalise'
import serialisation from '../../helpers/serialisation'
import getFactionFromDeckID from '../../helpers/getFactionFromDeckID'
import { CATEGORIES } from '../../constants/guides'
import { CATEGORIES as DECK_CATEGORIES } from '../../constants/decks'
import { STORY_CATEGORIES } from '../../constants/stories'
import './index.css'

const formatDate = date => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const year = parts[2].value

  return month + ' ' + year
}

const FeedEntry = React.memo(function FeedEntry(props) {
  return (
    <div className='MemberFeedItem'>
      <span className='MemberFeedItem__left'>
        <Icon icon={props.icon} className='MemberFeedItem__icon' />
      </span>
      <div className='MemberFeedItem__main'>
        <time
          className='MemberFeedItem__date'
          dateTime={
            props.date.getFullYear() +
            '-' +
            String(props.date.getMonth()).padStart(2, '0')
          }
        >
          In {formatDate(props.date)}
        </time>
        <div className='MemberFeedItem__label'>{props.children}</div>
      </div>
    </div>
  )
})

const FeedGuideEntry = React.memo(function FeedGuideEntry(props) {
  const category = CATEGORIES[props.category].name.short.toLowerCase()
  const prefix = /^[aeiou]/.test(category) ? 'an' : 'a'
  const name = props.authors.find(author => author.toLowerCase() === props.user)

  return (
    <FeedEntry icon='compass' date={props.date}>
      {name} has written
      {props.authors.length > 1 ? (
        <>
          , alongside{' '}
          {props.authors
            .filter(author => author !== name)
            .reduce(
              (acc, author, index, arr) => (
                <>
                  {acc}
                  {index === 0
                    ? ''
                    : index === arr.length - 1
                    ? ' and'
                    : ','}{' '}
                  <Link to={'/member/' + author}>{author}</Link>
                </>
              ),
              <></>
            )}
          ,
        </>
      ) : null}{' '}
      {prefix} {category} guide called{' '}
      <Link to={'/guides/' + props.slug}>{props.name}</Link>.
      <blockquote>{props.excerpt}</blockquote>
    </FeedEntry>
  )
})

const FeedDeckEntry = React.memo(function FeedDeckEntry(props) {
  const faction = getFactionFromDeckID(props.id)
  const prefix = /^[aeiou]/.test(faction) ? 'an' : 'a'

  return (
    <FeedEntry icon='stack' date={props.date}>
      {props.author} has set up {prefix} {capitalise(faction)} deck in the{' '}
      {DECK_CATEGORIES[props.category]} category called{' '}
      <Link to={'/deck/' + props.id + '/detail'}>{props.name}</Link>.
      <div className='MemberFeedItem__featured-deck'>
        <FeaturedDeck {...props} />
      </div>
    </FeedEntry>
  )
})

const FeedTournamentHostEntry = React.memo(function FeedTournamentHostEntry(
  props
) {
  const name = props.hosts.find(u => u.toLowerCase() === props.user)

  return (
    <FeedEntry icon='users' date={props.date}>
      {name} has organised {props.name}.
    </FeedEntry>
  )
})

const FeedTournamentWinnerEntry = React.memo(function FeedTournamentWinnerEntry(
  props
) {
  const isAtIndex = index =>
    props.podium[index]
      ? Array.isArray(props.podium[index])
        ? props.podium[index].map(u => u.toLowerCase()).includes(props.user)
        : props.podium[index].toLowerCase() === props.user
      : false
  const index = [0, 1, 2].map(isAtIndex).indexOf(true)
  const name = Array.isArray(props.podium[index])
    ? props.podium[index].find(u => u.toLowerCase() === props.user)
    : props.podium[index]
  const emoji = ['🥇', '🥈', '🥉'][index]
  const label = ['gold', 'silver', 'bronze'][index]

  return (
    <FeedEntry icon='trophy' date={props.date}>
      {name} has won
      {Array.isArray(props.podium[index]) ? (
        <>
          , alongside{' '}
          {props.podium[index]
            .filter(winner => winner !== name)
            .reduce(
              (acc, winner, index, arr) => (
                <>
                  {acc}
                  {index === 0
                    ? ''
                    : index === arr.length - 1
                    ? ' and'
                    : ','}{' '}
                  <Link to={'/member/' + winner}>{winner}</Link>
                </>
              ),
              <></>
            )}
          ,
        </>
      ) : null}{' '}
      the{' '}
      <span className='Highlight'>
        {emoji} {label} medal
      </span>{' '}
      in {props.name}.
    </FeedEntry>
  )
})

const FeedArtEntry = React.memo(function FeedArtEntry(props) {
  return (
    <FeedEntry icon='image' date={props.date}>
      {props.author} has made some art.
      <details>
        <summary>
          <Only.Desktop>Click</Only.Desktop>
          <Only.Mobile>Tap</Only.Mobile> to expand
        </summary>
        <img
          src={'/assets/images/art/' + props.image}
          alt={'Artwork by' + props.author}
          className='MemberFeedItem__art'
        />
      </details>
    </FeedEntry>
  )
})

const FeedStoryEntry = React.memo(function FeedStoryEntry(props) {
  const category = STORY_CATEGORIES[props.category].shortName.toLowerCase()

  return (
    <FeedEntry icon='quill' date={props.date}>
      {props.author} has written a {category} story called{' '}
      <Link to={'/story/' + props.id}>{props.title}</Link>.
      <blockquote>{props.content}</blockquote>
    </FeedEntry>
  )
})

const FeedPuzzleEntry = React.memo(function FeedPuzzleEntry(props) {
  const difficulty = ['easy', 'medium', 'hard'][props.difficulty - 1]
  const prefix = /^[aeiou]/.test(difficulty) ? 'an' : 'a'

  return (
    <FeedEntry icon='sword' date={props.date}>
      {props.author} has created {prefix} {difficulty} puzzle called{' '}
      <Link to={'/sim/' + props.board}>{props.name}</Link>.
      <div className='MemberFeedItem__puzzle'>
        <BattleSimPuzzle {...props} />
      </div>
    </FeedEntry>
  )
})

const FeedCardEntry = React.memo(function FeedCardEntry(props) {
  const card = serialisation.card.deserialise(props.winner.id)

  return (
    <FeedEntry icon='wand' date={props.date}>
      {props.winner.author} has won a 🥇{' '}
      <span className='Highlight'>weekly card competition</span> (week #
      {props.week}, themed <span className='Highlight'>{props.name}</span>) with
      a card called <Link to={'/card/' + props.winner.id}>{card.name}</Link>.
      <div className='MemberFeedItem__card'>
        <HallOfFameTeaser {...props} number={props.week} />
      </div>
    </FeedEntry>
  )
})

export default React.memo(function MemberFeedItem(props) {
  switch (props.type) {
    case 'GUIDE':
      return <FeedGuideEntry {...props} />
    case 'DECK':
      return <FeedDeckEntry {...props} />
    case 'TOURNAMENT_HOST':
      return <FeedTournamentHostEntry {...props} />
    case 'TOURNAMENT_WINNER':
      return <FeedTournamentWinnerEntry {...props} />
    case 'ART':
      return <FeedArtEntry {...props} />
    case 'STORY':
      return <FeedStoryEntry {...props} />
    case 'PUZZLE':
      return <FeedPuzzleEntry {...props} />
    case 'CARD':
      return <FeedCardEntry {...props} />
    default:
      return null
  }
})
