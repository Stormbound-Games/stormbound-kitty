import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const StoriesCategory = load('StoriesCategory')
const Story = load('Story')
const Stories = load('Stories')

const RouterStories = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/neutral`} active='STORIES'>
        <StoriesCategory category='neutral' />
      </Page>
      <Page path={`${path}/ironclad`} active='STORIES'>
        <StoriesCategory category='ironclad' />
      </Page>
      <Page path={`${path}/swarm`} active='STORIES'>
        <StoriesCategory category='swarm' />
      </Page>
      <Page path={`${path}/winter`} active='STORIES'>
        <StoriesCategory category='winter' />
      </Page>
      <Page path={`${path}/shadowfen`} active='STORIES'>
        <StoriesCategory category='shadowfen' />
      </Page>
      <Page path={`${path}/lore`} active='STORIES'>
        <StoriesCategory category='lore' />
      </Page>
      <Page path={`${path}/:storyId`} active='STORIES'>
        <Story />
      </Page>
      <Page path={path} active='STORIES'>
        <Stories />
      </Page>
    </Switch>
  )
}

export default RouterStories
