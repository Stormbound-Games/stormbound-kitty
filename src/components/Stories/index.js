import React from 'react'
import { Link } from 'react-router-dom'
import { FACTIONS } from '../../constants/game'
import Banner from '../Banner'
import InfoHint from '../InfoHint'
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
          children: 'Lore stories',
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
            children: `${faction} stories`,
          }}
          image={ILLUSTATION[faction].image}
        />
      ))}
    </div>

    <InfoHint icon='quill'>
      Looking to contribute to the Stormbound lore?{' '}
      <Link to='/faq#adding-a-story'>Have your own story published</Link>.
    </InfoHint>

    <PageMeta
      title='Stories'
      description='Stories from the community about Stormbound cards'
    />
  </>
)

export default Stories
