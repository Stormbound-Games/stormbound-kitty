import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { SWCC_SEASON_1, SWCC_SEASON_2, DONATORS } from '../../constants/misc'
import Article from '../Article'
import Column from '../Column'
import Icon from '../Icon'
import Image from '../Image'
import Info from '../Info'
import MemberFeedItem from '../MemberFeedItem'
import PageMeta from '../PageMeta'
import Row from '../Row'
import decks from '../../data/decks'
import guides from '../../data/guides'
import tournaments from '../../data/tournaments'
import art from '../../data/art'
import puzzles from '../../data/puzzles'
import capitalise from '../../helpers/capitalise'
import useFetch from '../../hooks/useFetch'
import './index.css'

const formatEntryWithDate = (separator = '/', key = 'date') => entry => {
  if (!entry[key]) return entry

  const [month, year] = entry[key].split(separator)

  return { ...entry, date: new Date(+year, +month - 1, 1) }
}

const addType = type => entry => ({ ...entry, type })

export default React.memo(function Member(props) {
  const { data: stories = [] } = useFetch('/stories.json')
  const match = useRouteMatch()
  const id = match.params.memberId.toLowerCase()
  const userStories = stories
    .filter(story => story.date && story.author.toLowerCase() === id)
    .map(formatEntryWithDate())
  const userDecks = decks
    .filter(deck => deck.author.toLowerCase() === id)
    .map(formatEntryWithDate())
  const userGuides = guides
    .filter(guide => guide.authors.map(host => host.toLowerCase()).includes(id))
    .map(formatEntryWithDate())
  const userContests = tournaments
    .filter(tournament =>
      tournament.hosts.map(host => host.toLowerCase()).includes(id)
    )
    .map(formatEntryWithDate())
  const userVictories = tournaments
    .filter(tournament =>
      tournament.podium
        .flat()
        .map(winner => winner.toLowerCase())
        .includes(id)
    )
    .map(formatEntryWithDate())
  const userArts = art
    .filter(art => art.author.toLowerCase() === id)
    .map(formatEntryWithDate())
  const userPuzzles = puzzles
    .filter(puzzle => puzzle.author.toLowerCase() === id)
    .map(formatEntryWithDate())
  const userCards = SWCC_SEASON_1.filter(
    contest => contest.winner.author.toLowerCase() === id
  )
    .map(entry => ({
      ...entry,
      date: new Date(2019, 0, 1 + (entry.week - 1) * 7),
    }))
    .concat(
      SWCC_SEASON_2.filter(
        contest => contest.winner && contest.winner.author.toLowerCase() === id
      ).map(entry => ({
        ...entry,
        date: new Date(2020, 0, 1 + (entry.week - 1) * 7),
      }))
    )
  const userDonations = DONATORS.filter(
    donation => donation.author.toLowerCase() === id
  ).map(formatEntryWithDate())

  const content = [
    ...userStories.map(addType('STORY')),
    ...userGuides.map(addType('GUIDE')),
    ...userDecks.map(addType('DECK')),
    ...userContests.map(addType('TOURNAMENT_HOST')),
    ...userVictories.map(addType('TOURNAMENT_WINNER')),
    ...userArts.map(addType('ART')),
    ...userPuzzles.map(addType('PUZZLE')),
    ...userCards.map(addType('CARD')),
    ...userDonations.map(addType('DONATION')),
  ].sort((a, b) => b.date - a.date)

  const displayName = capitalise(id)

  return (
    <Article title={displayName}>
      <Article.FullWidth>
        {content.length > 0 ? (
          <Row desktopOnly wideGutter>
            <Column width='1/3'>
              <p>
                <span className='Highlight'>{displayName}</span> is a member of
                the Stormbound community. Their contribution can be found below.
              </p>
              <ul className='Member__toc'>
                <li>
                  <Icon icon='quill' /> {userStories.length}{' '}
                  {userStories.length === 1 ? 'story' : 'stories'}
                </li>
                <li>
                  <Icon icon='compass' /> {userGuides.length}{' '}
                  {userGuides.length === 1 ? 'guide' : 'guides'}
                </li>
                <li>
                  <Icon icon='stack' /> {userDecks.length}{' '}
                  {userDecks.length === 1 ? 'deck' : 'decks'}
                </li>
                <li>
                  <Icon icon='users' /> {userContests.length} hosted{' '}
                  {userContests.length === 1 ? 'tournament' : 'tournaments'}
                </li>
                <li>
                  <Icon icon='trophy' /> {userVictories.length} won{' '}
                  {userVictories.length === 1 ? 'tournament' : 'tournaments'}
                </li>
                <li>
                  <Icon icon='trophy' /> {userCards.length} won{' '}
                  {userCards.length === 1 ? 'card contest' : 'card contests'}
                </li>
                <li>
                  <Icon icon='image' /> {userArts.length}{' '}
                  {userArts.length === 1 ? 'artwork' : 'artworks'}
                </li>
                <li>
                  <Icon icon='sword' /> {userPuzzles.length}{' '}
                  {userPuzzles.length === 1 ? 'puzzle' : 'puzzles'}
                </li>
              </ul>
              {userDonations.length > 0 && (
                <Info icon='heart' title='Financial contributor'>
                  {displayName} is one of the generous contributors who can make
                  Stormbound-Kitty a reality. Thank you and welcome to the{' '}
                  <abbr title='Kitty Appreciation Team'>KAT</abbr>!
                </Info>
              )}
            </Column>
            <Column width='2/3'>
              <ul className='Member__feed'>
                {content.map((entry, index) => (
                  <li key={index} className='Member__item'>
                    <MemberFeedItem {...entry} user={id} />
                  </li>
                ))}
              </ul>
            </Column>
          </Row>
        ) : (
          <div className='Member__empty'>
            <Image
              src='/assets/images/cards/sweetcap_kittens.png'
              className='Error__image'
            />
            <p>
              No ‘{displayName}’ user could be found, or no content was
              associated to that user. If you believe this is a bug, please
              report it to Kitty#1909 on Discord.
            </p>
          </div>
        )}
      </Article.FullWidth>

      <PageMeta
        noIndex={content.length === 0}
        title={displayName}
        description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      />
    </Article>
  )
})
