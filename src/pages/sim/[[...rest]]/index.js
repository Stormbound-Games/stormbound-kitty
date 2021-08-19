import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import BattleSimState from '~/components/BattleSimState'
import Layout from '~/components/Layout'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import useNavigator from '~/hooks/useNavigator'
import PUZZLES from '~/data/puzzles'

export async function getStaticPaths() {
  const paths = PUZZLES.map(puzzle => ({
    params: { rest: [puzzle.board, 'display'] },
  })).concat([{ params: { rest: [] } }])

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
      return {
        props: {
          simId: null,
          sim: getInitialBattleData(),
          mode: 'EDITOR',
          puzzle: null,
        },
      }
    }

    return {
      props: {
        simId: id,
        sim: getInitialBattleData(id),
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
        puzzle: PUZZLES.find(puzzle => puzzle.board === id) || null,
      },
    }
  } catch (error) {
    return { props: { simId: null, sim: {}, mode: 'EDITOR', puzzle: null } }
  }
}

const BattleSim = props => {
  const navigator = useNavigator()

  return (
    <Layout active={['TOOLS', 'BATTLE_SIM', props.mode]}>
      <BattleSimState {...props} navigator={navigator}>
        {state => <BattleSimPage {...state} {...props} />}
      </BattleSimState>
    </Layout>
  )
}

export default BattleSim
