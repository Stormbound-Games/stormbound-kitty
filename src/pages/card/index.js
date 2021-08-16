import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import Layout from '~/components/Layout'

const CardBuilderPage = () => (
  <Layout active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}>
    <CardBuilderEditor card={{}} cardId='' />
  </Layout>
)

export default CardBuilderPage
