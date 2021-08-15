import React from 'react'
import TournamentHallOfFame from '../../../components/TournamentHallOfFame'
import Layout from '../../../components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'HALL_OF_FAME']}>
    <TournamentHallOfFame />
  </Layout>
)
