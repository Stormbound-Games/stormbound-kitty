import React from 'react'
import BattleSimPuzzles from '~/components/BattleSimPuzzles'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'PUZZLES']}>
    <BattleSimPuzzles />
  </Layout>
)
