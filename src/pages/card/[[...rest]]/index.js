import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import CardBuilderApp from '~/components/CardBuilderApp'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  const paths = CARDS.filter(card => !card.token)
    .map(card => card.id)
    .map(id => ({ params: { rest: [id, 'display'] } }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const params = context.params.rest || []

  try {
    const [id, display] = params

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return { props: { card: {}, id: null, mode: 'EDITOR' } }
    }

    return {
      props: {
        id,
        card: getInitialCardData(id),
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      },
    }
  } catch (error) {
    return { props: { card: {}, id: null, mode: 'EDITOR' } }
  }
}

const CardBuilderPage = props => (
  <Layout active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}>
    {props.mode === 'DISPLAY' ? (
      <CardBuilderApp card={props.card} cardId={props.id} mode='DISPLAY' />
    ) : (
      <CardBuilderEditor card={props.card} cardId={props.id} mode='EDITOR' />
    )}
  </Layout>
)

export default CardBuilderPage
