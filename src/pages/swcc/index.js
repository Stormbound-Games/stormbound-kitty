import PageSWCC from '~/components/PageSWCC'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const seasons = await getSWCCSeasons({ isPreview })

  return {
    props: {
      settings,
      seasons,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'CARD_CONTEST'],
    },
  }
}

export default PageSWCC
