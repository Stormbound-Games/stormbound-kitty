import PageBrawlCalculator from '#components/PageBrawlCalculator'
import getSiteSettings from '#api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      settings,
      breadcrumbs: ['TOOLS', 'CALCULATORS', 'BRAWL_CALCULATOR'],
    },
  }
}

export default PageBrawlCalculator
