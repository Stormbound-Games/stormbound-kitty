import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import MemberList from '~/components/MemberList'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import Teasers from '~/components/Teasers'

export default React.memo(function Guides(props) {
  return (
    <Page
      title={props.category.name.long}
      description='Find guides from the community about Stormbound and improve your gameplay and knowledge about the game'
    >
      <Teasers
        items={props.guides.map(guide => ({
          cardId: guide.cardId,
          title: guide.name,
          meta: (
            <>
              Written by <MemberList members={guide.authors} />
            </>
          ),
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
