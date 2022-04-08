import Guides from '~/components/Guides'
import { CATEGORIES } from '~/constants/guides'
import getGuidesFromCategory from '~/api/guides/getGuidesFromCategory'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'IN_DEPTH'
  const category = { ...CATEGORIES[name], id: name }
  const guides = await getGuidesFromCategory({ category: name, isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { category, guides, settings, breadcrumbs: ['GUIDES', name] },
  }
}

export default Guides
