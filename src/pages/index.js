import React from 'react'
import Home from '~/components/Home'
import Layout from '~/components/Layout'
import getNews from '~/api/news/getNews'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      news: await getNews({ isPreview }),
      navigation: await getNavigation({ isPreview }),
    },
  }
}

const Index = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'NEWS']} navigation={navigation}>
    <Home {...props} />
  </Layout>
)

export default Index
