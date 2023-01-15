import PagePuzzle from '#components/PagePuzzle'
import getChangesFromCard from '#api/changes/getChangesFromCard'
import getPuzzle from '#api/puzzles/getPuzzle'
import getPuzzles from '#api/puzzles/getPuzzles'
import getSiteSettings from '#api/misc/getSiteSettings'
import indexArray from '#helpers/indexArray'
import serialization from '#helpers/serialization'
import parseDate from '#helpers/parseDate'

export async function getStaticPaths() {
  const puzzles = await getPuzzles()
  const paths = puzzles.map(puzzle => ({ params: { slug: puzzle.slug } }))

  return { paths, fallback: 'blocking' }
}

// Get the (preview) changes for the card and preserve only what’s necessary.
const getChanges = async (id, date, isPreview) =>
  (await getChangesFromCard({ id: id, isPreview }))
    .map(change => ({ from: change.from, timestamp: change.timestamp }))
    .filter(change => change.from && change.timestamp >= date)

export async function getStaticProps({ params, preview: isPreview = false }) {
  const { slug } = params
  const settings = await getSiteSettings({ isPreview })
  const puzzle = await getPuzzle({ slug, isPreview })
  const cardsIndex = indexArray(settings.cards)

  if (!puzzle) {
    return { notFound: true }
  }

  const sim = serialization.battle.deserialize(cardsIndex, puzzle.board)
  const date = parseDate(puzzle.date)

  // In order to render the versioned cards (from the time the puzzle was
  // issued), we need to resolve the version of every card in the hand and on
  // the board.

  await Promise.all(
    sim.cards.map(async card => {
      if (card.id) card.versions = await getChanges(card.id, date, isPreview)
    })
  )

  await Promise.all(
    sim.board.map(row => {
      Promise.all(
        row.map(async cell => {
          if (cell.card?.id)
            cell.card.versions = await getChanges(cell.card.id, date, isPreview)
        })
      )
    })
  )

  // Enforce grid markers for puzzles as it’s important to understand the
  // solution.
  sim.gridMarkers = true

  return {
    props: {
      settings,
      puzzle,
      sim,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'PUZZLES'],
    },
  }
}

export default PagePuzzle
