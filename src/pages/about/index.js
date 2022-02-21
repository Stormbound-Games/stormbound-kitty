import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import UPDATES from '~/data/updates'
import getDonations from '~/api/donations/getDonations'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const getAuthor = entry => entry.author
  const donations = await getDonations('author asc')
  const collaborators = [...new Set(UPDATES.map(getAuthor).sort())]
  const donators = [...new Set(donations.map(getAuthor))]

  return { props: { navigation: getNavigation(), collaborators, donators } }
}

const AboutPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'ABOUT']} navigation={navigation}>
    <About {...props} />
  </Layout>
)

export default AboutPage
