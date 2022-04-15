import React from 'react'
import Page from '~/components/Page'
import BlocksRenderer from '~/components/BlocksRenderer'

export default React.memo(function PageDynamic(props) {
  return (
    <Page
      title={props.title}
      background={props.background}
      ratio={props.ratio}
      isEditorialContent
      withDropCap
      // The following props are for the meta tags.
      image={props.background}
      description={props.description}
    >
      <Page.Narrow>
        <BlocksRenderer value={props.content} />
      </Page.Narrow>
    </Page>
  )
})
