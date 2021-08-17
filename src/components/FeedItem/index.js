import React from 'react'
import load from '~/helpers/load'

const COMPONENTS = {
  ART: load('FeedArtEntry'),
  CARD: load('FeedCardEntry'),
  CONTRIBUTION: load('FeedContributionEntry'),
  DECK: load('FeedDeckEntry'),
  DONATION: load('FeedDonationEntry'),
  GUIDE: load('FeedGuideEntry'),
  HOST: load('FeedHostEntry'),
  PODCAST: load('FeedPodcastEntry'),
  PODIUM: load('FeedPodiumEntry'),
  PUZZLE: load('FeedPuzzleEntry'),
  RELEASE: load('FeedReleaseEntry'),
  STORY: load('FeedStoryEntry'),
  SWCC: load('FeedSWCCEntry'),
  YOUTUBE: load('FeedYouTubeEntry'),
}

export default React.memo(function MemberFeedItem(props) {
  const Component = COMPONENTS[props.type]

  return Component ? <Component {...props} /> : null
})
