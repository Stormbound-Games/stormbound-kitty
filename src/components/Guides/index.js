import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../Banner'
import InfoHint from '../InfoHint'
import PageMeta from '../PageMeta'
import guides from '../../data/guides'

export default React.memo(function Guides(props) {
  return (
    <>
      <h1 className='VisuallyHidden'>Guides</h1>

      {guides.map(guide => (
        <Banner
          key={guide.name}
          faction={guide.faction}
          title={guide.name}
          subline={
            <>
              By <Link to={'/member/' + guide.author}>{guide.author}</Link>
            </>
          }
          copy={guide.excerpt}
          cta={{
            'aria-label': `Read ${guide.name} by ${guide.author}`,
            to: guide.link,
            children: 'Read guide',
          }}
          image={guide.image}
        />
      ))}

      <Banner
        faction='ironclad'
        title='Lexicon'
        copy='Stormbound discussions are full of acronyms and shortened names. Tired of not being able to follow what’s going on on Discord and Reddit? This guide is for you.'
        cta={{ to: '/guides/lexicon', children: 'Read lexicon' }}
        image='/assets/images/cards/lawless_herd.png'
      />

      <InfoHint icon='compass'>
        Looking to teach others and guide them towards glorious battles?{' '}
        <Link to='/faq#adding-a-guide'>Have your own guide published</Link>.
      </InfoHint>

      <PageMeta
        title='Guides'
        description='Guides from the community about Stormbound'
      />
    </>
  )
})
