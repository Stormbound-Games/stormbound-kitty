import React from 'react'
import Home from '~/components/Home'
import Layout from '~/components/Layout'
import getNews from '~/api/news/getNews'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const news = await getNews({ isPreview })

  return { props: { cards, news, navigation } }
}

const Index = ({ navigation, cards, ...props }) => (
  <Layout active={['HOME', 'HOME', 'NEWS']} navigation={navigation}>
    <Home {...props} />
  </Layout>
)

export default Index
