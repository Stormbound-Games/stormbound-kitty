import React from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import Error from '../Error'
import load from '../../helpers/load'
import guides from '../../data/guides'
import { CATEGORIES } from '../../constants/guides'

const Guides = load('Guides')
const COMPONENTS = {
  BEGINNER_GUIDE: load('GuideBeginner'),
  D1_SF_COMMONS_GUIDE: load('GuideD1SFCommons'),
  COMPLETE_GUIDE: load('GuideComplete'),
  DECK_GUIDE: load('GuideDeck'),
  DRAWING_GUIDE: load('GuideDrawing'),
  RESOURCES_GUIDE: load('GuideResources'),
  MANA_CURVE_GUIDE: load('GuideManaCurve'),
  WINTER_GUIDE: load('GuideWinter'),
  PIRATE_GUIDE: load('GuidePirate'),
  LEXICON: load('Lexicon'),
  TRIGGER_GUIDE: load('GuideTriggers'),
  CARD_SHOP_GUIDE: load('GuideCardShop'),
  KNOWN_BUGS: load('GuideKnownBugs'),
  BRAWL_GUIDE: load('GuideBrawl'),
  CHILLBEARDS_GUIDE: load('GuideChillbeards'),
}

export default function RouterGuides() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      {guides.map(guide => {
        const Component = COMPONENTS[guide.id]

        return (
          <Page
            path={`${path}/${guide.slug}`}
            active={['GUIDES', guide.id]}
            key={guide.id}
          >
            <Component />
          </Page>
        )
      })}

      {Object.keys(CATEGORIES).map(category => (
        <Page
          exact
          path={`${path}/${CATEGORIES[category].slug}`}
          active={['GUIDES', category]}
          key={category}
        >
          <Guides category={category} />
        </Page>
      ))}

      <Redirect from={path} to='/guides/essentials' />

      <Page path='*' active={['GUIDES']}>
        <Error error='HTTP 404 — Not Found' />
      </Page>
    </Switch>
  )
}
