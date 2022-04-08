import Lexicon from '~/components/Lexicon'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getAbbreviations from '~/api/misc/getAbbreviations'

export async function getStaticProps({ preview: isPreview = false }) {
  const abbreviations = await getAbbreviations({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      abbreviations,
      settings,
      breadcrumbs: ['GAME', 'INFORMATION', 'LEXICON'],
    },
  }
}

export default Lexicon
