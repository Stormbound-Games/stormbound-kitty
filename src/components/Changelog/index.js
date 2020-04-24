import React from 'react'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import changelog from '../../data/changelog'
import sortCards from '../../helpers/sortCards'
import cards from '../../data/cards'
import './index.css'

const CARD_IDS = cards.sort(sortCards()).map(card => card.id)
const getCardName = id => cards.find(card => card.id === id).name

const Changelog = props => {
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
      <h1 className='VisuallyHidden'>Changelog</h1>
      <Row desktopOnly wideGutter>
        <Column width={33}>
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
                value={sorting}
                onChange={event => setType(event.target.value)}
              >
                <option value='*'>Any</option>
                <option value='UPDATE'>Update</option>
                <option value='ADDITION'>Addition</option>
              </select>
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
        <Column width={66}>
          {sorting === 'DATE'
            ? Object.keys(changesByDate)
                .sort()
                .reverse()
                .map(date => (
                  <section className='Changelog__section' key={date}>
                    <Title className='Changelog__title'>
                      {new Date(+date).toDateString()}
                    </Title>
                    <ul className='Changelog__list'>
                      {changesByDate[date].map(change => (
                        <li key={change.date + change.id + change.description}>
                          <WikiLink id={change.id} />: {change.description}
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
                            {new Date(change.date)
                              .toDateString()
                              .split(' ')
                              .slice(1)
                              .join(' ')}
                          </time>
                          : {change.description}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
        </Column>
      </Row>
      <PageMeta
        title='Changelog'
        description='All cards changes that ever happened on Stormbound.'
      />
    </>
  )
}

export default Changelog
