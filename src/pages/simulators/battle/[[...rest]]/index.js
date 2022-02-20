import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import BattleSimState from '~/components/BattleSimState'
import Layout from '~/components/Layout'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import getNavigation from '~/helpers/getNavigation'
import useNavigator from '~/hooks/useNavigator'
import PUZZLES from '~/data/puzzles'

export async function getStaticPaths() {
  const paths = PUZZLES.map(puzzle => ({
    params: { rest: [puzzle.board, 'display'] },
  })).concat([{ params: { rest: [] } }])

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const navigation = getNavigation()
  const params = context.params.rest || []
  const DEFAULT_PROPS = {
    navigation,
    simId: null,
    sim: getInitialBattleData(),
    mode: 'EDITOR',
    puzzle: null,
  }

  try {
    const [id, display] = params

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return {
        props: DEFAULT_PROPS,
      }
    }

    return {
      props: {
        navigation,
        simId: id,
        sim: getInitialBattleData(id),
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
        puzzle: PUZZLES.find(puzzle => puzzle.board === id) || null,
      },
    }
  } catch (error) {
    return {
      props: DEFAULT_PROPS,
    }
  }
}

const BattleSim = ({ navigation, ...props }) => {
  const navigator = useNavigator()

  return (
    <Layout
      active={['TOOLS', 'SIMULATORS', 'BATTLE_SIM']}
      navigation={navigation}
    >
      <BattleSimState {...props} navigator={navigator}>
        {state => <BattleSimPage {...state} {...props} />}
      </BattleSimState>
    </Layout>
  )
}

export default BattleSim
