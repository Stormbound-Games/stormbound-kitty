import React from 'react'
import Banner from '../Banner'
import PageMeta from '../PageMeta'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const BRAWLS = [
  {
    name: 'Let The Bodies Hit The Floor',
    description: (
      <>
        All <span className='Highlight'>Undead</span> units benefit from an
        extra <span className='Highlight'>+2 strength</span> on top of their
        initial strength.
      </>
    ),
    image: 'S21',
    faction: 'swarm',
  },
  {
    name: 'There Be Dragons',
    description: (
      <>
        All <span className='Highlight'>Dragon</span> units benefit from an
        extra <span className='Highlight'>+1 movement</span> on top of their
        initial movement.
      </>
    ),
    image: 'N46',
    faction: null,
  },
  {
    name: 'Knight Knight Sweetie',
    description: (
      <>
        All <span className='Highlight'>Knight</span> units cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial mana cost,
        for a minimum of 0.
      </>
    ),
    image: 'N59',
    faction: null,
  },
  {
    name: 'Rage Against The Machines',
    description: (
      <>
        All <span className='Highlight'>Construct</span> units have{' '}
        <span className='Highlight'>=2 movement</span>, regardless of their
        initial movement.
      </>
    ),
    image: 'I22',
    faction: 'ironclad',
  },
  {
    name: 'Respect Your Elders',
    description: (
      <>
        All <span className='Highlight'>Elder</span> units benefit from an extra{' '}
        <span className='Highlight'>+3 strength</span> on top of their initial
        strength.
      </>
    ),
    image: 'N76',
    faction: null,
  },
  {
    name: 'Hop Hop Chop Chop',
    description: (
      <>
        All <span className='Highlight'>Toad</span> units cost{' '}
        <span className='Highlight'>2 mana</span>, regardless of their initial
        mana cost.
      </>
    ),
    image: 'F12',
    faction: 'shadowfen',
  },
  {
    name: 'I Got Chills',
    description: (
      <>
        All <span className='Highlight'>Frostling</span> units benefit from an
        extra <span className='Highlight'>+4 strength</span> on top of their
        initial strength.
      </>
    ),
    image: 'W10',
    faction: 'winter',
  },
  {
    name: 'Spellcaster',
    description: (
      <>
        All <span className='Highlight'>spells</span> cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial man a
        cost, for a minimum of 0.
      </>
    ),
    image: 'N48',
    faction: 'winter',
  },
  {
    name: 'Scream Like A Goat',
    description: (
      <>
        All <span className='Highlight'>Satyr</span> units benefit from an extra{' '}
        <span className='Highlight'>+1 movement</span> on top of their initial
        movement.
      </>
    ),
    image: 'S3',
    faction: 'swarm',
  },
  {
    name: 'Soft Kitty, Warm Kitty',
    description: (
      <>
        All <span className='Highlight'>Feline</span> units benefit from an
        extra <span className='Highlight'>+2 strength</span> on top of their
        initial strength.
      </>
    ),
    image: 'N69',
    faction: null,
  },
  {
    name: 'Yaaahr And A Bottle O’ Rhum',
    description: (
      <>
        All <span className='Highlight'>Pirate</span> units have{' '}
        <span className='Highlight'>=2 movement</span>, regardless of their
        initial movement.
      </>
    ),
    image: 'N58',
    faction: null,
  },
  {
    name: 'Is That A Gaming Mouse',
    description: (
      <>
        All <span className='Highlight'>Rodent</span> units benefit from an
        extra <span className='Highlight'>+3 strength</span> on top of their
        initial strength.
      </>
    ),
    image: 'I2',
    faction: 'ironclad',
  },
  {
    name: 'All Your Base Are Belong To Us',
    description: (
      <>
        All <span className='Highlight'>structures</span> have cost{' '}
        <span className='Highlight'>2 mana</span>, regardless of their initial
        mana cost.
      </>
    ),
    image: 'N35',
    faction: 'ironclad',
  },
  {
    name: 'Raven’ Got Claws',
    description: (
      <>
        All <span className='Highlight'>Raven</span> units benefit from an extra{' '}
        <span className='Highlight'>+1 movement</span> on top of their initial
        movement.
      </>
    ),
    image: 'F23',
    faction: 'shadowfen',
  },
  {
    name: 'Snow White Ain’t Be Sleepin’ For Long',
    description: (
      <>
        All <span className='Highlight'>Dwarf</span> units cost{' '}
        <span className='Highlight'>-2 mana</span> from their initial cost, for
        a minimum of 0.
      </>
    ),
    image: 'W23',
    faction: 'winter',
  },
  {
    name: 'We Can Be Heroes',
    description: (
      <>
        All <span className='Highlight'>Hero</span> units benefit from an extra{' '}
        <span className='Highlight'>+3 strength</span> on top of their initial
        strength.
      </>
    ),
    image: 'N8',
    faction: null,
  },
]

const Stories = props => (
  <>
    <div className='Brawl'>
      <h1 className='visually-hidden'>Brawl</h1>

      {BRAWLS.map(brawl => (
        <Banner
          className='Brawl__section'
          key={brawl.name}
          faction={'swarm'}
          title={brawl.name}
          copy={
            <>
              {brawl.description}
              {brawl.faction ? (
                <>
                  {' '}
                  In this Brawl,{' '}
                  <span className='Highlight'>
                    {capitalise(brawl.faction)}
                  </span>{' '}
                  is likely the way to go when trying to reach higher ranks.
                </>
              ) : (
                ' Most factions are likely to compete in that Brawl, where there no clear winner.'
              )}
            </>
          }
          cta={{
            'aria-label': 'Browse decks for ' + brawl.name,
            to:
              '/deck/suggestions?category=BRAWL' +
              (brawl.faction ? `&faction=${brawl.faction}` : ''),
            children: (
              <>
                Check <span className='visually-hidden'>{brawl.name}</span>{' '}
                Decks
              </>
            ),
          }}
          image={getRawCardData(brawl.image).image}
        />
      ))}
    </div>

    <PageMeta
      title='Stories'
      description='Stories from the community about Stormbound cards'
    />
  </>
)

export default Stories
