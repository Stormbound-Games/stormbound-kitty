import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const StoriesPage = ({ navigation, cards, ...props }) => (
  <Layout active={['STORIES']} navigation={navigation} cards={cards}>
    <StoryIndex {...props} />
  </Layout>
)

export default StoriesPage
