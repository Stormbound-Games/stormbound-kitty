import React from 'react'
import { Redirect, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'
import useFetch from '../../hooks/useFetch'
import { STORY_CATEGORIES } from '../../constants/stories'

const StoryCategory = load('StoryCategory')
const Story = load('Story')

export default function RouterStories() {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { data: stories = [] } = useFetch('/stories.json')

  React.useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <Switch>
      {stories.map(story => (
        <Redirect
          key={story.oldId}
          path={`/stories/${story.oldId}`}
          to={`/stories/${story.id}`}
        />
      ))}

      {Object.keys(STORY_CATEGORIES).map(category => (
        <Page
          exact
          path={`${path}/${category}`}
          active={['STORIES']}
          key={category}
        >
          <StoryCategory category={category} />
        </Page>
      ))}

      <Page path={`${path}/:storyId`} active={['STORIES']}>
        <Story />
      </Page>

      <Redirect path={path} to='/stories/lore' />
    </Switch>
  )
}
