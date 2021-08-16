import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import Layout from '~/components/Layout'

const BattleSim = () => (
  <Layout active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
    <BattleSimPage mode='EDITOR' />
  </Layout>
)

export default BattleSim
