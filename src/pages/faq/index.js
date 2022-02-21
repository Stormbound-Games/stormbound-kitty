import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getFAQ from '~/api/faq/getFAQ'

export async function getStaticProps() {
  return {
    props: {
      navigation: getNavigation(),
      data: await getFAQ(),
    },
  }
}

const FAQPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'FAQ']} navigation={navigation}>
    <FAQ {...props} />
  </Layout>
)

export default FAQPage
