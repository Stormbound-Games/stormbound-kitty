import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import CONTRIBUTIONS from '~/data/contributions'
import DONATIONS from '~/data/donations'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const getAuthor = entry => entry.author
  const contributors = [...new Set(CONTRIBUTIONS.map(getAuthor).sort())]
  const donators = [...new Set(DONATIONS.map(getAuthor))]

  return { props: { navigation: getNavigation(), contributors, donators } }
}

const AboutPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'ABOUT']} navigation={navigation}>
    <About {...props} />
  </Layout>
)

export default AboutPage
