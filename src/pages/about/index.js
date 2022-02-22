import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import getContributions from '~/api/contributions/getContributions'
import getDonations from '~/api/donations/getDonations'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const getAuthor = entry => entry.author
  const donations = await getDonations({ order: 'author asc', isPreview })
  const donators = [...new Set(donations.map(getAuthor))]
  const contributions = await getContributions({
    order: 'author asc',
    isPreview,
  })
  const contributors = [...new Set(contributions.map(getAuthor))]

  return { props: { navigation: getNavigation(), contributors, donators } }
}

const AboutPage = ({ navigation, ...props }) => (
  <Layout active={['HOME', 'HOME', 'ABOUT']} navigation={navigation}>
    <About {...props} />
  </Layout>
)

export default AboutPage
