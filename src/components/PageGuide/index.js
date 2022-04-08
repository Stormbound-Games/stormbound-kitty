import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import HorizontalRule from '~/components/HorizontalRule'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Notice from '~/components/Notice'
import Only from '~/components/Only'
import getExcerpt from '~/helpers/getExcerpt'
import parseDate from '~/helpers/parseDate'
import { formatDate } from '~/helpers/formatDate'
import { CATEGORIES } from '~/constants/guides'

export const GuideRenderingContext = React.createContext({
  isWithinGuide: false,
})

export default React.memo(function PageGuide(props) {
  const date = parseDate(props.date)

  return (
    <>
      <Page
        title={props.name}
        description={getExcerpt(props.excerpt, 160)}
        image={props.background}
        authors={props.authors}
        meta={formatDate(date) + ' · ' + CATEGORIES[props.category].name.short}
        background={props.background}
        action={{
          to: '/guides/' + CATEGORIES[props.category].slug,
          children: 'Back to guides',
        }}
        ratio={props.ratio}
        isEditorialContent
        withDropCap
      >
        <Page.Narrow>
          <GuideRenderingContext.Provider value={{ isWithinGuide: true }}>
            <BlocksRenderer value={props.content} />
          </GuideRenderingContext.Provider>
        </Page.Narrow>
      </Page>

      <HorizontalRule
        // The `Page` component right above this one applies a significant
        // bottom margin, so there is no need for extra top margin.
        spacing={{ top: 'NONE', bottom: ['LARGE', 'LARGER'] }}
      />

      <Notice icon='compass' spacing={{ bottom: 'BASE' }}>
        Looking to teach others and guide them towards glorious battles?
        <Only.Desktop>
          <br />
        </Only.Desktop>{' '}
        <Link to={{ pathname: '/faq', hash: '#adding-a-guide' }}>
          Have your own guide published
        </Link>
        .
      </Notice>
    </>
  )
})
