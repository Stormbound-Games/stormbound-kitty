import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import CARDS from '~/data/cards'
import SWCC from '~/data/swcc'

export async function getStaticPaths() {
  const officialCards = CARDS.filter(card => !card.token).map(card => card.id)
  const customCards = SWCC.flat().map(week => week.winner.id)

  const paths = [...officialCards, ...customCards].filter(Boolean).map(id => ({
    params: { id },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const card = getInitialCardData(context.params.id)

  return { props: { card, id: context.params.id } }
}

export default props => (
  <Layout active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}>
    <CardBuilderEditor card={props.card} cardId={props.id} />
  </Layout>
)
