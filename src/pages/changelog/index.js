import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'
import getChanges from '~/api/changes/getChanges'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const changelog = await getChanges({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, changelog, navigation } }
}

const CardChangelogPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'UPDATES', 'CARD_CHANGELOG']}
    navigation={navigation}
  >
    <CardChangelog {...props} />
  </Layout>
)

export default CardChangelogPage
