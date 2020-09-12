import React from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Error from '../Error'
import Page from '../Page'
import load from '../../helpers/load'
import useFetch from '../../hooks/useFetch'
import { STORY_CATEGORIES } from '../../constants/stories'
import guides from '../../data/guides'
import { CATEGORIES } from '../../constants/guides'

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
  TERRIFIC_SLAYERS_GUIDE: load('GuideTerrificSlayers'),
  BROODMOTHER_QORDIA_GUIDE: load('GuideBroodmotherQordia'),
}

const BattleSimApp = load('BattleSimApp')
const BattleSimPuzzles = load('BattleSimPuzzles')
const BooksCalculator = load('BooksCalculator')
const BrawlIndex = load('BrawlIndex')
const BrawlOverview = load('BrawlOverview')
const BrawlPage = load('BrawlPage')
const BrewedSages = load('BrewedSages')
const CardBuilderContest = load('CardBuilderContest')
const CardBuilderDisplay = load('CardBuilderDisplay')
const CardBuilderRoot = load('CardBuilderRoot')
const CardsStats = load('CardsStats')
const Changelog = load('Changelog')
const ChangelogJuly2020 = load('ChangelogJuly2020')
const ChangelogSeptember2020 = load('ChangelogSeptember2020')
const Collection = load('Collection')
const CollectionStats = load('CollectionStats')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckCollection = load('DeckCollection')
const DeckDetailView = load('DeckDetailView')
const DeckDryRunView = load('DeckDryRunView')
const DeckEditorView = load('DeckEditorView')
const DeckSuggestions = load('DeckSuggestions')
const Donate = load('Donate')
const EqualsList = load('EqualsList')
const FanKitCards = load('FanKitCards')
const FanKitBooks = load('FanKitBooks')
// const FanKitWallpapers = load('FanKitWallpapers')
const FAQ = load('FAQ')
const Guides = load('Guides')
const Home = load('Home')
const IncomeCalculator = load('IncomeCalculator')
const ListBuilderDisplayView = load('ListBuilderDisplayView')
const ListBuilderEditorView = load('ListBuilderEditorView')
const Member = load('Member')
const QuestBuilderRoot = load('QuestBuilderRoot')
const RankedList = load('RankedList')
const ReleaseNotes = load('ReleaseNotes')
const Story = load('Story')
const StoryCategory = load('StoryCategory')
const TournamentHallOfFame = load('TournamentHallOfFame')
const TournamentOddEven = load('TournamentOddEven')

export default function Router(props) {
  const { data: stories = [] } = useFetch('/stories.json')

  return (
    <AnimatePresence exitBeforeEnter>
      <BrowserRouter>
        <Switch>
          <Page
            path='/sim/:simId/display'
            active={['TOOLS', 'BATTLE_SIM', 'DISPLAY']}
          >
            <BattleSimApp mode='DISPLAY' withMeta />
          </Page>

          <Page path='/sim/puzzles' active={['COMMUNITY', 'PUZZLES']}>
            <BattleSimPuzzles />
          </Page>

          <Page path='/sim/:simId' active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
            <BattleSimApp mode='EDITOR' withMeta />
          </Page>

          <Page path='/sim' active={['TOOLS', 'BATTLE_SIM', 'EDITOR']}>
            <BattleSimApp mode='EDITOR' withMeta />
          </Page>

          <Page path='/card/contest' active={['COMMUNITY', 'CARD_CONTEST']}>
            <CardBuilderContest />
          </Page>

          <Page path='/card/stats' active={['GAME', 'CARD_STATS']}>
            <CardsStats />
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
            <CardBuilderRoot />
          </Page>

          <Page path='/card' active={['TOOLS', 'CARD_BUILDER', 'EDITOR']}>
            <CardBuilderRoot />
          </Page>

          <Page
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

          <Page path='/collection/books' active={['TOOLS', 'BOOKS_CALCULATOR']}>
            <BooksCalculator />
          </Page>

          <Page path='/collection/stats' active={['TOOLS', 'COLLECTION_STATS']}>
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
            const Component = COMPONENTS[guide.id]

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

          <Page path='/list/ranked' active={['GAME', 'RANKED_LIST']}>
            <RankedList />
          </Page>

          <Page path='/list/equals' active={['GAME', 'EQUALS_LIST']}>
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

          <Page path='/brawl/overview' active={['TOOLS', 'BRAWL', 'OVERVIEW']}>
            <BrawlOverview />
          </Page>

          <Page path='/brawl/:id' active={['TOOLS', 'BRAWL', 'TRACKER']}>
            <BrawlPage />
          </Page>

          <Page path='/brawl' active={['TOOLS', 'BRAWL', 'INDEX']}>
            <BrawlIndex />
          </Page>

          <Page path='/member/:memberId'>
            <Member />
          </Page>

          <Redirect exact path='/fan-kit' to='/fan-kit/cards' />

          <Page path='/fan-kit/cards' active={['GAME', 'FAN_KIT', 'CARDS']}>
            <FanKitCards />
          </Page>

          <Page path='/fan-kit/books' active={['GAME', 'FAN_KIT', 'BOOKS']}>
            <FanKitBooks />
          </Page>

          {/*<Page
            path='/fan-kit/wallpapers'
            active={['GAME', 'FAN_KIT', 'WALLPAPERS']}
          >
            <FanKitWallpapers />
          </Page>*/}

          <Page
            path='/income-calculator'
            active={['TOOLS', 'INCOME_CALCULATOR']}
          >
            <IncomeCalculator />
          </Page>

          <Page path='/changelog/07-2020' active={['GAME', '07_2020']}>
            <ChangelogJuly2020 />
          </Page>

          <Page path='/changelog/09-2020' active={['GAME', '09_2020']}>
            <ChangelogSeptember2020 />
          </Page>

          <Page
            path='/changelog/releases'
            exact
            active={['GAME', 'RELEASE_NOTES']}
          >
            <ReleaseNotes />
          </Page>

          <Page path='/changelog/cards' exact active={['GAME', 'CARD_CHANGES']}>
            <Changelog />
          </Page>

          <Page path='/faq' active={['HOME', 'FAQ']}>
            <FAQ />
          </Page>

          <Page path='/donate' active={['HOME', 'DONATE']}>
            <Donate />
          </Page>

          <Page path='/tournaments/odd-even' active={['COMMUNITY', 'ODD_EVEN']}>
            <TournamentOddEven />
          </Page>

          <Page
            path='/tournaments/hall-of-fame'
            active={['COMMUNITY', 'HALL_OF_FAME']}
          >
            <TournamentHallOfFame />
          </Page>

          <Page path='/brewed-sages' active={['COMMUNITY', 'BREWED_SAGES']}>
            <BrewedSages />
          </Page>

          <Page exact path='/' active={['HOME', 'NEWS']}>
            <Home />
          </Page>

          <Page path='*'>
            <Error error='HTTP 404 — Not Found' />
          </Page>
        </Switch>
      </BrowserRouter>
    </AnimatePresence>
  )
}
