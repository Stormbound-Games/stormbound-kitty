import React from 'react'
import CardBuilderApp from '~/components/CardBuilderApp'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
export { getStaticPaths } from '../'

export async function getStaticProps(context) {
  const card = getInitialCardData(context.params.id)

  return { props: { card, id: context.params.id } }
}

const CardDisplayPage = props => (
  <Layout active={['TOOLS', 'CARD_BUILDER', 'DISPLAY']}>
    <CardBuilderApp cardData={props.card} cardId={props.id} mode='DISPLAY' />
  </Layout>
)

export default CardDisplayPage
