import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'
import { CATEGORIES } from '~/constants/guides'
import GUIDES from '~/data/guides'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const category = 'ESSENTIALS'
  const guides = GUIDES.filter(guide => guide.category === category)

  return {
    props: {
      navigation: getNavigation(),
      guides,
      category: { ...CATEGORIES[category], id: category },
    },
  }
}

const GuidesPage = props => (
  <Layout active={['GUIDES', props.category.id]} navigation={props.navigation}>
    <Guides category={props.category} guides={props.guides} />
  </Layout>
)

export default GuidesPage
