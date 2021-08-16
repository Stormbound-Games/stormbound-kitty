import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import Layout from '~/components/Layout'
import PUZZLES from '~/data/puzzles'

export async function getStaticPaths() {
  const paths = PUZZLES.map(puzzle => ({ params: { id: puzzle.board } }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const puzzle = PUZZLES.find(puzzle => puzzle.board === context.params.id)

  return { props: { id: context.params.id, puzzle: puzzle || null } }
}

const BattleSim = props => (
  <Layout active={['TOOLS', 'BATTLE_SIM', 'DISPLAY']}>
    <BattleSimPage mode='DISPLAY' simId={props.id} puzzle={props.puzzle} />
  </Layout>
)

export default BattleSim
