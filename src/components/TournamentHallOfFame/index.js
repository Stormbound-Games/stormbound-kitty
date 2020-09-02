import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Column from '../Column'
import FAQSection from '../FAQSection'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import Table from '../Table'
import Title from '../Title'
import { Rubies } from '../Resource'
import tournaments from '../../constants/tournaments.json'
import toSentence from '../../helpers/toSentence'
import getRawCardData from '../../helpers/getRawCardData'
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

const getDate = string => {
  if (!string) return null
  const [month, year] = string.split('/')
  return new Date(+year, +month - 1, 1)
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
        <Table zebra className='TournamentHallOfFame__table'>
          <thead>
            <tr>
              <th>Completion date</th>
              <th>Name</th>
              <th>Host(s)</th>
              <th>Winner(s)</th>
            </tr>
          </thead>
          <tbody>
            {tournaments
              .slice(0)
              .reverse()
              .map(tournament => (
                <tr key={tournament.name}>
                  <td data-label='Date'>
                    {tournament.date
                      ? formatDate(getDate(tournament.date))
                      : 'Unknown date'}
                  </td>
                  <td data-label='Name'>{tournament.name}</td>
                  <td data-label='Host(s)'>
                    {toSentence(tournament.hosts, 'and')}
                  </td>
                  <td data-label='Winner(s)'>
                    {toSentence(tournament.winners, 'and')}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <FAQSection
        id='faq'
        title='FAQ'
        entries={[
          {
            id: 'about-tournaments',
            question: 'What exactly are tournaments? How do they work?',
            answer:
              'Tournaments are organised by community members and yield in-game rewards such as cards and rubies. They usually face about 20 players divided in brackets, eliminating more and more of them until there is only one (or more) winner left. Some tournmanents have different rules, but they more or less all work like this.',
          },
          {
            id: 'hosting-a-tournament',
            question: 'Who can host a tournament?',
            answer:
              'In theory, everyone can. Kepp and Brzoza on Discord are responsible for the schedule. If you would like to host an event, have them invite you to a dedicated Discord server where all the event hosts organise events. In there, you will find the schedule, and will be able to talk about your ideas and get some help.',
          },
          {
            id: 'head-count',
            question:
              'How many participants usually join an event? What kind of rewards can there be?',
            answer: (
              <>
                <p>
                  These both depend on the kind of event, whether it’s a{' '}
                  <span className='Highlight'>Tournament</span> or a{' '}
                  <span className='Highlight'>Joust</span>.
                </p>{' '}
                <p>
                  Tournaments can have unlimited members, and have a prize pool
                  of about <Rubies amount={400} /> to distribute between the
                  winners. They get official media coverage, but require at
                  least 2 hosts, last longer, and are bound to a pretty long
                  schedule.
                </p>
                <p>
                  Jousts on the other hand are smaller (up to 32 players), can
                  be self-hosted on a short schedule and usually have less
                  pressure on them. They do not benefit from media coverage and
                  the prize pool is about <Rubies amount={160} />.
                </p>
                <p>
                  This distinction helps the hosts with experimenting more with
                  events, without having to wait months for other tournaments to
                  be hosted, and generally makes things clearer for everyone.
                </p>
              </>
            ),
          },
          {
            id: 'tools',
            question: 'Are there tools to help organise everything?',
            answer: (
              <>
                The <Link to='/deck'>deck builder</Link> to compose decks,{' '}
                <a
                  href='https://challonge.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Challonge
                </a>{' '}
                to create and display brackets, Google Forms for the
                registration, and Discord for communication.
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

      <PageMeta
        title='Tournaments — Hall of Fame'
        description='Find the list of all past Stormbound tournaments and the hall of fame.'
      />
    </Article>
  )
})
