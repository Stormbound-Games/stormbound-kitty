import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getFAQ from '~/api/faq/getFAQ'

export async function getStaticProps({ preview: isPreview = false }) {
  const data = await getFAQ({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { data, settings },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FAQPage = ({ settings, ...props }) => (
  <Layout active={['HOME', 'HOME', 'FAQ']} settings={settings}>
    <FAQ {...props} />
  </Layout>
)

export default FAQPage
