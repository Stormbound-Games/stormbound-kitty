import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import Layout from '~/components/Layout'
import PUZZLES from '~/data/puzzles'

export async function getStaticPaths() {
  const paths = PUZZLES.map(puzzle => ({ params: { rest: [puzzle.board] } }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const params = context.params.rest || []

  try {
    const [id, display] = params

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return { props: { simId: null, mode: 'EDITOR' } }
    }

    return {
      props: {
        simId: id,
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
        puzzle: PUZZLES.find(puzzle => puzzle.board === id) || null,
      },
    }
  } catch (error) {
    return { props: { simId: null, mode: 'EDITOR' } }
  }
}

const BattleSim = props => (
  <Layout active={['TOOLS', 'BATTLE_SIM', props.mode]}>
    <BattleSimPage {...props} />
  </Layout>
)

export default BattleSim
