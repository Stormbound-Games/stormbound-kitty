import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), puzzles: await getPuzzles() } }
}

const BattleSimPuzzlesPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'PUZZLES']} navigation={navigation}>
    <BattleSimPuzzles {...props} />
  </Layout>
)

export default BattleSimPuzzlesPage
