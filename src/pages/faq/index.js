import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getFAQ from '~/api/faq/getFAQ'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const data = await getFAQ({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { cards, data, settings },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FAQPage = ({ settings, cards, ...props }) => (
  <Layout active={['HOME', 'HOME', 'FAQ']} settings={settings}>
    <FAQ {...props} />
  </Layout>
)

export default FAQPage
