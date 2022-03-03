import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { cards, settings } }
}

const LexiconPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'LEXICON']} settings={settings}>
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
