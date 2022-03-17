import React from 'react'
import dynamic from 'next/dynamic'

const COMPONENTS = {
  artwork: dynamic(() => import('~/components/CardFeedArtEntry')),
  guide: dynamic(() => import('~/components/CardFeedGuideEntry')),
  story: dynamic(() => import('~/components/CardFeedStoryEntry')),
}

export default React.memo(function CardFeedItem({ _type: type, ...props }) {
  const Component = COMPONENTS[type]

  return Component ? <Component {...props} /> : null
})
