import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import Error from '../Error'
import HeaderBanner from '../HeaderBanner'
import MemberContestVictories from '../MemberContestVictories'
import MemberDecks from '../MemberDecks'
import MemberPuzzles from '../MemberPuzzles'
import MemberGuides from '../MemberGuides'
import MemberStories from '../MemberStories'
import PageMeta from '../PageMeta'
import decks from '../../data/decks'
import guides from '../../data/guides'
import puzzles from '../../data/puzzles'
import useFetch from '../../hooks/useFetch'

const getDisplayName = ({ decks, stories, victories, guides, puzzles, id }) => {
  if (decks.length > 0) return decks[0].author
  if (stories.length > 0) return stories[0].author
  if (puzzles.length > 0) return puzzles[0].author
  if (victories.length > 0) return victories[0].winner.author
  if (guides.length > 0)
    return guides[0].authors.find(author => author.toLowerCase() === id)
}

export default React.memo(function Member(props) {
  const match = useRouteMatch()
  const { data: stories = [] } = useFetch('/stories.json')
  const id = match.params.memberId.toLowerCase()
  const userDecks = React.useMemo(
    () => decks.filter(deck => deck.author.toLowerCase() === id),
    [id]
  )
  const userStories = React.useMemo(
    () => stories.filter(story => story.author.toLowerCase() === id),
    [id, stories]
  )
  const userPuzzles = React.useMemo(
    () => puzzles.filter(puzzle => puzzle.author.toLowerCase() === id),
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
    () =>
      guides.filter(guide =>
        guide.authors.find(author => author.toLowerCase() === id)
      ),
    [id]
  )

  const displayName = getDisplayName({
    id,
    decks: userDecks,
    stories: userStories,
    victories: userVictories,
    guides: userGuides,
    puzzles: userPuzzles,
  })

  if (!displayName) {
    return <Error error={'User Not Found'} />
  }

  return (
    <>
      <HeaderBanner title={displayName} />
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
      {userDecks.length ? <hr /> : null}

      <MemberPuzzles puzzles={userPuzzles} displayName={displayName} />

      <PageMeta
        title={displayName}
        description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      />
    </>
  )
})
