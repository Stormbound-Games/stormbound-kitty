import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const BattleSimDisplay = loadable(() => import('../BattleSimDisplay'), options)
const BattleSimPuzzles = loadable(() => import('../BattleSimPuzzles'), options)
const BattleSimRoot = loadable(() => import('../BattleSimRoot'), options)

const RouterBattleSim = props => {
  const { path } = useRouteMatch()
  const active = 'BATTLE_SIM'

  return (
    <Switch>
      <Page path={`${path}/:simId/display`} active={active}>
        <BattleSimDisplay />
      </Page>
      <Page path={`${path}/puzzles`} active={active}>
        <BattleSimPuzzles />
      </Page>
      <Page path={`${path}/:simId`} active={active}>
        <BattleSimRoot />
      </Page>
      <Page path={path} active={active}>
        <BattleSimRoot />
      </Page>
    </Switch>
  )
}

export default RouterBattleSim
