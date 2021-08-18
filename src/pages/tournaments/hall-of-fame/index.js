import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'

const TournamentHallOfFamePage = () => (
  <Layout active={['COMMUNITY', 'HALL_OF_FAME']}>
    <TournamentHallOfFame />
  </Layout>
)

export default TournamentHallOfFamePage
