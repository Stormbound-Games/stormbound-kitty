import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const seasons = await getSWCCSeasons({ isPreview })

  return {
    props: { settings, seasons },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const CardContestPage = ({ settings, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'CARD_CONTEST']}
    settings={settings}
  >
    <CardBuilderContest {...props} />
  </Layout>
)

export default CardContestPage
