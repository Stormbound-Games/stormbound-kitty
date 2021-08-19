import React from 'react'
import Error from '~/components/Error'
import Layout from '~/components/Layout'

export default function Custom404() {
  return (
    <Layout active={[]}>
      <Error error='404 — Page Not Found' />
    </Layout>
  )
}
