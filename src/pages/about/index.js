import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import getContributions from '~/api/contributions/getContributions'
import getDonations from '~/api/donations/getDonations'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const getAuthor = entry => entry.author
  const donations = await getDonations({ order: 'author asc', isPreview })
  const donators = [...new Set(donations.map(getAuthor))]
  const contributions = await getContributions({
    order: 'author asc',
    isPreview,
  })
  const contributors = [...new Set(contributions.map(getAuthor))]
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation, contributors, donators } }
}

const AboutPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['HOME', 'HOME', 'ABOUT']}
    navigation={navigation}
    cards={cards}
  >
    <About {...props} />
  </Layout>
)

export default AboutPage
