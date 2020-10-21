import React from 'react'
import Article from '../Article'
import PageMeta from '../PageMeta'
import releases from '../../data/releases'

export default React.memo(function ReleaseNotes(props) {
  const release = releases.find(release => release.id === props.id)

  return (
    <Article
      author='Kitty'
      title={release.title}
      action={{ to: '/releases', children: 'Back to release notes' }}
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
