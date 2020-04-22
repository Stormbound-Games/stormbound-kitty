import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Error from '../Error'
import Layout from '../Layout'
import RouterBattleSim from '../RouterBattleSim'
import RouterCardBuilder from '../RouterCardBuilder'
import RouterCollection from '../RouterCollection'
import RouterDeckBuilder from '../RouterDeckBuilder'
import RouterGuides from '../RouterGuides'
import RouterListBuilder from '../RouterListBuilder'
import RouterQuestBuilder from '../RouterQuestBuilder'
import RouterStories from '../RouterStories'
import load from '../../helpers/load'

const FAQ = load('FAQ')
const Brawl = load('Brawl')
const Home = load('Home')
const Member = load('Member')

const NotFound = ({ setActive }) => {
  React.useEffect(() => setActive(null), [setActive])

  return <Error error='HTTP 404 — Not Found' />
}

const Router = props => {
  const [active, setActive] = React.useState(null)

  return (
    <BrowserRouter>
      <Layout active={active}>
        <Switch>
          <Route path='/sim'>
            <RouterBattleSim setActive={setActive} />
          </Route>

          <Route path='/card'>
            <RouterCardBuilder setActive={setActive} />
          </Route>

          <Route path='/deck'>
            <RouterDeckBuilder setActive={setActive} />
          </Route>

          <Route path='/collection'>
            <RouterCollection setActive={setActive} />
          </Route>

          <Route path='/quest'>
            <RouterQuestBuilder setActive={setActive} />
          </Route>

          <Route path='/stories'>
            <RouterStories setActive={setActive} />
          </Route>

          <Route path='/guides'>
            <RouterGuides setActive={setActive} />
          </Route>

          <Route path='/list'>
            <RouterListBuilder setActive={setActive} />
          </Route>

          <Route path='/member/:memberId'>
            <Member setActive={setActive} />
          </Route>

          <Route path='/brawl'>
            <Brawl setActive={setActive} />
          </Route>

          <Route path='/faq'>
            <FAQ setActive={setActive} />
          </Route>

          <Route exact path='/'>
            <Home setActive={setActive} />
          </Route>

          <Route path='*'>
            <NotFound setActive={setActive} />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
