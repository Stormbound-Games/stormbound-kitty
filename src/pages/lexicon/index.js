import React from 'react'
import Lexicon from '~/components/Lexicon'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getAbbreviations from '~/api/misc/getAbbreviations'

export async function getStaticProps({ preview: isPreview = false }) {
  const abbreviations = await getAbbreviations({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { abbreviations, settings } }
}

const LexiconPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'LEXICON']} settings={settings}>
    <Lexicon {...props} />
  </Layout>
)

export default LexiconPage
