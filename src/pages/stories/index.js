import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const StoriesPage = ({ navigation, cards, ...props }) => (
  <Layout active={['STORIES']} navigation={navigation}>
    <StoryIndex {...props} />
  </Layout>
)

export default StoriesPage
