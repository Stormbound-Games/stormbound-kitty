import HeroScoreCalculator from '~/components/HeroScoreCalculator'
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

export default HeroScoreCalculator
