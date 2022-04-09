import PageKnownBugs from '~/components/PageKnownBugs'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { settings, breadcrumbs: ['GAME', 'INFORMATION', 'KNOWN_BUGS'] },
  }
}

export default PageKnownBugs
