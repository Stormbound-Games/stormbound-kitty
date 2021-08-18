import React from 'react'
import Home from '~/components/Home'
import Layout from '~/components/Layout'
import NEWS from '~/data/news'

export async function getStaticProps() {
  return { props: { news: NEWS } }
}

const Index = props => (
  <Layout active={['HOME', 'NEWS']}>
    <Home news={props.news} />
  </Layout>
)

export default Index
