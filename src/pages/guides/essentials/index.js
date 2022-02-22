import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'
import { CATEGORIES } from '~/constants/guides'
import getGuidesFromCategory from '~/api/guides/getGuidesFromCategory'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const category = 'ESSENTIALS'
  const guides = await getGuidesFromCategory({ category, isPreview })

  return {
    props: {
      navigation: getNavigation(),
      guides,
      category: { ...CATEGORIES[category], id: category },
    },
  }
}

const GuidesPage = ({ navigation, ...props }) => (
  <Layout active={['GUIDES', props.category.id]} navigation={navigation}>
    <Guides {...props} />
  </Layout>
)

export default GuidesPage
