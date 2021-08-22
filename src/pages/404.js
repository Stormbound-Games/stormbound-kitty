import React from 'react'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

export default function Custom404(props) {
  return (
    <Layout active={[]} navigation={props.navigation}>
      <Error error='404 — Page Not Found' />
    </Layout>
  )
}
