import PagePuzzle from '~/components/PagePuzzle'
import getPuzzle from '~/api/puzzles/getPuzzle'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import serialization from '~/helpers/serialization'

export async function getStaticPaths() {
  const puzzles = await getPuzzles()
  const paths = puzzles.map(puzzle => ({ params: { slug: puzzle.slug } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const { slug } = params
  const settings = await getSiteSettings({ isPreview })
  const puzzle = await getPuzzle({ slug, isPreview })
  const cardsIndex = indexArray(settings.cards)

  if (!puzzle) {
    return { notFound: true }
  }

  return {
    props: {
      settings,
      puzzle,
      sim: serialization.battle.deserialize(cardsIndex, puzzle.board),
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'PUZZLES'],
    },
  }
}

export default PagePuzzle
