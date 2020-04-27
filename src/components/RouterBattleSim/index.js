import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const BattleSimDisplay = load('BattleSimDisplay')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BattleSimRoot = load('BattleSimRoot')

export default function RouterBattleSim() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/:simId/display`} active={['BATTLE_SIM', 'DISPLAY']}>
        <BattleSimDisplay />
      </Page>
      <Page path={`${path}/puzzles`} active={['BATTLE_SIM', 'PUZZLES']}>
        <BattleSimPuzzles />
      </Page>
      <Page path={`${path}/:simId`} active={['BATTLE_SIM', 'EDITOR']}>
        <BattleSimRoot />
      </Page>
      <Page path={path} active={['BATTLE_SIM', 'EDITOR']}>
        <BattleSimRoot />
      </Page>
    </Switch>
  )
}
