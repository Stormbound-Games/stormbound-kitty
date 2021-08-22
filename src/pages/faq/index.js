import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getFAQ from '~/helpers/getFAQ'

const DATA = getFAQ()

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FAQPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'FAQ']} navigation={navigation}>
    <FAQ data={DATA} {...props} />
  </Layout>
)

export default FAQPage
