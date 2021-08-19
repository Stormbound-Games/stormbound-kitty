import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import CONTRIBUTIONS from '~/data/contributions'
import DONATIONS from '~/data/donations'

export async function getStaticProps() {
  const getAuthor = entry => entry.author
  const contributors = [...new Set(CONTRIBUTIONS.map(getAuthor).sort())]
  const donators = [...new Set(DONATIONS.map(getAuthor))]

  return { props: { contributors, donators } }
}

const AboutPage = props => (
  <Layout active={['HOME', 'ABOUT']}>
    <About {...props} />
  </Layout>
)

export default AboutPage
