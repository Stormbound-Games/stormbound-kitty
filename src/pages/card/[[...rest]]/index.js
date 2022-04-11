import PageCardBuilder from '~/components/PageCardBuilder'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getSWCCFromCard from '~/api/swcc/getSWCCFromCard'

export async function getStaticPaths() {
  // SWCC pages cannot be prerenredered because their URL is too long. :(
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [cardId, display] = params.rest || []
  const isOfficial = cardId in indexArray(settings.cards)
  const breadcrumbs = ['TOOLS', 'BUILDERS', 'CARD_BUILDER']

  if (
    (display && display !== 'display') ||
    // If the path is `/card/official`, it falls onto this route handler and
    // should yield a 404.
    cardId === 'official'
  ) {
    return { notFound: true }
  }

  if (isOfficial) {
    return {
      redirect: {
        destination: `/card/official/${cardId}`,
        permanent: true,
      },
    }
  }

  if (!cardId) {
    return { props: { settings, mode: 'EDITOR', breadcrumbs } }
  }

  const card = getInitialCardData(settings.cards, cardId)
  const contest = await getSWCCFromCard({ id: cardId, isPreview })
  const mode = display === 'display' ? 'DISPLAY' : 'EDITOR'

  return { props: { settings, cardId, card, contest, mode, breadcrumbs } }
}

export default PageCardBuilder
