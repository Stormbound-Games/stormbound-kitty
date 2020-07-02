import React from 'react'
import { Link } from 'react-router-dom'
import ChangelogLegend from '../ChangelogLegend'
import Checkbox from '../Checkbox'
import Column from '../Column'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import changelog from '../../data/changelog'
import sortCards from '../../helpers/sortCards'
import template from '../../helpers/template'
import getRawCardData from '../../helpers/getRawCardData'
import cards from '../../data/cards'
import './index.css'
import MOOD_MAP from './map'

const CARD_IDS = cards.sort(sortCards()).map(card => card.id)
const getCardName = id => getRawCardData(id).name

const templateDescription = description => {
  const replacements = {}
  let output = description

  for (let [regex, Component] of MOOD_MAP) {
    output = output.replace(regex, match => {
      replacements[match] = <Component key={match}>{match}</Component>
      return `{{${match}}}`
    })
  }

  return { replacements, description: output }
}

const Change = React.memo(function Change(props) {
  if (!props.colorCoding) return props.description

  const { description, replacements } = templateDescription(props.description)

  return template(description, replacements)
})

const formatDate = date => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const day = parts[2].value
  const year = parts[4].value

  return month + ' ' + day + ', ' + year
}

export default function Changelog(props) {
  const [sorting, setSorting] = React.useState('DATE')
  const [colorCoding, setColorCoding] = React.useState(true)
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
      <h1 className='VisuallyHidden'>Changelog</h1>
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>Filters</Title>
          <Row>
            <Column>
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
            </Column>
            <Column>
              <label htmlFor='type'>Types of changes</label>
              <select
                id='type'
                name='type'
                value={type}
                onChange={event => setType(event.target.value)}
              >
                <option value='*'>Any</option>
                <option value='UPDATE'>Update</option>
                <option value='ADDITION'>Addition</option>
              </select>
            </Column>
          </Row>

          <Row>
            <Column>
              <Checkbox
                name='color-coding'
                id='color-coding'
                checked={colorCoding}
                onChange={event => setColorCoding(event.target.checked)}
              >
                Enable color-coding (experimental)
              </Checkbox>
              {colorCoding && <ChangelogLegend />}
            </Column>
          </Row>

          <p>
            This data is periodically scrapped from the official{' '}
            <a
              href='https://stormboundkingdomwars.gamepedia.com/Stormbound:_Kingdom_Wars_Wiki'
              target='_blank'
              rel='noopener noreferrer'
            >
              Wiki
            </a>
            . Thank you to Frozen for their work on maintaining the list of
            changes.
          </p>
        </Column>
        <Column width='2/3'>
          <Info icon='wand' title='Update July 2020'>
            <p>
              The first update from Sheepyard is there and contains a lot of
              things you should know. Be sure to read{' '}
              <Link to='/changelog/07-2020'>
                everything there is to know about it
              </Link>
              !
            </p>
          </Info>
          {sorting === 'DATE'
            ? Object.keys(changesByDate)
                .sort()
                .reverse()
                .map(date => (
                  <section className='Changelog__section' key={date}>
                    <Title className='Changelog__title'>
                      {formatDate(date)}
                    </Title>
                    <ul className='Changelog__list'>
                      {changesByDate[date].map(change => (
                        <li key={change.date + change.id + change.description}>
                          <WikiLink id={change.id} />:{' '}
                          <Change
                            description={change.description}
                            colorCoding={colorCoding}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                ))
            : Object.keys(changesByCard)
                .sort((a, b) => CARD_IDS.indexOf(a) - CARD_IDS.indexOf(b))
                .map(id => (
                  <section className='Changelog__section' key={id}>
                    <Title className='Changelog__title'>
                      {getCardName(id)}
                    </Title>
                    <ul className='Changelog__list'>
                      {changesByCard[id].map(change => (
                        <li key={id + change.date + change.description}>
                          <time className='Highlight'>
                            {formatDate(change.date)}
                          </time>
                          :{' '}
                          <Change
                            description={change.description}
                            colorCoding={colorCoding}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
        </Column>
      </Row>
      <PageMeta
        title='Changelog'
        description='Find all cards changes that ever happened on Stormbound'
      />
    </>
  )
}
