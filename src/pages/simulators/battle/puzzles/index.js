import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const puzzles = await getPuzzles({ isPreview })

  return { props: { settings, puzzles } }
}

const BattleSimPuzzlesPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'CONTESTS', 'PUZZLES']} settings={settings}>
    <BattleSimPuzzles {...props} />
  </Layout>
)

export default BattleSimPuzzlesPage
