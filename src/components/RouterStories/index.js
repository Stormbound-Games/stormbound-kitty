import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const StoriesCategory = loadable(() => import('../StoriesCategory'), options)
const Story = loadable(() => import('../Story'), options)
const Stories = loadable(() => import('../Stories'), options)

const RouterStories = props => {
  const { path } = useRouteMatch()
  const active = 'STORIES'

  return (
    <Switch>
      <Page path={`${path}/neutral`} active={active}>
        <StoriesCategory category='neutral' />
      </Page>
      <Page path={`${path}/ironclad`} active={active}>
        <StoriesCategory category='ironclad' />
      </Page>
      <Page path={`${path}/swarm`} active={active}>
        <StoriesCategory category='swarm' />
      </Page>
      <Page path={`${path}/winter`} active={active}>
        <StoriesCategory category='winter' />
      </Page>
      <Page path={`${path}/shadowfen`} active={active}>
        <StoriesCategory category='shadowfen' />
      </Page>
      <Page path={`${path}/lore`} active={active}>
        <StoriesCategory category='lore' />
      </Page>
      <Page path={`${path}/:storyId`} active={active}>
        <Story />
      </Page>
      <Page path={path} active={active}>
        <Stories />
      </Page>
    </Switch>
  )
}

export default RouterStories
