import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import CardBuilderApp from '~/components/CardBuilderApp'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getRawCardData from '~/helpers/getRawCardData'
import parseDate from '~/helpers/parseDate'
import CARDS from '~/data/cards'
import CHANGELOG from '~/data/changelog'
import SWCC from '~/data/swcc'

const getContest = id => {
  const contest = SWCC.flat().find(
    contest => contest.winner && contest.winner.id === id
  )

  if (!contest) return null

  contest.season = parseDate(contest.date) > parseDate(SWCC[1][0].date) ? 2 : 1

  return contest
}

const getChangelog = id => {
  const isOfficial = Boolean(getRawCardData(id).name)

  if (!isOfficial) return []

  return CHANGELOG.filter(change => change.id === id).sort(
    (a, b) => b.timestamp - a.timestamp
  )
}

export async function getStaticPaths() {
  const paths = CARDS.filter(card => !card.token)
    .map(card => card.id)
    .map(id => ({ params: { rest: [id, 'display'] } }))
    .concat([{ params: { rest: [] } }])

  return { paths, fallback: true }
}

const DEFAULT_PROPS = {
  cardId: null,
  card: {},
  contest: null,
  mode: 'EDITOR',
}

export async function getStaticProps(context) {
  const params = context.params.rest || []

  try {
    const [id, display] = params

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return {
        props: DEFAULT_PROPS,
      }
    }

    return {
      props: {
        cardId: id,
        card: getInitialCardData(id),
        contest: getContest(id),
        versions: getChangelog(id),
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      },
    }
  } catch (error) {
    return {
      props: DEFAULT_PROPS,
    }
  }
}

const CardBuilderPage = props => (
  <Layout active={['TOOLS', 'CARD_BUILDER', props.mode]}>
    {props.mode === 'DISPLAY' ? (
      <CardBuilderApp {...props} />
    ) : (
      <CardBuilderEditor {...props} />
    )}
  </Layout>
)

export default CardBuilderPage
