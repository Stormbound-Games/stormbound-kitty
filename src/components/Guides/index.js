import React from 'react'
import Link from '../Link'
import Page from '../Page'
import Notice from '../Notice'
import Only from '../Only'
import Teasers from '../Teasers'
import guides from '../../data/guides'
import renderAuthorsLinks from '../../helpers/renderAuthorsLinks'
import { CATEGORIES } from '../../constants/guides'

export default React.memo(function Guides(props) {
  const relevantGuides = guides.filter(
    guide => guide.category === props.category
  )

  return (
    <Page
      title={CATEGORIES[props.category].name.long}
      description='Find guides from the community about Stormbound and improve your gameplay and knowledge about the game'
    >
      <Teasers
        items={relevantGuides.map(guide => ({
          cardId: guide.cardId,
          title: guide.name,
          meta: <>Written by {guide.authors.reduce(renderAuthorsLinks, [])}</>,
          excerpt: guide.excerpt,
          to: '/guides/' + guide.slug,
        }))}
      />

      <Notice icon='compass'>
        Looking to teach others and guide them towards glorious battles?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-guide' }}>
          Have your own guide published
        </Link>
        .
      </Notice>
    </Page>
  )
})
