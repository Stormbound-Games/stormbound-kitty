import React from 'react'
import FanKitAvatars from '~/components/FanKitAvatars'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getAvatars from '~/api/avatars/getAvatars'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      avatars: await getAvatars({ isPreview }),
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitAvatarsPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitAvatars {...props} />
  </Layout>
)

export default FanKitAvatarsPage
