import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const BattleSimApp = load('BattleSimApp')
const BattleSimPuzzles = load('BattleSimPuzzles')

export default function RouterBattleSim() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/:simId/display`} active={['BATTLE_SIM', 'DISPLAY']}>
        <BattleSimApp mode='DISPLAY' withMeta />
      </Page>
      <Page path={`${path}/puzzles`} active={['BATTLE_SIM', 'PUZZLES']}>
        <BattleSimPuzzles />
      </Page>
      <Page path={`${path}/:simId`} active={['BATTLE_SIM', 'EDITOR']}>
        <BattleSimApp mode='EDITOR' withMeta />
      </Page>
      <Page path={path} active={['BATTLE_SIM', 'EDITOR']}>
        <BattleSimApp mode='EDITOR' withMeta />
      </Page>
    </Switch>
  )
}
