import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const BattleSimDisplay = load('BattleSimDisplay')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BattleSimRoot = load('BattleSimRoot')

const RouterBattleSim = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/:simId/display`} active='BATTLE_SIM'>
        <BattleSimDisplay />
      </Page>
      <Page path={`${path}/puzzles`} active='BATTLE_SIM'>
        <BattleSimPuzzles />
      </Page>
      <Page path={`${path}/:simId`} active='BATTLE_SIM'>
        <BattleSimRoot />
      </Page>
      <Page path={path} active='BATTLE_SIM'>
        <BattleSimRoot />
      </Page>
    </Switch>
  )
}

export default RouterBattleSim
