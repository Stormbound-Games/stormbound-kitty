import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import BattleSimState from '~/components/BattleSimState'
import Layout from '~/components/Layout'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import getNavigation from '~/helpers/getNavigation'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getPuzzle from '~/api/puzzles/getPuzzle'
import useNavigator from '~/hooks/useNavigator'

export async function getStaticPaths({ preview: isPreview = false }) {
  const puzzles = await getPuzzles({ isPreview })
  const paths = puzzles
    .map(puzzle => ({
      params: { rest: [puzzle.board, 'display'] },
    }))
    .concat([{ params: { rest: [] } }])

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const navigation = getNavigation()
  const isPreview = context.preview || false
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
        puzzle: await getPuzzle({ id, isPreview }),
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
