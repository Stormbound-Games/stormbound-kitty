import React from 'react'
import path from 'path'
import dynamic from 'next/dynamic'
import Guide from '~/components/Guide'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import GUIDES from '~/data/guides'
import getNavigation from '~/helpers/getNavigation'
import generateFormulaImage from '~/helpers/generateFormulaImage'

const options = { loading: Loader }

const GUIDE_COMPONENTS = {
  BEGINNER_GUIDE: dynamic(() => import('~/components/GuideBeginner'), options),
  BRAWL_GUIDE: dynamic(() => import('~/components/GuideBrawl'), options),
  BROODMOTHER_QORDIA_GUIDE: dynamic(
    () => import('~/components/GuideBroodmotherQordia'),
    options
  ),
  BWBRUSH_GUIDE: dynamic(() => import('~/components/GuideBwBRush'), options),
  CARD_SHOP_GUIDE: dynamic(() => import('~/components/GuideCardShop'), options),
  CHILLBEARDS_GUIDE: dynamic(
    () => import('~/components/GuideChillbeards'),
    options
  ),
  COMPLETE_GUIDE: dynamic(() => import('~/components/GuideComplete'), options),
  D1_SF_COMMONS_GUIDE: dynamic(
    () => import('~/components/GuideD1SFCommons'),
    options
  ),
  DECK_GUIDE: dynamic(() => import('~/components/GuideDeck'), options),
  DRAWING_GUIDE: dynamic(() => import('~/components/GuideDrawing'), options),
  EQUALS_INTRO_GUIDE: dynamic(
    () => import('~/components/GuideEqualsIntro'),
    options
  ),
  EYE_OF_THE_TEMPEST_GUIDE: dynamic(
    () => import('~/components/GuideEyeOfTheTempest'),
    options
  ),
  FREEDOM_FIGHT_GUIDE: dynamic(
    () => import('~/components/GuideFreedomFight'),
    options
  ),
  GODDESS_BOON_GUIDE: dynamic(
    () => import('~/components/GuideGoddessBoon'),
    options
  ),
  GREEN_PROTOTYPES_GUIDE: dynamic(
    () => import('~/components/GuideGreenPrototypes'),
    options
  ),
  LEGENDARIES_GUIDE: dynamic(
    () => import('~/components/GuideLegendaries'),
    options
  ),
  LUCRATIVE_PROJECT_GUIDE: dynamic(
    () => import('~/components/GuideLucrativeProject'),
    options
  ),
  MANA_CURVE_GUIDE: dynamic(
    () => import('~/components/GuideManaCurve'),
    options
  ),
  NOBLE_COALITION_GUIDE: dynamic(
    () => import('~/components/GuideNobleCoalition'),
    options
  ),
  PIRATE_GUIDE: dynamic(() => import('~/components/GuidePirate'), options),
  RECKLESS_RUSH_GUIDE: dynamic(
    () => import('~/components/GuideRecklessRush'),
    options
  ),
  RESOURCES_GUIDE: dynamic(
    () => import('~/components/GuideResources'),
    options
  ),
  SELF_CONTROL_GUIDE: dynamic(
    () => import('~/components/GuideSelfControl'),
    options
  ),
  TERRIFIC_SLAYERS_GUIDE: dynamic(
    () => import('~/components/GuideTerrificSlayers'),
    options
  ),
  TRIGGER_GUIDE: dynamic(() => import('~/components/GuideTriggers'), options),
  TRIVIA_GUIDE: dynamic(() => import('~/components/GuideTrivia'), options),
  WINTER_GUIDE: dynamic(() => import('~/components/GuideWinter'), options),
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
