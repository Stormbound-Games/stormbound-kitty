import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import Layout from '~/components/Layout'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getPuzzle from '~/api/puzzles/getPuzzle'
import indexArray from '~/helpers/indexArray'
import { DEFAULT_SIM } from '~/constants/battle'

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
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(settings.cards)
  const [id, display] = params.rest || []

  if (display && display !== 'display') {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        settings,
        simId: null,
        sim: DEFAULT_SIM,
        mode: 'EDITOR',
        puzzle: null,
      },
    }
  }

  return {
    props: {
      settings,
      id: decodeURIComponent(id),
      sim: serialization.battle.deserialize(cardsIndex, decodeURIComponent(id)),
      mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      puzzle: await getPuzzle({ id, isPreview }),
    },
  }
}

const BattleSim = ({ settings, ...props }) => (
  <Layout active={['TOOLS', 'SIMULATORS', 'BATTLE_SIM']} settings={settings}>
    <BattleSimPage {...props} />
  </Layout>
)

export default BattleSim
