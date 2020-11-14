import React from 'react'
import Article from '../Article'
import PageMeta from '../PageMeta'
import indexArray from '../../helpers/indexArray'
import releases from '../../data/releases'

const RELEASES_INDEX = indexArray(releases)

export default React.memo(function ReleaseNotes(props) {
  const release = RELEASES_INDEX[props.id]

  return (
    <Article
      author='Kitty'
      title={release.title}
      action={{ to: '/releases', children: 'Back to releases' }}
      meta={'Official · ' + release.date}
      background={release.background}
      ratio={release.ratio}
      withAvif={typeof props.withAvif === 'undefined' ? true : props.withAvif}
    >
      {props.children}

      <PageMeta
        title={release.title}
        description={release.excerpt}
        image={release.background}
      />
    </Article>
  )
})
