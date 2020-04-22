import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import load from '../../helpers/load'

const BattleSimDisplay = load('BattleSimDisplay')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BattleSimRoot = load('BattleSimRoot')

const RouterBattleSim = props => {
  const { path } = useRouteMatch()

  return (
    <Layout active='BATTLE_SIM'>
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
    </Layout>
  )
}

export default RouterBattleSim
