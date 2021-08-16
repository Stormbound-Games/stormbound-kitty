import React from 'react'
import path from 'path'
import fs from 'fs/promises'
import Story from '~/components/Story'
import Layout from '~/components/Layout'

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'src', 'data', 'stories')
  const slugs = await fs.readdir(dir)
  const paths = slugs.map(slug => ({
    params: { slug: slug.replace('.json', '') },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const story = require('~/data/stories/' + context.params.slug)

  return { props: { story } }
}

const StoryPage = props => (
  <Layout active={['STORIES', 'STORY']}>
    <Story story={props.story} />
  </Layout>
)

export default StoryPage
