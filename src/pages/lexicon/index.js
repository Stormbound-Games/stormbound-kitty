import PageLexicon from '~/components/PageLexicon'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getAbbreviations from '~/api/misc/getAbbreviations'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const abbreviations = await getAbbreviations({
    isPreview,
    cards: settings.cards,
  })

  return {
    props: {
      abbreviations,
      settings,
      breadcrumbs: ['GAME', 'INFORMATION', 'LEXICON'],
    },
  }
}

export default PageLexicon
