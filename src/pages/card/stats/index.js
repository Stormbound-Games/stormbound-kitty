import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'

export async function getStaticProps() {
  return { props: { cards: CARDS } }
}

const CardStatsPage = props => (
  <Layout active={['GAME', 'CARD_STATS']}>
    <CardsStats cards={props.cards} />
  </Layout>
)

export default CardStatsPage
