import React from 'react'
import dynamic from 'next/dynamic'
import Guide from '~/components/Guide'
import Layout from '~/components/Layout'
import GUIDES from '~/data/guides'

const GUIDE_COMPONENTS = {
  BEGINNER_GUIDE: dynamic(() => import('~/components/GuideBeginner')),
  BRAWL_GUIDE: dynamic(() => import('~/components/GuideBrawl')),
  BROODMOTHER_QORDIA_GUIDE: dynamic(() =>
    import('~/components/GuideBroodmotherQordia')
  ),
  BWBRUSH_GUIDE: dynamic(() => import('~/components/GuideBwBRush')),
  CARD_SHOP_GUIDE: dynamic(() => import('~/components/GuideCardShop')),
  CHILLBEARDS_GUIDE: dynamic(() => import('~/components/GuideChillbeards')),
  COMPLETE_GUIDE: dynamic(() => import('~/components/GuideComplete')),
  D1_SF_COMMONS_GUIDE: dynamic(() => import('~/components/GuideD1SFCommons')),
  DECK_GUIDE: dynamic(() => import('~/components/GuideDeck')),
  DRAWING_GUIDE: dynamic(() => import('~/components/GuideDrawing')),
  EQUALS_INTRO_GUIDE: dynamic(() => import('~/components/GuideEqualsIntro')),
  EYE_OF_THE_TEMPEST_GUIDE: dynamic(() =>
    import('~/components/GuideEyeOfTheTempest')
  ),
  FREEDOM_FIGHT_GUIDE: dynamic(() => import('~/components/GuideFreedomFight')),
  GODDESS_BOON_GUIDE: dynamic(() => import('~/components/GuideGoddessBoon')),
  GREEN_PROTOTYPES_GUIDE: dynamic(() =>
    import('~/components/GuideGreenPrototypes')
  ),
  LEGENDARIES_GUIDE: dynamic(() => import('~/components/GuideLegendaries')),
  LUCRATIVE_PROJECT_GUIDE: dynamic(() =>
    import('~/components/GuideLucrativeProject')
  ),
  MANA_CURVE_GUIDE: dynamic(() => import('~/components/GuideManaCurve')),
  NOBLE_COALITION_GUIDE: dynamic(() =>
    import('~/components/GuideNobleCoalition')
  ),
  PIRATE_GUIDE: dynamic(() => import('~/components/GuidePirate')),
  RECKLESS_RUSH_GUIDE: dynamic(() => import('~/components/GuideRecklessRush')),
  RESOURCES_GUIDE: dynamic(() => import('~/components/GuideResources')),
  SELF_CONTROL_GUIDE: dynamic(() => import('~/components/GuideSelfControl')),
  TERRIFIC_SLAYERS_GUIDE: dynamic(() =>
    import('~/components/GuideTerrificSlayers')
  ),
  TRIGGER_GUIDE: dynamic(() => import('~/components/GuideTriggers')),
  TRIVIA_GUIDE: dynamic(() => import('~/components/GuideTrivia')),
  WINTER_GUIDE: dynamic(() => import('~/components/GuideWinter')),
}

export const getStaticPaths = () => {
  return {
    paths: GUIDES.map(release => ({ params: { slug: release.slug } })),
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: GUIDES.find(release => release.slug === params.slug),
  }
}

const GuidePage = props => {
  const Component = GUIDE_COMPONENTS[props.id]

  return (
    <Layout active={['GUIDES', props.id]}>
      <Guide {...props}>
        <Component />
      </Guide>
    </Layout>
  )
}

export default GuidePage
