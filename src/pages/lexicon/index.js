import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getCards from '~/api/cards/getCards'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getAbbreviations from '~/api/misc/getAbbreviations'

export async function getStaticProps({ preview: isPreview = false }) {
  const abbreviations = await getAbbreviations({ isPreview })
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { abbreviations, cards, settings } }
}

const LexiconPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'LEXICON']} settings={settings}>
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
