import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Teaser from '../Teaser'
import chunk from '../../helpers/chunk'
import getCurrentBrawl from '../../helpers/getCurrentBrawl'
import isBrawlRunning from '../../helpers/isBrawlRunning'
import { BRAWL_INDEX } from '../../constants/brawl'
import guides from '../../data/guides'

export const BRAWL_DATA = [
  {
    ...BRAWL_INDEX.DWARF_MANA,
    description: (
      <>
        All <span className='Highlight'>Dwarf</span> units cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial mana cost,
        for a minimum of 0.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.PIRATE_MANA,
    description: (
      <>
        All <span className='Highlight'>Pirate</span> units cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial mana cost,
        for a minimum of 0.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.RAVEN_MOVEMENT,
    description: (
      <>
        All <span className='Highlight'>Raven</span> units benefit from an extra{' '}
        <span className='Highlight'>+1 movement</span> on top of their initial
        movement.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.STRUCTURE_MANA,
    description: (
      <>
        All <span className='Highlight'>structures</span> cost{' '}
        <span className='Highlight'>2 mana</span>, regardless of their initial
        mana cost.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.RODENT_STRENGTH,
    description: (
      <>
        All <span className='Highlight'>Rodent</span> units benefit from an
        extra <span className='Highlight'>+3 strength</span> on top of their
        initial strength.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.PIRATE_MOVEMENT,
    description: (
      <>
        All <span className='Highlight'>Pirate</span> units have{' '}
        <span className='Highlight'>2 movement</span>, regardless of their
        initial movement.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.FELINE_STRENGTH,
    description: (
      <>
        All <span className='Highlight'>Feline</span> units benefit from an
        extra <span className='Highlight'>+2 strength</span> on top of their
        initial strength.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.SATYR_MOVEMENT,
    description: (
      <>
        All <span className='Highlight'>Satyr</span> units benefit from an extra{' '}
        <span className='Highlight'>+1 movement</span> on top of their initial
        movement.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.SPELL_MANA,
    description: (
      <>
        All <span className='Highlight'>spells</span> cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial mana cost,
        for a minimum of 0.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.FROSTLING_STRENGTH,
    description: (
      <>
        All <span className='Highlight'>Frostling</span> units benefit from an
        extra <span className='Highlight'>+4 strength</span> on top of their
        initial strength.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.TOAD_MANA,
    description: (
      <>
        All <span className='Highlight'>Toad</span> units cost{' '}
        <span className='Highlight'>2 mana</span>, regardless of their initial
        mana cost.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.ELDER_STRENGTH,
    description: (
      <>
        All <span className='Highlight'>Elder</span> units benefit from an extra{' '}
        <span className='Highlight'>+3 strength</span> on top of their initial
        strength.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.CONSTRUCT_MOVEMENT,
    description: (
      <>
        All <span className='Highlight'>Construct</span> units have{' '}
        <span className='Highlight'>2 movement</span>, regardless of their
        initial movement.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.KNIGHT_MANA,
    description: (
      <>
        All <span className='Highlight'>Knight</span> units cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial mana cost,
        for a minimum of 0.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.DRAGON_MOVEMENT,
    description: (
      <>
        All <span className='Highlight'>Dragon</span> units benefit from an
        extra <span className='Highlight'>+1 movement</span> on top of their
        initial movement.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.UNDEAD_STRENGTH,
    description: (
      <>
        All <span className='Highlight'>Undead</span> units benefit from an
        extra <span className='Highlight'>+2 strength</span> on top of their
        initial strength.
      </>
    ),
  },
  {
    ...BRAWL_INDEX.HERO_STRENGTH,
    description: (
      <>
        All <span className='Highlight'>Hero</span> units benefit from an extra{' '}
        <span className='Highlight'>+3 strength</span> on top of their initial
        strength.
      </>
    ),
  },
]

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
  const guide = guides.find(guide => guide.name === props.title)

  return (
    <BrawlTeaser
      {...props}
      label={getDateDisplay()}
      title={props.title}
      description={
        <>
          <span className='Highlight'>{props.label}</span> · {props.description}{' '}
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
  const brawl = BRAWL_DATA.find(brawl => brawl.id === getCurrentBrawl().id)

  return (
    <>
      <Only.Desktop>
        <HeaderBanner title='Brawl Tracker' />
        <BrawlBanner {...brawl} />
        <hr />
      </Only.Desktop>

      {chunk(BRAWL_DATA, 3).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          <Column width='1/3'>{row[0] && <BrawlTeaser {...row[0]} />}</Column>
          <Column width='1/3'>{row[1] && <BrawlTeaser {...row[1]} />}</Column>
          <Column width='1/3'>{row[2] && <BrawlTeaser {...row[2]} />}</Column>
        </Row>
      ))}

      <PageMeta
        title='Brawl'
        description='Find all the Brawl modes from Stormbound and their ideal decks'
      />
    </>
  )
})
