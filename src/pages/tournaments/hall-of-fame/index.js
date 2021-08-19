import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'
import TOURNAMENTS from '~/data/tournaments'

export async function getStaticProps() {
  return { props: { tournaments: TOURNAMENTS } }
}

const TournamentHallOfFamePage = props => (
  <Layout active={['COMMUNITY', 'HALL_OF_FAME']}>
    <TournamentHallOfFame tournaments={props.tournaments} />
  </Layout>
)

export default TournamentHallOfFamePage
