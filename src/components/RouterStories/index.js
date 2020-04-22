import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import load from '../../helpers/load'

const StoriesCategory = load('StoriesCategory')
const Story = load('Story')
const Stories = load('Stories')

const RouterStories = props => {
  const { path } = useRouteMatch()

  return (
    <Layout active='STORIES'>
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
    </Layout>
  )
}

export default RouterStories
