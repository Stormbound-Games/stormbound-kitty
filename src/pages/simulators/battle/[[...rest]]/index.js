import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import BattleSimState from '~/components/BattleSimState'
import Layout from '~/components/Layout'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getPuzzle from '~/api/puzzles/getPuzzle'
import useNavigator from '~/hooks/useNavigator'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

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
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(cards)
  const [id, display] = params.rest || []

  if (display && display !== 'display') {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        cards,
        cardsIndex,
        settings,
        simId: null,
        sim: getInitialBattleData(cardsIndex),
        mode: 'EDITOR',
        puzzle: null,
      },
    }
  }

  return {
    props: {
      cards,
      cardsIndex,
      settings,
      simId: id,
      sim: getInitialBattleData(cardsIndex, id),
      mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      puzzle: await getPuzzle({ id, isPreview }),
    },
  }
}

const BattleSim = ({ settings, cards, ...props }) => {
  const navigator = useNavigator()

  return (
    <Layout active={['TOOLS', 'SIMULATORS', 'BATTLE_SIM']} settings={settings}>
      <BattleSimState {...props} navigator={navigator}>
        {state => <BattleSimPage {...state} {...props} />}
      </BattleSimState>
    </Layout>
  )
}

export default BattleSim
