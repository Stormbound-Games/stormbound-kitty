import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'
import { CATEGORIES } from '~/constants/guides'
import getGuidesFromCategory from '~/api/guides/getGuidesFromCategory'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'ESSENTIALS'
  const cards = await getCards({ isPreview })
  const category = { ...CATEGORIES[name], id: name }
  const guides = await getGuidesFromCategory({ category: name, isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { cards, category, guides, settings },
  }
}

const GuidesPage = ({ settings, cards, ...props }) => (
  <Layout active={['GUIDES', props.category.id]} settings={settings}>
    <Guides {...props} />
  </Layout>
)

export default GuidesPage
