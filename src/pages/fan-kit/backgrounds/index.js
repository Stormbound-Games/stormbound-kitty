import React from 'react'
import FanKitBackgrounds from '~/components/FanKitBackgrounds'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const FanKitBackgroundsPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitBackgrounds {...props} />
  </Layout>
)

export default FanKitBackgroundsPage
