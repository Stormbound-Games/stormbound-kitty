import React from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Error from '../Error'
import Page from '../Page'
import { StoriesContext } from '../StoriesProvider'
import load from '../../helpers/load'
import { STORY_CATEGORIES } from '../../constants/stories'
import guides from '../../data/guides'
import releases from '../../data/releases'
import { CATEGORIES } from '../../constants/guides'

const GUIDE_COMPONENTS = {
  BEGINNER_GUIDE: load('GuideBeginner'),
  BRAWL_GUIDE: load('GuideBrawl'),
  BROODMOTHER_QORDIA_GUIDE: load('GuideBroodmotherQordia'),
  CARD_SHOP_GUIDE: load('GuideCardShop'),
  CHILLBEARDS_GUIDE: load('GuideChillbeards'),
  COMPLETE_GUIDE: load('GuideComplete'),
  D1_SF_COMMONS_GUIDE: load('GuideD1SFCommons'),
  DECK_GUIDE: load('GuideDeck'),
  DRAWING_GUIDE: load('GuideDrawing'),
  EQUALS_INTRO_GUIDE: load('GuideEqualsIntro'),
  EYE_OF_THE_TEMPEST_GUIDE: load('GuideEyeOfTheTempest'),
  FREEDOM_FIGHT_GUIDE: load('GuideFreedomFight'),
  GODDESS_BOON_GUIDE: load('GuideGoddessBoon'),
  GREEN_PROTOTYPES_GUIDE: load('GuideGreenPrototypes'),
  KNOWN_BUGS: load('GuideKnownBugs'),
  LEGENDARIES_GUIDE: load('GuideLegendaries'),
  LEXICON: load('Lexicon'),
  LUCRATIVE_PROJECT_GUIDE: load('GuideLucrativeProject'),
  MANA_CURVE_GUIDE: load('GuideManaCurve'),
  NOBLE_COALITION_GUIDE: load('GuideNobleCoalition'),
  PIRATE_GUIDE: load('GuidePirate'),
  RECKLESS_RUSH_GUIDE: load('GuideRecklessRush'),
  RESOURCES_GUIDE: load('GuideResources'),
  SELF_CONTROL_GUIDE: load('GuideSelfControl'),
  TERRIFIC_SLAYERS_GUIDE: load('GuideTerrificSlayers'),
  TRIGGER_GUIDE: load('GuideTriggers'),
  TRIVIA_GUIDE: load('GuideTrivia'),
  WINTER_GUIDE: load('GuideWinter'),
}

const RELEASE_COMPONENTS = {
  '05_2021': load('ReleaseNotesMay2021'),
  '04_2021': load('ReleaseNotesApril2021'),
  '03_2021': load('ReleaseNotesMarch2021'),
  '02_2021': load('ReleaseNotesFebruary2021'),
  temple_of_focus: load('ReleaseNotesTempleOfFocus'),
  ios_01_2021: load('ReleaseNotesIOSJanuary2021'),
  end_of_2020: load('ReleaseNotesEndOf2020'),
  '12_2020': load('ReleaseNotesDecember2020'),
  '11_2020': load('ReleaseNotesNovember2020'),
  '10_2020': load('ReleaseNotesOctober2020'),
  '3RD_ANNIVERSARY': load('ReleaseNotes3rdAnniversary'),
  '09_2020': load('ReleaseNotesSeptember2020'),
  '07_2020': load('ReleaseNotesJuly2020'),
}

const About = load('About')
const BattleSimPage = load('BattleSimPage')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BooksCalculator = load('BooksCalculator')
const BrawlCalculator = load('BrawlCalculator')
const BrawlIndex = load('BrawlIndex')
const BrawlOverview = load('BrawlOverview')
const BrawlPage = load('BrawlPage')
const BrewedSages = load('BrewedSages')
const CardBuilderContest = load('CardBuilderContest')
const CardBuilderDisplay = load('CardBuilderDisplay')
const CardBuilderEditor = load('CardBuilderEditor')
const CardsStats = load('CardsStats')
const CardChangelog = load('CardChangelog')
const Collection = load('Collection')
const CollectionStats = load('CollectionStats')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckCollection = load('DeckCollection')
const DeckDetailView = load('DeckDetailView')
const DeckDryRunView = load('DeckDryRunView')
const DeckEditorView = load('DeckEditorView')
const DeckSuggestions = load('DeckSuggestions')
const EqualsList = load('EqualsList')
const FanArt = load('FanArt')
const FanKitAvatars = load('FanKitAvatars')
const FanKitBooks = load('FanKitBooks')
const FanKitCards = load('FanKitCards')
const FanKitWallpapers = load('FanKitWallpapers')
const FAQ = load('FAQ')
const Guides = load('Guides')
const HeroScoreCalculator = load('HeroScoreCalculator')
const Home = load('Home')
const IncomeCalculator = load('IncomeCalculator')
const ListBuilderDisplayView = load('ListBuilderDisplayView')
const ListBuilderEditorView = load('ListBuilderEditorView')
const Member = load('Member')
const Members = load('Members')
const QuestBuilderRoot = load('QuestBuilderRoot')
const RankedList = load('RankedList')
const Releases = load('Releases')
const Story = load('Story')
const StoryCategory = load('StoryCategory')
const TournamentHallOfFame = load('TournamentHallOfFame')
const Trivia = load('Trivia')
const ValueCalculator = load('ValueCalculator')
const Videos = load('Videos')

export default function Router(props) {
  const stories = React.useContext(StoriesContext)

  return (
    <AnimatePresence exitBeforeEnter>
      <BrowserRouter>
        <Switch>
          <Page
            path='/sim/:simId/display'
            active={['TOOLS', 'BATTLE_SIM', 'DISPLAY']}
          >
            <BattleSimPage mode='DISPLAY' />
          </Page>

          <Page path='/sim/puzzles' active={['COMMUNITY', 'PUZZLES']}>
            <BattleSimPuzzles />
          </Page>

          <Page path='/sim/:simId' active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
            <BattleSimPage mode='EDITOR' />
          </Page>

          <Page path='/sim' active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
            <BattleSimPage mode='EDITOR' />
          </Page>

          <Page
            exact
            path='/card/contest'
            active={['COMMUNITY', 'CARD_CONTEST']}
          >
            <CardBuilderContest />
          </Page>

          <Page exact path='/card/stats' active={['GAME', 'CARD_STATS']}>
            <CardsStats />
          </Page>

          <Page exact path='/trivia' active={['GAME', 'TRIVIA']}>
            <Trivia />
          </Page>

          <Page
            path='/card/:cardId/display'
            active={['TOOLS', 'CARD_BUILDER', 'DISPLAY']}
          >
            <CardBuilderDisplay />
          </Page>

          <Page
            path='/card/:cardId'
            active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}
          >
            <CardBuilderEditor />
          </Page>

          <Page path='/card' active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}>
            <CardBuilderEditor />
          </Page>

          <Page
            exact
            path='/deck/suggestions'
            active={['COMMUNITY', 'DECK_SUGGESTIONS']}
          >
            <DeckSuggestions />
          </Page>

          <Page path='/deck/collection' active={['TOOLS', 'DECK_COLLECTION']}>
            <DeckCollection />
          </Page>

          <Page
            path='/deck/:deckId/detail'
            active={['TOOLS', 'DECK_BUILDER', 'DETAIL']}
          >
            <DeckBuilderRoot view='DETAIL'>
              {state => <DeckDetailView {...state} />}
            </DeckBuilderRoot>
          </Page>

          <Page
            path='/deck/:deckId/dry-run'
            active={['TOOLS', 'DECK_BUILDER', 'DRY_RUN']}
          >
            <DeckBuilderRoot view='DRY_RUN'>
              {state => <DeckDryRunView {...state} />}
            </DeckBuilderRoot>
          </Page>

          <Page
            path='/deck/:deckId'
            active={['TOOLS', 'DECK_BUILDER', 'EDITOR']}
          >
            <DeckBuilderRoot view='EDITOR'>
              {state => <DeckEditorView {...state} />}
            </DeckBuilderRoot>
          </Page>

          <Page path='/deck' active={['TOOLS', 'DECK_BUILDER', 'EDITOR']}>
            <DeckBuilderRoot view='EDITOR'>
              {state => <DeckEditorView {...state} />}
            </DeckBuilderRoot>
          </Page>

          <Page
            exact
            path='/collection/stats'
            active={['TOOLS', 'COLLECTION_STATS']}
          >
            <CollectionStats />
          </Page>

          <Page exact path='/collection' active={['TOOLS', 'COLLECTION']}>
            <Collection />
          </Page>

          <Page path='/quest/:questId' active={['TOOLS', 'QUEST_BUILDER']}>
            <QuestBuilderRoot />
          </Page>

          <Page path='/quest' active={['TOOLS', 'QUEST_BUILDER']}>
            <QuestBuilderRoot />
          </Page>

          {stories.map(story => (
            <Redirect
              key={story.oldId}
              path={`/stories/${story.oldId}`}
              to={`/stories/${story.id}`}
            />
          ))}

          {Object.keys(STORY_CATEGORIES).map(category => (
            <Page
              exact
              path={`/stories/${category}`}
              active={['STORIES', category]}
              key={category}
            >
              <StoryCategory category={category} />
            </Page>
          ))}

          <Page path='/stories/:storyId' active={['STORIES', 'STORY']}>
            <Story />
          </Page>

          <Redirect path='/stories' to='/stories/lore' />

          {guides.map(guide => {
            const Component = GUIDE_COMPONENTS[guide.id]

            return (
              <Page
                path={`/guides/${guide.slug}`}
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
              path={`/guides/${CATEGORIES[category].slug}`}
              active={['GUIDES', category]}
              key={category}
            >
              <Guides category={category} />
            </Page>
          ))}

          <Redirect from='/guides' to='/guides/essentials' />

          <Redirect from='/list/ranked/display' to='/list/ranked' />
          <Page exact path='/list/ranked' active={['COMMUNITY', 'RANKED_LIST']}>
            <RankedList />
          </Page>

          <Redirect from='/list/equals/display' to='/list/equals' />
          <Page exact path='/list/equals' active={['COMMUNITY', 'EQUALS_LIST']}>
            <EqualsList />
          </Page>

          <Page
            path='/list/:listId/display'
            active={['TOOLS', 'LIST_BUILDER', 'DISPLAY']}
          >
            <ListBuilderDisplayView />
          </Page>

          <Page
            path='/list/:listId'
            active={['TOOLS', 'LIST_BUILDER', 'EDITOR']}
          >
            <ListBuilderEditorView />
          </Page>

          <Page path='/list' active={['TOOLS', 'LIST_BUILDER', 'EDITOR']}>
            <ListBuilderEditorView />
          </Page>

          <Page
            exact
            path='/brawl/overview'
            active={['TOOLS', 'BRAWL', 'OVERVIEW']}
          >
            <BrawlOverview />
          </Page>

          <Page path='/brawl/:id' active={['TOOLS', 'BRAWL', 'TRACKER']}>
            <BrawlPage />
          </Page>

          <Page exact path='/brawl' active={['TOOLS', 'BRAWL', 'INDEX']}>
            <BrawlIndex />
          </Page>

          <Page path='/member/:memberId'>
            <Member />
          </Page>

          <Page exact path='/members'>
            <Members />
          </Page>

          <Redirect exact path='/fan-kit' to='/fan-kit/cards' />

          <Page
            exact
            path='/fan-kit/avatars'
            active={['GAME', 'FAN_KIT', 'AVATARS']}
          >
            <FanKitAvatars />
          </Page>

          <Page
            exact
            path='/fan-kit/books'
            active={['GAME', 'FAN_KIT', 'BOOKS']}
          >
            <FanKitBooks />
          </Page>

          <Page
            exact
            path='/fan-kit/cards'
            active={['GAME', 'FAN_KIT', 'CARDS']}
          >
            <FanKitCards />
          </Page>

          <Page
            exact
            path='/fan-kit/wallpapers'
            active={['GAME', 'FAN_KIT', 'WALLPAPERS']}
          >
            <FanKitWallpapers />
          </Page>

          <Page exact path='/fan-art' active={['GAME', 'FAN_ART']}>
            <FanArt />
          </Page>

          <Redirect from='/collection/books' to='/calculators/books' />

          <Page
            exact
            path='/calculators/books'
            active={['TOOLS', 'BOOKS_CALCULATOR']}
          >
            <BooksCalculator />
          </Page>

          <Page
            exact
            path='/calculators/hero'
            active={['TOOLS', 'HERO_CALCULATOR']}
          >
            <HeroScoreCalculator />
          </Page>

          <Redirect from='/income-calculator' to='/calculators/income' />

          <Page
            exact
            path='/calculators/income'
            active={['TOOLS', 'INCOME_CALCULATOR']}
          >
            <IncomeCalculator />
          </Page>

          <Page
            exact
            path='/calculators/value/:id'
            active={['TOOLS', 'VALUE_CALCULATOR']}
          >
            <ValueCalculator />
          </Page>

          <Page
            exact
            path='/calculators/value'
            active={['TOOLS', 'VALUE_CALCULATOR']}
          >
            <ValueCalculator />
          </Page>

          <Page
            exact
            path='/calculators/brawl'
            active={['TOOLS', 'BRAWL_CALCULATOR']}
          >
            <BrawlCalculator />
          </Page>

          {releases.map(release => {
            const Component = RELEASE_COMPONENTS[release.id]

            return (
              <Page
                exact
                path={'/releases/' + release.slug}
                active={['GAME', release.id]}
                key={release.id}
              >
                <Component />
              </Page>
            )
          })}

          {releases.map(release => (
            <Redirect
              key={release.id}
              from={'/changelog/' + release.slug}
              to={'/releases/' + release.slug}
            />
          ))}

          <Redirect from='/changelog/releases' to='/releases' />
          <Page exact path='/releases' active={['GAME', 'RELEASES']}>
            <Releases />
          </Page>

          <Redirect from='/changelog/cards' to='/changelog' />
          <Page exact path='/changelog' active={['GAME', 'CARD_CHANGELOG']}>
            <CardChangelog />
          </Page>

          <Page exact path='/faq' active={['HOME', 'FAQ']}>
            <FAQ />
          </Page>

          <Redirect from='/donate' to='/about' />

          <Page exact path='/about' active={['HOME', 'ABOUT']}>
            <About />
          </Page>

          <Page
            exact
            path='/tournaments/hall-of-fame'
            active={['COMMUNITY', 'HALL_OF_FAME']}
          >
            <TournamentHallOfFame />
          </Page>

          <Page
            exact
            path='/brewed-sages'
            active={['COMMUNITY', 'BREWED_SAGES']}
          >
            <BrewedSages />
          </Page>

          <Page path='/videos' exact active={['COMMUNITY', 'VIDEOS']}>
            <Videos />
          </Page>

          <Page exact path='/' active={['HOME', 'NEWS']}>
            <Home />
          </Page>

          <Page path='*'>
            <Error error='HTTP 404 – Not Found' />
          </Page>
        </Switch>
      </BrowserRouter>
    </AnimatePresence>
  )
}
