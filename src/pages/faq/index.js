import FAQ from '~/components/FAQ'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getFAQ from '~/api/faq/getFAQ'

export async function getStaticProps({ preview: isPreview = false }) {
  const data = await getFAQ({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { data, settings, breadcrumbs: ['HOME', 'HOME', 'FAQ'] } }
}

export default FAQ
