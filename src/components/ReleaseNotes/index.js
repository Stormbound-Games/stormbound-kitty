import React from 'react'
import Page from '~/components/Page'
import indexArray from '~/helpers/indexArray'
import RELEASES from '~/data/releases'

const RELEASES_INDEX = indexArray(RELEASES)

export default React.memo(function ReleaseNotes(props) {
  const release = RELEASES_INDEX[props.id]

  return (
    <Page
      title={release.title}
      description={release.excerpt}
      author='Kitty'
      image={release.background}
      action={{ to: '/releases', children: 'Back to releases' }}
      meta={'Official · ' + release.date}
      background={release.background}
      ratio={release.ratio}
      withAvif={typeof props.withAvif === 'undefined' ? true : props.withAvif}
      isEditorialContent
      withDropCap
    >
      {props.children}
    </Page>
  )
})
