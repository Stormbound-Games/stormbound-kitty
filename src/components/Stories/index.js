import React from 'react'
import { FACTIONS } from '../../constants/game'
import Banner from '../Banner'
import PageMeta from '../PageMeta'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'

const ILLUSTATION = {
  lore: getRawCardData('N46'),
  neutral: getRawCardData('N59'),
  winter: getRawCardData('W8'),
  ironclad: getRawCardData('I17'),
  shadowfen: getRawCardData('F21'),
  swarm: getRawCardData('S19'),
}

const Stories = props => (
  <>
    <div className='Stories'>
      <h1 className='visually-hidden'>Stories</h1>

      <Banner
        faction='lore'
        title={`Lore stories`}
        copy={`Discover the amazing tales from the community about the lore and embark on a mythical journey through myths and legends.`}
        cta={{
          'aria-label': 'Read stories about the lore',
          to: '/stories/lore',
          children: (
            <>
              Read <span className='visually-hidden'>lore</span> stories
            </>
          ),
        }}
        image={ILLUSTATION.lore.image}
      />

      {Object.keys(FACTIONS).map(faction => (
        <Banner
          key={faction}
          faction={faction}
          title={`${capitalise(faction)} stories`}
          copy={`Discover the amazing tales from the community about the ${capitalise(
            faction
          )} faction and embark on a mythical journey through myths and legends.`}
          cta={{
            'aria-label': 'Read stories about ' + faction,
            to: '/stories/' + faction,
            children: (
              <>
                Read <span className='visually-hidden'>{faction}</span> stories
              </>
            ),
          }}
          image={ILLUSTATION[faction].image}
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
