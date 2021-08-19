import React from 'react'
import path from 'path'
import fs from 'fs/promises'
import Story from '~/components/Story'
import Layout from '~/components/Layout'

const getStories = async () => {
  const dir = path.join(process.cwd(), 'src', 'data', 'stories')
  const slugs = await fs.readdir(dir)

  return slugs.map(slug => ({
    ...require('~/data/stories/' + slug),
    slug: slug.replace('.json', ''),
  }))
}

export async function getStaticPaths() {
  const stories = await getStories()
  const paths = stories.map(story => ({ params: { slug: story.slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const stories = await getStories()
  const currentStory = stories.find(story => story.slug === slug)
  const moreStories = stories.filter(story => {
    if (story.title === currentStory.title) return false
    if (currentStory.saga) return story.saga === currentStory.saga
    return story.author === currentStory.author
  })

  if (currentStory.saga) {
    moreStories.sort((a, b) => {
      const indexA = parseInt(a.title, 10)
      const indexB = parseInt(b.title, 10)

      return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
    })
  }

  return {
    props: { story: currentStory, moreStories: moreStories.slice(0, 3) },
  }
}

const StoryPage = props => (
  <Layout active={['STORIES', 'STORY']}>
    <Story story={props.story} moreStories={props.moreStories} />
  </Layout>
)

export default StoryPage
