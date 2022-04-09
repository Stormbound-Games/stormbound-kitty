import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Page from '~/components/Page'

export default React.memo(function PageReleaseNotes(props) {
  return (
    <Page
      title={props.title}
      description={props.excerpt}
      author={props.author}
      image={props.background}
      action={{ to: '/releases', children: 'Back to releases' }}
      meta={'Official · ' + props.date}
      background={props.background}
      ratio={props.ratio}
      isEditorialContent
      withDropCap
    >
      <Page.Narrow>
        <BlocksRenderer value={props.content} />
      </Page.Narrow>
    </Page>
  )
})
