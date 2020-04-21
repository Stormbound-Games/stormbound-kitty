import React from 'react'
import { Link } from 'react-router-dom'
import { FACTIONS } from '../../constants/game'
import Banner from '../Banner'
import InfoHint from '../InfoHint'
import PageMeta from '../PageMeta'
import capitalise from '../../helpers/capitalise'

const ILLUSTATION = {
  lore: '/assets/images/cards/tegor_the_vengeful.png',
  neutral: '/assets/images/cards/edrik_the_fierce.png',
  winter: '/assets/images/cards/spellbinder_zhevana.png',
  ironclad: '/assets/images/cards/eloth_the_ignited.png',
  shadowfen: '/assets/images/cards/broodmother_qordia.png',
  swarm: '/assets/images/cards/xuri_lord_of_life.png',
}

const Stories = props => (
  <>
    <div className='Stories'>
      <h1 className='visually-hidden'>Stories</h1>

      <Banner
        title='Lore stories'
        copy='Discover the amazing tales from the community about the lore and embark on a mythical journey through myths and legends.'
        cta={{
          'aria-label': 'Read stories about the lore',
          to: '/stories/lore',
          children: 'Lore stories',
        }}
        image={ILLUSTATION.lore}
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
          image={ILLUSTATION[faction]}
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
