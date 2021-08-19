import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'
import CHANGELOG from '~/data/changelog'

export async function getStaticProps() {
  return { props: { changelog: CHANGELOG } }
}

const CardChangelogPage = props => (
  <Layout active={['GAME', 'CARD_CHANGELOG']}>
    <CardChangelog changelog={props.changelog} />
  </Layout>
)

export default CardChangelogPage
