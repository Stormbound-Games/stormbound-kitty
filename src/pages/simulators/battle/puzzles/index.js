import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const puzzles = await getPuzzles({ isPreview })

  return { props: { cards, navigation, puzzles } }
}

const BattleSimPuzzlesPage = ({ navigation, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'PUZZLES']} navigation={navigation}>
    <BattleSimPuzzles {...props} />
  </Layout>
)

export default BattleSimPuzzlesPage
