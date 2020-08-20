import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Column from '../Column'
import FAQSection from '../FAQSection'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import Title from '../Title'
import tournaments from '../../constants/tournaments.json'
import toSentence from '../../helpers/toSentence'
import getRawCardData from '../../helpers/getRawCardData'
import formatDate from '../../helpers/formatDate'
import './index.css'

const getDate = string => {
  if (!string) return null
  const [day, month, year] = string.split('/')
  return new Date(+(20 + year), +month - 1, +day)
}

const getHallOfFame = () => {
  const hof = {}

  tournaments.forEach(tournament => {
    tournament.winners.forEach(winner => {
      if (typeof hof[winner] === 'undefined') {
        hof[winner] = []
      }
      hof[winner].push(tournament)
    })
  })

  return Object.keys(hof)
    .map(user => [user, hof[user]])
    .sort((a, b) => b[1].length - a[1].length)
}

export default React.memo(function TournamentHallOfFame(props) {
  const hallOfFame = getHallOfFame()

  return (
    <Article title='Tournaments'>
      <div className='Article__fullwidth'>
        <Title>Hall of Fame</Title>
        <Row desktopOnly>
          {hallOfFame.slice(0, 3).map(([user, tournaments], index) => (
            <Column width='1/3' key={user}>
              <Teaser
                title={
                  <>
                    {index + 1}. {user} ({tournaments.length} wins)
                  </>
                }
                card={{
                  name: user,
                  faction: ['swarm', 'neutral', 'ironclad'][index],
                  level: index + 1,
                  mana: index + 1,
                  type: 'unit',
                  race: ['Champion', 'Conqueror', 'Runner-up'][index],
                  image: getRawCardData(['N54', 'N32', 'N3'][index]).image,
                }}
                excerpt={
                  <>
                    {user} has won{' '}
                    {toSentence(
                      tournaments.map(tournament => tournament.name),
                      'and'
                    )}
                    .
                  </>
                }
              />
            </Column>
          ))}
        </Row>
      </div>

      <div className='Article__fullwidth'>
        <Title>Tournament History</Title>
        <table className='TournamentHallOfFame__table'>
          <thead>
            <tr>
              <th>Completion date</th>
              <th>Name</th>
              <th>Host(s)</th>
              <th>Winner(s)</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map(tournament => (
              <tr key={tournament.name}>
                <td>
                  {tournament.date
                    ? formatDate(getDate(tournament.date))
                    : 'Unknown date'}
                </td>
                <td>{tournament.name}</td>
                <td>{toSentence(tournament.hosts, 'and')}</td>
                <td>{toSentence(tournament.winners, 'and')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Notice icon='crown'>
        For more information about ongoing tournaments and how to participate,
        join the{' '}
        <a
          href='https://discord.gg/stormbound'
          target='_blank'
          rel='noopener noreferrer'
        >
          official Discord server
        </a>
        .
      </Notice>

      <FAQSection
        id='faq'
        title='FAQ'
        entries={[
          {
            id: 'hosting-an-event',
            question:
              'I have a tournament idea and would like to host an event. Where do I start?',
            answer:
              'Please message Kepp or Brzoza on Discord so they invite you to a dedicated Discord server where all the event hosts organise events. In there, you will find the schedule, and will be able to talk about your ideas and even get some help.',
          },
          {
            id: 'overlapping-events',
            question: 'Can I host a tournament while another is ongoing?',
            answer:
              'We usually tend to avoid that, unless you want to host something small, due to the player base not being big enough to host multiple events at the same time. Who knows, maybe one day…!',
          },
          {
            id: 'head-count',
            question: 'How many participants should I expect to join my event?',
            answer:
              'Generally, one can expect around 30 participants, 16 being the minimum. Some tournaments even reached 60 participants though but they become increasingly more difficult to organise!',
          },
          {
            id: 'rewards',
            question: 'How many rewards should I ask for?',
            answer:
              'Usually the prizes are around a Mythic Tome for the 1st player, Heroic Tome for the 2nd, Classic Tome for 3rd. One can also look into giving a few rubies to more players and other resources like fusion stones could also be taken into account.',
          },
          {
            id: 'tools',
            question: 'What tools/sites should I use to help me?',
            answer: (
              <>
                The <Link to='/deck'>deck builder</Link> to compose decks,
                <a
                  href='https://challonge.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Challonge
                </a>{' '}
                to create and display brackets, Google Forms for the submission
                form, and Discord for communication.
              </>
            ),
          },
          {
            id: 'rules',
            question: 'How to write good rules that prevent cheating?',
            answer:
              'Have a look at the rules of previous tournaments to avoid starting from scratch. Make sure to have them proofread by some tournament organisers so they are bulletproof. ',
          },
        ]}
      />

      <PageMeta
        title='Tournaments — Hall of Fame'
        description='Find the list of all past Stormbound tournaments and the hall of fame.'
      />
    </Article>
  )
})
