import React from 'react'
import { Link } from 'react-router-dom'
import CardChangesLegend from '../CardChangesLegend'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import CardLink from '../CardLink'
import changelog from '../../data/changelog'
import sortCards from '../../helpers/sortCards'
import getRawCardData from '../../helpers/getRawCardData'
import { formatDate } from '../../helpers/formatDate'
import cards from '../../data/cards'
import './index.css'

const CARD_IDS = cards.sort(sortCards()).map(card => card.id)
const getCardName = id => getRawCardData(id).name

const Change = React.memo(function Change(props) {
  return props.type ? (
    <span className={`CardChanges__${props.type.toLowerCase()}`}>
      {props.description}
    </span>
  ) : (
    props.description
  )
})

export default function CardChangelog(props) {
  const [sorting, setSorting] = React.useState('DATE')
  const [type, setType] = React.useState('*')
  const changesByDate = React.useMemo(() => {
    return changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        if (!acc[change.date]) {
          acc[change.date] = []
        }
        acc[change.date].push(change)
        return acc
      }, {})
  }, [type])
  const changesByCard = React.useMemo(() => {
    return changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        if (!acc[change.id]) {
          acc[change.id] = []
        }
        acc[change.id].push(change)
        return acc
      }, {})
  }, [type])

  return (
    <>
      <HeaderBanner title='Card Changelog' />

      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>Filters</Title>
          <Row>
            <Row.Column>
              <label htmlFor='sorting'>Sort by</label>
              <select
                id='sorting'
                name='sorting'
                value={sorting}
                onChange={event => setSorting(event.target.value)}
              >
                <option value='DATE'>Date</option>
                <option value='CARD'>Card</option>
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='type'>Types of changes</label>
              <select
                id='type'
                name='type'
                value={type}
                onChange={event => setType(event.target.value)}
              >
                <option value='*'>Any</option>
                <option value='BUFF'>Buff</option>
                <option value='INFO'>Info</option>
                <option value='MIXED'>Mixed</option>
                <option value='NERF'>Nerf</option>
              </select>
            </Row.Column>
          </Row>

          <Row>
            <Row.Column>
              <CardChangesLegend />
            </Row.Column>
          </Row>

          <p className='CardChanges__disclaimer'>
            This data is periodically scrapped from the official{' '}
            <a
              href='https://stormboundkingdomwars.fandom.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Wiki
            </a>
            . Thank you to <Link to='/member/FrozenEarth'>FrozenEarth</Link> for
            their work on maintaining the list of changes.
          </p>

          <Info icon='compass' title='Release notes'>
            If you are looking for the details of a specific update, check out
            the <Link to='/releases'>release notes</Link>.
          </Info>
        </Row.Column>
        <Row.Column width='2/3'>
          {sorting === 'DATE'
            ? Object.keys(changesByDate)
                .sort()
                .reverse()
                .map(date => (
                  <section className='CardChanges__section' key={date}>
                    <Title className='CardChanges__title'>
                      {formatDate(date)}
                    </Title>
                    <ul className='CardChanges__list'>
                      {changesByDate[date].map(change => (
                        <li key={change.date + change.id + change.description}>
                          <CardLink id={change.id} />: <Change {...change} />
                        </li>
                      ))}
                    </ul>
                  </section>
                ))
            : Object.keys(changesByCard)
                .sort((a, b) => CARD_IDS.indexOf(a) - CARD_IDS.indexOf(b))
                .map(id => (
                  <section className='CardChanges__section' key={id}>
                    <Title className='CardChanges__title'>
                      {getCardName(id)}
                    </Title>
                    <ul className='CardChanges__list'>
                      {changesByCard[id].map(change => (
                        <li key={id + change.date + change.description}>
                          <time className='Highlight'>
                            {formatDate(change.date)}
                          </time>
                          : <Change {...change} />
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
        </Row.Column>
      </Row>
      <PageMeta
        title='Card Changes'
        description='Find all cards changes that ever happened on Stormbound'
      />
    </>
  )
}
