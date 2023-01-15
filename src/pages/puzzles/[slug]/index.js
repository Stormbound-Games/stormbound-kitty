import PagePuzzle from '#components/PagePuzzle'
import getChanges from '#api/changes/getChanges'
import getPuzzle from '#api/puzzles/getPuzzle'
import getPuzzles from '#api/puzzles/getPuzzles'
import getSiteSettings from '#api/misc/getSiteSettings'
import indexArray from '#helpers/indexArray'
import serialization from '#helpers/serialization'
import parseDate from '#helpers/parseDate'
import groupBy from '#helpers/groupBy'

export async function getStaticPaths() {
  const puzzles = await getPuzzles()
  const paths = puzzles.map(puzzle => ({ params: { slug: puzzle.slug } }))

  return { paths, fallback: 'blocking' }
}

const getCardChanges = (changes, id) =>
  (changes[id] ?? []).map(({ from, timestamp }) => ({ from, timestamp }))

const getAllChangesAfterDate = async (date, isPreview) => {
  const allChanges = await getChanges({ isPreview })
  const afterDate = allChanges
    .filter(change => change.from && change.timestamp >= date)
    .sort((a, b) => b.timestamp - a.timestamp)

  return groupBy(afterDate, 'id')
}

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
  const changesById = await getAllChangesAfterDate(date, isPreview)

  // In order to render the versioned cards (from the time the puzzle was
  // issued), we need to resolve the version of every card in the hand and on
  // the board.

  sim.cards.forEach(card => {
    if (card.id) card.versions = getCardChanges(changesById, card.id)
  })

  sim.board.forEach(row => {
    row.forEach(cell => {
      if (cell.card?.id)
        cell.card.versions = getCardChanges(changesById, cell.card.id)
    })
  })

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
