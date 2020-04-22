import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import load from '../../helpers/load'

const BattleSimDisplay = load('BattleSimDisplay')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BattleSimRoot = load('BattleSimRoot')

const RouterBattleSim = ({ setActive }) => {
  const { path } = useRouteMatch()

  React.useEffect(() => setActive('BATTLE_SIM'), [setActive])

  return (
    <Switch>
      <Route path={`${path}/:simId/display`}>
        <BattleSimDisplay />
      </Route>
      <Route path={`${path}/puzzles`}>
        <BattleSimPuzzles />
      </Route>
      <Route path={`${path}/:simId`}>
        <BattleSimRoot />
      </Route>
      <Route path={path}>
        <BattleSimRoot />
      </Route>
    </Switch>
  )
}

export default RouterBattleSim
