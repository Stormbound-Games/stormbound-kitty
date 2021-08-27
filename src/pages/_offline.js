import React from 'react'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

export default function Offline({ navigation, ...props }) {
  return (
    <Layout active={[]} navigation={navigation}>
      <Error {...props} error='Offline mode' />
    </Layout>
  )
}
