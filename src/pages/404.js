import React from 'react'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

export default function Custom404({ navigation, ...props }) {
  return (
    <Layout active={[]} navigation={navigation}>
      <Error {...props} error='404 — Page Not Found' />
    </Layout>
  )
}
