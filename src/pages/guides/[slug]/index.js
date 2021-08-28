import React from 'react'
import path from 'path'
import dynamic from 'next/dynamic'
import Guide from '~/components/Guide'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import GUIDES from '~/data/guides'
import getNavigation from '~/helpers/getNavigation'
import generateFormulaImage from '~/helpers/generateFormulaImage'

const GUIDE_COMPONENTS = {
  BEGINNER_GUIDE: dynamic(() => import('~/components/GuideBeginner'), {
    loading: Loader,
  }),
  BRAWL_GUIDE: dynamic(() => import('~/components/GuideBrawl'), {
    loading: Loader,
  }),
  BROODMOTHER_QORDIA_GUIDE: dynamic(
    () => import('~/components/GuideBroodmotherQordia'),
    { loading: Loader }
  ),
  BWBRUSH_GUIDE: dynamic(() => import('~/components/GuideBwBRush'), {
    loading: Loader,
  }),
  CARD_SHOP_GUIDE: dynamic(() => import('~/components/GuideCardShop'), {
    loading: Loader,
  }),
  CHILLBEARDS_GUIDE: dynamic(() => import('~/components/GuideChillbeards'), {
    loading: Loader,
  }),
  COMPLETE_GUIDE: dynamic(() => import('~/components/GuideComplete'), {
    loading: Loader,
  }),
  D1_SF_COMMONS_GUIDE: dynamic(() => import('~/components/GuideD1SFCommons'), {
    loading: Loader,
  }),
  DECK_GUIDE: dynamic(() => import('~/components/GuideDeck'), {
    loading: Loader,
  }),
  DRAWING_GUIDE: dynamic(() => import('~/components/GuideDrawing'), {
    loading: Loader,
  }),
  EQUALS_INTRO_GUIDE: dynamic(() => import('~/components/GuideEqualsIntro'), {
    loading: Loader,
  }),
  EYE_OF_THE_TEMPEST_GUIDE: dynamic(
    () => import('~/components/GuideEyeOfTheTempest'),
    { loading: Loader }
  ),
  FREEDOM_FIGHT_GUIDE: dynamic(() => import('~/components/GuideFreedomFight'), {
    loading: Loader,
  }),
  GODDESS_BOON_GUIDE: dynamic(() => import('~/components/GuideGoddessBoon'), {
    loading: Loader,
  }),
  GREEN_PROTOTYPES_GUIDE: dynamic(
    () => import('~/components/GuideGreenPrototypes'),
    { loading: Loader }
  ),
  LEGENDARIES_GUIDE: dynamic(() => import('~/components/GuideLegendaries'), {
    loading: Loader,
  }),
  LUCRATIVE_PROJECT_GUIDE: dynamic(
    () => import('~/components/GuideLucrativeProject'),
    { loading: Loader }
  ),
  MANA_CURVE_GUIDE: dynamic(() => import('~/components/GuideManaCurve'), {
    loading: Loader,
  }),
  NOBLE_COALITION_GUIDE: dynamic(
    () => import('~/components/GuideNobleCoalition'),
    { loading: Loader }
  ),
  PIRATE_GUIDE: dynamic(() => import('~/components/GuidePirate'), {
    loading: Loader,
  }),
  RECKLESS_RUSH_GUIDE: dynamic(() => import('~/components/GuideRecklessRush'), {
    loading: Loader,
  }),
  RESOURCES_GUIDE: dynamic(() => import('~/components/GuideResources'), {
    loading: Loader,
  }),
  SELF_CONTROL_GUIDE: dynamic(() => import('~/components/GuideSelfControl'), {
    loading: Loader,
  }),
  TERRIFIC_SLAYERS_GUIDE: dynamic(
    () => import('~/components/GuideTerrificSlayers'),
    { loading: Loader }
  ),
  TRIGGER_GUIDE: dynamic(() => import('~/components/GuideTriggers'), {
    loading: Loader,
  }),
  TRIVIA_GUIDE: dynamic(() => import('~/components/GuideTrivia'), {
    loading: Loader,
  }),
  WINTER_GUIDE: dynamic(() => import('~/components/GuideWinter'), {
    loading: Loader,
  }),
}

export const getStaticPaths = () => {
  return {
    paths: GUIDES.map(release => ({ params: { slug: release.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  if (params.slug === 'drawing') {
    await generateFormulaImage(
      'f(w) = ⌊ w × 1.6 + 1',
      path.resolve('./public/assets/images/formulas/drawing.png')
    )
  }

  return {
    props: {
      navigation: getNavigation(),
      ...GUIDES.find(release => release.slug === params.slug),
    },
  }
}

const GuidePage = ({ navigation, ...props }) => {
  const Component = GUIDE_COMPONENTS[props.id]

  return (
    <Layout
      active={['GUIDES', props.category, props.id]}
      navigation={navigation}
    >
      <Guide {...props}>
        <Component />
      </Guide>
    </Layout>
  )
}

export default GuidePage
