import React from 'react'
import About from '~/components/About'
import Layout from '~/components/Layout'
import getContributions from '~/api/contributions/getContributions'
import getDonations from '~/api/donations/getDonations'
import getNavigation from '~/helpers/getNavigation'

const uniqueBy = (array, key = 'id') => {
  const result = []
  const set = new Set()

  for (const item of array) {
    if (!set.has(item[key])) {
      set.add(item[key])
      result.push(item)
    }
  }

  return result
}

export async function getStaticProps({ preview: isPreview = false }) {
  const getAuthor = entry => entry.author
  const donations = await getDonations({ order: 'author asc', isPreview })
  const donators = [...new Set(donations.map(getAuthor))]
  const contributions = await getContributions({
    order: 'user.name asc',
    isPreview,
  })
  const contributors = uniqueBy(
    contributions.map(({ user }) => user),
    'name'
  )
  const navigation = await getNavigation({ isPreview })

  return { props: { navigation, contributors, donators } }
}

const AboutPage = ({ navigation, cards, ...props }) => (
  <Layout active={['HOME', 'HOME', 'ABOUT']} navigation={navigation}>
    <About {...props} />
  </Layout>
)

export default AboutPage
