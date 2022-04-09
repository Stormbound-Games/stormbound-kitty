import PageCardsStats from '~/components/PageCardsStats'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { settings, breadcrumbs: ['GAME', 'INFORMATION', 'CARD_STATS'] },
  }
}

export default PageCardsStats
