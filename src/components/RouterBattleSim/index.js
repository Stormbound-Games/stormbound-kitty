import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const BattleSimDisplay = load('BattleSimDisplay')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BattleSimRoot = load('BattleSimRoot')

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
