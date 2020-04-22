import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const StoriesCategory = load('StoriesCategory')
const Story = load('Story')
const Stories = load('Stories')

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
