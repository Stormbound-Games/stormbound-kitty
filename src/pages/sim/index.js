import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
    <BattleSimPage mode='EDITOR' />
  </Layout>
)
