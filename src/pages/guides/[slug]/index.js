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
  BEGINNER: dynamic(() => import('~/components/Guide/Beginner'), {
    loading: Loader,
  }),
  BRAWL: dynamic(() => import('~/components/Guide/Brawl'), {
    loading: Loader,
  }),
  BRAWL_AFTERSHOCK: dynamic(
    () => import('~/components/Guide/BrawlAftershock'),
    {
      loading: Loader,
    }
  ),
  BRAWL_EYE_OF_THE_TEMPEST: dynamic(
    () => import('~/components/Guide/BrawlEyeOfTheTempest'),
    { loading: Loader }
  ),
  BRAWL_FREEDOM_FIGHT: dynamic(
    () => import('~/components/Guide/BrawlFreedomFight'),
    {
      loading: Loader,
    }
  ),
  BRAWL_GODDESS_BOON: dynamic(
    () => import('~/components/Guide/BrawlGoddessBoon'),
    {
      loading: Loader,
    }
  ),
  BRAWL_LUCRATIVE_PROJECT: dynamic(
    () => import('~/components/Guide/BrawlLucrativeProject'),
    { loading: Loader }
  ),
  BRAWL_NOBLE_COALITION: dynamic(
    () => import('~/components/Guide/BrawlNobleCoalition'),
    {
      loading: Loader,
    }
  ),
  BRAWL_SELF_CONTROL: dynamic(
    () => import('~/components/Guide/BrawlSelfControl'),
    {
      loading: Loader,
    }
  ),
  BROODMOTHER_QORDIA: dynamic(
    () => import('~/components/Guide/BroodmotherQordia'),
    { loading: Loader }
  ),
  BWB_RUSH: dynamic(() => import('~/components/Guide/BwBRush'), {
    loading: Loader,
  }),
  CARD_SHOP: dynamic(() => import('~/components/Guide/CardShop'), {
    loading: Loader,
  }),
  CHILLBEARDS: dynamic(() => import('~/components/Guide/Chillbeards'), {
    loading: Loader,
  }),
  COMPLETE: dynamic(() => import('~/components/Guide/Complete'), {
    loading: Loader,
  }),
  D1_SF_COMMONS: dynamic(() => import('~/components/Guide/D1SFCommons'), {
    loading: Loader,
  }),
  DECK_BUILDING: dynamic(() => import('~/components/Guide/DeckBuilding'), {
    loading: Loader,
  }),
  DRAFT: dynamic(() => import('~/components/Guide/Draft'), {
    loading: Loader,
  }),
  DRAWING_MECHANICS: dynamic(
    () => import('~/components/Guide/DrawingMechanics'),
    {
      loading: Loader,
    }
  ),
  INTRO_TO_EQUALS: dynamic(() => import('~/components/Guide/IntroToEquals'), {
    loading: Loader,
  }),
  GREEN_PROTOTYPES: dynamic(
    () => import('~/components/Guide/GreenPrototypes'),
    {
      loading: Loader,
    }
  ),
  LEGENDARIES_LEVEL_1: dynamic(
    () => import('~/components/Guide/LegendariesLevel1'),
    {
      loading: Loader,
    }
  ),
  MANA_CURVE: dynamic(() => import('~/components/Guide/ManaCurve'), {
    loading: Loader,
  }),
  MIAS_METROPOLIS: dynamic(() => import('~/components/Guide/MiasMetropolis'), {
    loading: Loader,
  }),
  PIRATE: dynamic(() => import('~/components/Guide/Pirate'), {
    loading: Loader,
  }),
  RECKLESS_RUSH: dynamic(() => import('~/components/Guide/RecklessRush'), {
    loading: Loader,
  }),
  RESOURCES: dynamic(() => import('~/components/Guide/Resources'), {
    loading: Loader,
  }),
  TERRIFIC_SLAYERS: dynamic(
    () => import('~/components/Guide/TerrificSlayers'),
    {
      loading: Loader,
    }
  ),
  STRUCTURES: dynamic(() => import('~/components/Guide/Structures'), {
    loading: Loader,
  }),
  TRIGGERS: dynamic(() => import('~/components/Guide/Triggers'), {
    loading: Loader,
  }),
  TRIVIA: dynamic(() => import('~/components/Guide/Trivia'), {
    loading: Loader,
  }),
  WINTER: dynamic(() => import('~/components/Guide/Winter'), {
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
