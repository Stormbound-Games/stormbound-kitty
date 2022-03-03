import React from 'react'
import Home from '~/components/Home'
import Layout from '~/components/Layout'
import getNews from '~/api/news/getNews'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const news = await getNews({ isPreview })

  return { props: { news, settings } }
}

const Index = ({ settings, cards, ...props }) => (
  <Layout active={['HOME', 'HOME', 'NEWS']} settings={settings}>
    <Home {...props} />
  </Layout>
)

export default Index
