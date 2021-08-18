import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'

const BattleSimPuzzlesPage = () => (
  <Layout active={['COMMUNITY', 'PUZZLES']}>
    <BattleSimPuzzles />
  </Layout>
)

export default BattleSimPuzzlesPage
