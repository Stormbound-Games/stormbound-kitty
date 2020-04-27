import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import Error from '../Error'
import MemberContestVictories from '../MemberContestVictories'
import MemberDecks from '../MemberDecks'
import MemberGuides from '../MemberGuides'
import MemberStories from '../MemberStories'
import PageMeta from '../PageMeta'
import decks from '../../data/decks'
import guides from '../../data/guides'
import stories from '../../data/stories'

export default React.memo(function Member(props) {
  const match = useRouteMatch()
  const id = match.params.memberId.toLowerCase()
  const userDecks = React.useMemo(
    () => decks.filter(deck => deck.author.toLowerCase() === id),
    [id]
  )
  const userStories = React.useMemo(
    () => stories.filter(story => story.author.toLowerCase() === id),
    [id]
  )
  const userVictories = React.useMemo(
    () =>
      WEEKLY_CARD_CONTEST.filter(
        contest => contest.winner.author.toLowerCase() === id
      ),
    [id]
  )
  const userGuides = React.useMemo(
    () => guides.filter(guide => guide.author.toLowerCase() === id),
    [id]
  )

  if (
    userDecks.length === 0 &&
    userStories.length === 0 &&
    userVictories.length === 0 &&
    userGuides.length === 0
  ) {
    return <Error error={'User Not Found'} />
  }

  const displayName = (
    userDecks[0] ||
    userStories[0] ||
    userGuides[0] ||
    userVictories[0].winner
  ).author

  return (
    <>
      <MemberStories stories={userStories} displayName={displayName} />
      {userStories.length ? <hr /> : null}
      <MemberContestVictories
        victories={userVictories}
        displayName={displayName}
      />
      {userVictories.length ? <hr /> : null}

      <MemberGuides guides={userGuides} displayName={displayName} />
      {userGuides.length ? <hr /> : null}

      <MemberDecks decks={userDecks} displayName={displayName} />

      <PageMeta title={displayName} />
    </>
  )
})
