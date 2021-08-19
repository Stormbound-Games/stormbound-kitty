import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'
import PUZZLES from '~/data/puzzles'

export async function getStaticProps() {
  return { props: { puzzles: PUZZLES } }
}

const BattleSimPuzzlesPage = props => (
  <Layout active={['COMMUNITY', 'PUZZLES']}>
    <BattleSimPuzzles puzzles={props.puzzles} />
  </Layout>
)

export default BattleSimPuzzlesPage
