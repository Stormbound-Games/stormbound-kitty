import PageCardBuilder from '~/components/PageCardBuilder'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'

export async function getStaticPaths() {
  return { paths: [{ params: { id: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [cardId, view] = params.id || []
  const isOfficial = cardId in indexArray(settings.cards)
  const breadcrumbs = ['TOOLS', 'BUILDERS', 'CARD_BUILDER']

  if (view && view !== 'display') {
    return { notFound: true }
  }

  if (isOfficial) {
    return {
      redirect: { destination: `/cards/${cardId}`, permanent: true },
    }
  }

  if (!cardId) {
    return { props: { settings, mode: 'EDITOR', breadcrumbs } }
  }

  try {
    const card = getInitialCardData(settings.cards, cardId)
    const mode = view === 'display' ? 'DISPLAY' : 'EDITOR'

    return { props: { settings, id: cardId, card, mode, breadcrumbs } }
  } catch {
    // If the deserialization failed for any reason, return a 404 as the request
    // cannot be resolved. HTTP 400 Bad Request would be more appropriate but
    // it’s not possible to return that statically.
    return { notFound: true }
  }
}

export default PageCardBuilder
