import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const FanKitBooksPage = ({ navigation, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitBooks {...props} />
  </Layout>
)

export default FanKitBooksPage
