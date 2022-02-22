import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const FanKitBooksPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitBooks {...props} />
  </Layout>
)

export default FanKitBooksPage
