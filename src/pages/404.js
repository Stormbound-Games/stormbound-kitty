import React from 'react'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { navigation, cards } }
}

export default function Custom404({ navigation, cards, ...props }) {
  return (
    <Layout active={[]} navigation={navigation} cards={cards}>
      <Error {...props} error='404 — Page Not Found' />
    </Layout>
  )
}
