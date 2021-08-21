import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getFAQ from '~/helpers/getFAQ'

const DATA = getFAQ()

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FAQPage = props => (
  <Layout active={['HOME', 'HOME', 'FAQ']} navigation={props.navigation}>
    <FAQ data={DATA} />
  </Layout>
)

export default FAQPage
