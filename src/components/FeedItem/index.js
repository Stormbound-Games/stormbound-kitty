import React from 'react'
import dynamic from 'next/dynamic'

const COMPONENTS = {
  ART: dynamic(() => import('~/components/FeedArtEntry')),
  CARD: dynamic(() => import('~/components/FeedCardEntry')),
  CONTRIBUTION: dynamic(() => import('~/components/FeedContributionEntry')),
  DECK: dynamic(() => import('~/components/FeedDeckEntry')),
  DONATION: dynamic(() => import('~/components/FeedDonationEntry')),
  GUIDE: dynamic(() => import('~/components/FeedGuideEntry')),
  HOST: dynamic(() => import('~/components/FeedHostEntry')),
  PODCAST: dynamic(() => import('~/components/FeedPodcastEntry')),
  PODIUM: dynamic(() => import('~/components/FeedPodiumEntry')),
  PUZZLE: dynamic(() => import('~/components/FeedPuzzleEntry')),
  RELEASE: dynamic(() => import('~/components/FeedReleaseEntry')),
  STORY: dynamic(() => import('~/components/FeedStoryEntry')),
  SWCC: dynamic(() => import('~/components/FeedSWCCEntry')),
  YOUTUBE: dynamic(() => import('~/components/FeedYouTubeEntry')),
}

export default React.memo(function MemberFeedItem(props) {
  const Component = COMPONENTS[props.type]

  return Component ? <Component {...props} /> : null
})
