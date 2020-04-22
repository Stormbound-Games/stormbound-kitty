import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import load from '../../helpers/load'

const StoriesCategory = load('StoriesCategory')
const Story = load('Story')
const Stories = load('Stories')

const RouterStories = ({ setActive }) => {
  const { path } = useRouteMatch()

  React.useEffect(() => setActive('STORIES'), [setActive])

  return (
    <Switch>
      <Route path={`${path}/neutral`}>
        <StoriesCategory category='neutral' />
      </Route>
      <Route path={`${path}/ironclad`}>
        <StoriesCategory category='ironclad' />
      </Route>
      <Route path={`${path}/swarm`}>
        <StoriesCategory category='swarm' />
      </Route>
      <Route path={`${path}/winter`}>
        <StoriesCategory category='winter' />
      </Route>
      <Route path={`${path}/shadowfen`}>
        <StoriesCategory category='shadowfen' />
      </Route>
      <Route path={`${path}/lore`}>
        <StoriesCategory category='lore' />
      </Route>
      <Route path={`${path}/:storyId`}>
        <Story />
      </Route>
      <Route path={path}>
        <Stories />
      </Route>
    </Switch>
  )
}

export default RouterStories
