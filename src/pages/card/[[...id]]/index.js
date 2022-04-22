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

  // If the path is `/card/official`, it falls onto this route handler and
  // should redirect to the first card of the official collection.
  if (cardId === 'official') {
    return {
      redirect: {
        destination: `/card/official/${settings.cards[0].id}`,
        permanent: false,
      },
    }
  }

  if (view && view !== 'display') {
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
  const mode = view === 'display' ? 'DISPLAY' : 'EDITOR'

  return { props: { settings, id: cardId, card, mode, breadcrumbs } }
}

export default PageCardBuilder
