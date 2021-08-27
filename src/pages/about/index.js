import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import UPDATES from '~/data/updates'
import DONATIONS from '~/data/donations'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const getAuthor = entry => entry.author
  const collaborators = [...new Set(UPDATES.map(getAuthor).sort())]
  const donators = [...new Set(DONATIONS.map(getAuthor))]

  return { props: { navigation: getNavigation(), collaborators, donators } }
}

const AboutPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'ABOUT']} navigation={navigation}>
    <About {...props} />
  </Layout>
)

export default AboutPage
