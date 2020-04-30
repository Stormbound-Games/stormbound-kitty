import React from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const StoriesCategory = load('StoriesCategory')
const Story = load('Story')

export default function RouterStories() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/neutral`} active={['STORIES', 'NEUTRAL']}>
        <StoriesCategory category='neutral' />
      </Page>
      <Page path={`${path}/ironclad`} active={['STORIES', 'IRONCLAD']}>
        <StoriesCategory category='ironclad' />
      </Page>
      <Page path={`${path}/swarm`} active={['STORIES', 'SWARM']}>
        <StoriesCategory category='swarm' />
      </Page>
      <Page path={`${path}/winter`} active={['STORIES', 'WINTER']}>
        <StoriesCategory category='winter' />
      </Page>
      <Page path={`${path}/shadowfen`} active={['STORIES', 'SHADOWFEN']}>
        <StoriesCategory category='shadowfen' />
      </Page>
      <Page path={`${path}/lore`} active={['STORIES', 'LORE']}>
        <StoriesCategory category='lore' />
      </Page>
      <Page path={`${path}/:storyId`} active={['STORIES']}>
        <Story />
      </Page>
      <Redirect path={path} to='stories/lore' />
    </Switch>
  )
}
