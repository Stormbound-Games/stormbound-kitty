import PageTierLists from '#components/PageTierLists'
import getSiteSettings from '#api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { settings, breadcrumbs: ['COMMUNITY', 'META', 'TIER_LISTS'] },
  }
}

export default PageTierLists
