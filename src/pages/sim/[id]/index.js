import React from 'react'
import BattleSimPage from '~/components/BattleSimPage'
import Layout from '~/components/Layout'

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps(context) {
  return { props: { id: context.params.id } }
}

const BattleSim = props => (
  <Layout active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
    <BattleSimPage mode='EDITOR' simId={props.id} />
  </Layout>
)

export default BattleSim
