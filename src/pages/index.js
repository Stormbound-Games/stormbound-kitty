import React from 'react'
import Home from '~/components/Home'
import Layout from '~/components/Layout'
import NEWS from '~/data/news'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { news: NEWS, navigation: getNavigation() } }
}

const Index = props => (
  <Layout active={['HOME', 'HOME', 'NEWS']} navigation={props.navigation}>
    <Home news={props.news} />
  </Layout>
)

export default Index
