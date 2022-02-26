import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'
import getChanges from '~/api/changes/getChanges'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      changelog: await getChanges({ isPreview }),
    },
  }
}

const CardChangelogPage = ({ navigation, ...props }) => (
  <Layout
    active={['GAME', 'UPDATES', 'CARD_CHANGELOG']}
    navigation={navigation}
  >
    <CardChangelog {...props} />
  </Layout>
)

export default CardChangelogPage
