import PageHeroScoreCalculator from '~/components/PageHeroScoreCalculator'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      settings,
      breadcrumbs: ['TOOLS', 'CALCULATORS', 'HERO_CALCULATOR'],
    },
  }
}

export default PageHeroScoreCalculator
