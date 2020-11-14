import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'
import getBrawlDescription from '../../helpers/getBrawlDescription'
import getCurrentBrawl from '../../helpers/getCurrentBrawl'
import getGuide from '../../helpers/getGuide'
import isBrawlRunning from '../../helpers/isBrawlRunning'
import { BRAWLS, BRAWL_INDEX } from '../../constants/brawl'

const BrawlTeaser = React.memo(function BrawlTeaser(props) {
  return (
    <Teaser
      large={props.large}
      data-testid='teaser'
      meta={props.label}
      title={props.title}
      cardId={props.cardId}
      excerpt={props.description}
      to={`/brawl/${props.id.toLowerCase().replace(/_/g, '-')}`}
    />
  )
})

const getDateDisplay = () => {
  const isRunning = isBrawlRunning()
  const dayOfTheWeek = new Date().getDay()

  if (!isRunning) {
    const startDate = dayOfTheWeek === 4 ? 'Starts today' : 'Starts on Thursday'

    return `Upcoming Brawl · ${startDate}`
  }

  if (dayOfTheWeek === 0) {
    return `Current Brawl · Ends today`
  }

  return `Current Brawl · Ends in ${7 - dayOfTheWeek} day${
    7 - dayOfTheWeek === 1 ? '' : 's'
  }`
}

const BrawlBanner = React.memo(function BrawlBanner(props) {
  const guide = getGuide(props.title, 'name')

  return (
    <BrawlTeaser
      {...props}
      label={getDateDisplay()}
      title={props.title}
      description={
        <>
          <span className='Highlight'>{props.label}</span> ·{' '}
          {getBrawlDescription(props.id)}{' '}
          {guide ? (
            <Link to={`/guides/${guide.slug}`}>Read Oeni’s Gazette</Link>
          ) : (
            <Link to={`/deck/suggestions?category=BRAWL&brawl=${props.id}`}>
              Prepare your deck
            </Link>
          )}
          . <br />
          <br />
          New to the Brawl? <Link to='/guides/brawl'>Read the guide</Link>.
        </>
      }
      large
    />
  )
})

export default React.memo(function BrawlIndex() {
  const brawl = BRAWL_INDEX[getCurrentBrawl().id]

  return (
    <>
      <Only.Desktop>
        <HeaderBanner title='Brawl Tracker' />
        <BrawlBanner {...brawl} />
        <hr />
      </Only.Desktop>

      {chunk(BRAWLS, 3).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          <Column width='1/3'>
            {row[0] && (
              <BrawlTeaser
                {...row[0]}
                description={getBrawlDescription(row[0].id)}
              />
            )}
          </Column>
          <Column width='1/3'>
            {row[1] && (
              <BrawlTeaser
                {...row[1]}
                description={getBrawlDescription(row[1].id)}
              />
            )}
          </Column>
          <Column width='1/3'>
            {row[2] && (
              <BrawlTeaser
                {...row[2]}
                description={getBrawlDescription(row[2].id)}
              />
            )}
          </Column>
        </Row>
      ))}

      <PageMeta
        title='Brawl'
        description='Find all the Brawl modes from Stormbound and their ideal decks'
      />
    </>
  )
})
