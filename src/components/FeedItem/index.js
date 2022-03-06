import React from 'react'
import dynamic from 'next/dynamic'

const COMPONENTS = {
  artwork: dynamic(() => import('~/components/FeedArtEntry')),
  swcc: dynamic(() => import('~/components/FeedCardEntry')),
  contribution: dynamic(() => import('~/components/FeedContributionEntry')),
  deck: dynamic(() => import('~/components/FeedDeckEntry')),
  donation: dynamic(() => import('~/components/FeedDonationEntry')),
  guide: dynamic(() => import('~/components/FeedGuideEntry')),
  tournament: dynamic(() => import('~/components/FeedHostEntry')),
  playerId: dynamic(() => import('~/components/FeedPlayerIdEntry')),
  podcast: dynamic(() => import('~/components/FeedPodcastEntry')),
  podium: dynamic(() => import('~/components/FeedPodiumEntry')),
  puzzle: dynamic(() => import('~/components/FeedPuzzleEntry')),
  release: dynamic(() => import('~/components/FeedReleaseEntry')),
  story: dynamic(() => import('~/components/FeedStoryEntry')),
  event: dynamic(() => import('~/components/FeedSWCCEntry')),
  channel: dynamic(() => import('~/components/FeedYouTubeEntry')),
}

export default React.memo(function MemberFeedItem({ _type: type, ...props }) {
  const Component = COMPONENTS[type]

  return Component ? <Component {...props} /> : null
})
