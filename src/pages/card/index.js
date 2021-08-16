import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}>
    <CardBuilderEditor card={{}} cardId='' />
  </Layout>
)
