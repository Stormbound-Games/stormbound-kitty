import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const puzzles = await getPuzzles({ isPreview })

  return {
    props: {
      settings,
      puzzles,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'PUZZLES'],
    },
  }
}

export default BattleSimPuzzles
