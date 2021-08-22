import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'
import PUZZLES from '~/data/puzzles'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), puzzles: PUZZLES } }
}

const BattleSimPuzzlesPage = props => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'PUZZLES']}
    navigation={props.navigation}
  >
    <BattleSimPuzzles puzzles={props.puzzles} />
  </Layout>
)

export default BattleSimPuzzlesPage
