import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import BattleSimState from '~/components/BattleSimState'
import Layout from '~/components/Layout'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import getNavigation from '~/helpers/getNavigation'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getPuzzle from '~/api/puzzles/getPuzzle'
import useNavigator from '~/hooks/useNavigator'
import CARDS from '~/data/cards'

export async function getStaticPaths({ preview: isPreview = false }) {
  const puzzles = await getPuzzles({ isPreview })
  const paths = puzzles
    .map(puzzle => ({
      params: { rest: [puzzle.board, 'display'] },
    }))
    .concat([{ params: { rest: [] } }])

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })
  const DEFAULT_PROPS = {
    cards: CARDS,
    navigation,
    simId: null,
    sim: getInitialBattleData(),
    mode: 'EDITOR',
    puzzle: null,
  }

  try {
    const [id, display] = params.rest || []

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
        cards: CARDS,
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

const BattleSim = ({ navigation, cards, ...props }) => {
  const navigator = useNavigator()

  return (
    <Layout
      active={['TOOLS', 'SIMULATORS', 'BATTLE_SIM']}
      navigation={navigation}
      cards={cards}
    >
      <BattleSimState {...props} navigator={navigator}>
        {state => <BattleSimPage {...state} {...props} />}
      </BattleSimState>
    </Layout>
  )
}

export default BattleSim
