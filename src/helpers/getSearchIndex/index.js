import { CATEGORIES as GUIDE_CATEGORIES } from '~/constants/guides'
import { STORY_CATEGORIES } from '~/constants/stories'
import getBrawls from '~/api/brawls/getBrawls'
import getCards from '~/api/cards/getCards'
import getDecks from '~/api/decks/getDecks'
import getGuides from '~/api/guides/getGuides'
import getPages from '~/api/pages/getPages'
import getStories from '~/api/stories/getStories'
import getSWCCContests from '~/api/swcc/getSWCCContests'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getReleases from '~/api/releases/getReleases'
import getUsers from '~/api/users/getUsers'

const getSearchIndex = async () => {
  const brawls = await getBrawls()
  const cards = await getCards()
  const decks = await getDecks()
  const guides = await getGuides()
  const stories = await getStories()
  const pages = await getPages()
  const puzzles = await getPuzzles()
  const releases = await getReleases()
  const swcc = await getSWCCContests()
  const users = await getUsers()
  const links = []
  const seasons = [...new Set(swcc.map(contest => contest.season))].sort()

  links.push({
    label: 'News',
    path: '/',
    breadcrumbs: ['Home'],
    icon: 'home',
  })

  pages.map(page => {
    links.push({
      label: page.title,
      path: '/' + page.slug,
      ...page.search,
    })
  })

  links.push({
    label: 'Contribute',
    path: '/contribute',
    breadcrumbs: ['Home'],
    icon: 'gift',
  })

  links.push({
    label: 'Brawl Tracker',
    path: '/brawl',
    breadcrumbs: ['Your Content'],
    icon: 'crown',
  })

  brawls.forEach(brawl => {
    links.push({
      label: brawl.name,
      path: '/brawl/' + brawl.slug,
      breadcrumbs: ['Your Content', 'Brawl Tracker'],
      icon: 'crown',
    })
  })

  links.push({
    label: 'Brewed Sages Podcast',
    path: '/brewed-sages',
    breadcrumbs: ['Community', 'Discover'],
    icon: 'users',
  })

  links.push({
    label: 'Books Calculator',
    path: '/calculators/books',
    breadcrumbs: ['Tools', 'Calculators'],
    icon: 'equalizer',
  })

  links.push({
    label: 'Brawl Calculator',
    path: '/calculators/brawl',
    breadcrumbs: ['Tools', 'Calculators'],
    icon: 'equalizer',
  })

  links.push({
    label: 'Income Calculator',
    path: '/calculators/income',
    breadcrumbs: ['Tools', 'Calculators'],
    icon: 'equalizer',
  })

  links.push({
    label: 'Value Calculator',
    path: '/calculators/value',
    breadcrumbs: ['Tools', 'Calculators'],
    icon: 'equalizer',
  })

  links.push({
    label: 'Hero Calculator',
    path: '/calculators/hero',
    breadcrumbs: ['Tools', 'Calculators'],
    icon: 'equalizer',
  })

  links.push({
    label: 'Card Builder',
    path: '/card',
    breadcrumbs: ['Tools', 'Builders'],
    icon: 'hammer',
  })

  cards.forEach(card => {
    links.push({
      label: card.name,
      path: `/card/official/${card.id}`,
      breadcrumbs: ['Official', 'Information'],
      icon: 'stack',
    })
  })

  swcc.forEach(contest => {
    links.push({
      label: `SWCC S${contest.season}W${contest.week} ${contest.name}`,
      path: `/swcc/season/${contest.season}/week/${contest.week}`,
      breadcrumbs: ['Community', 'Contests', 'SWCC'],
      icon: 'trophy',
    })
  })

  links.push({
    label: 'Weekly Card Contest',
    path: '/swcc',
    breadcrumbs: ['Community', 'Contests'],
    icon: 'trophy',
  })

  seasons.map(season =>
    links.push({
      label: 'SWCC Season ' + season,
      path: '/swcc/season/' + season,
      breadcrumbs: ['Community', 'Contests', 'SWCC'],
      icon: 'trophy',
    })
  )

  links.push({
    label: 'Statistics',
    path: '/stats',
    breadcrumbs: ['Official', 'Information'],
    icon: 'stack',
  })

  links.push({
    label: 'Card Changelog',
    path: '/changelog',
    breadcrumbs: ['Official', 'Updates'],
    icon: 'bullhorn',
  })

  links.push({
    label: 'Card Collection',
    path: '/collection',
    breadcrumbs: ['Your Content'],
    icon: 'stack',
  })

  links.push({
    label: 'Card Collection Statistics',
    path: '/collection/stats',
    breadcrumbs: ['Your Content'],
    icon: 'stack',
  })

  links.push({
    label: 'Deck Builder',
    path: '/deck',
    breadcrumbs: ['Tools', 'Builders'],
    icon: 'stack',
  })

  decks.forEach(deck => {
    links.push({
      label: deck.name,
      path: `/deck/${deck.id}/detail`,
      breadcrumbs: ['Tools', 'Builders', 'Detail'],
      icon: 'stack',
    })

    links.push({
      label: deck.name,
      path: `/deck/${deck.id}`,
      breadcrumbs: ['Tools', 'Builders', 'Editor'],
      icon: 'stack',
    })
  })

  links.push({
    label: 'Bookmarked Decks',
    path: '/decks/bookmarks',
    breadcrumbs: ['Your Content'],
    icon: 'stack',
  })

  links.push({
    label: 'Featured Decks',
    path: '/decks',
    breadcrumbs: ['Community', 'Meta'],
    icon: 'stack',
  })

  links.push({
    label: 'Fan Art',
    path: '/fan-art',
    breadcrumbs: ['Community', 'Discover'],
    icon: 'image',
  })

  links.push({
    label: 'Fan-Kit',
    path: '/fan-kit',
    breadcrumbs: ['Official', 'Information'],
    icon: 'image',
  })

  links.push({
    label: 'Fan-Kit Avatars',
    path: '/fan-kit/avatars',
    breadcrumbs: ['Official', 'Information'],
    icon: 'image',
  })

  links.push({
    label: 'Fan-Kit Books',
    path: '/fan-kit/books',
    breadcrumbs: ['Official', 'Information'],
    icon: 'image',
  })

  links.push({
    label: 'Fan-Kit Cards',
    path: '/fan-kit/cards',
    breadcrumbs: ['Official', 'Information'],
    icon: 'image',
  })

  links.push({
    label: 'Fan-Kit Desktop Wallpapers',
    path: '/fan-kit/wallpapers/desktop',
    breadcrumbs: ['Official', 'Information'],
    icon: 'image',
  })

  links.push({
    label: 'Fan-Kit Mobile Wallpapers',
    path: '/fan-kit/wallpapers/mobile',
    breadcrumbs: ['Official', 'Information'],
    icon: 'image',
  })

  Object.keys(GUIDE_CATEGORIES).forEach(name => {
    const category = GUIDE_CATEGORIES[name]
    links.push({
      label: category.name.long,
      path: '/guides/' + category.slug,
      breadcrumbs: ['Guides'],
      icon: 'compass',
    })
  })

  guides.forEach(guide => {
    links.push({
      label: guide.name,
      path: '/guides/' + guide.slug,
      breadcrumbs: ['Guides', GUIDE_CATEGORIES[guide.category].name.short],
      icon: 'compass',
    })
  })

  links.push({
    label: 'Lexicon',
    path: '/lexicon',
    breadcrumbs: ['Official', 'Information'],
    icon: 'library',
  })

  links.push({
    label: 'List Builder',
    path: '/list',
    breadcrumbs: ['Tools', 'Builders'],
    icon: 'hammer',
  })

  links.push({
    label: 'Equals List',
    path: '/tier-list/equals',
    breadcrumbs: ['Community', 'Meta'],
    icon: 'star',
  })

  links.push({
    label: 'Ranked List',
    path: '/tier-list/ranked',
    breadcrumbs: ['Community', 'Meta'],
    icon: 'star',
  })

  links.push({
    label: 'Members',
    path: '/members',
    breadcrumbs: ['Community', 'Discover'],
    icon: 'users',
  })

  users.forEach(user => {
    links.push({
      label: user.name,
      path: '/members/' + user.slug,
      breadcrumbs: ['Community', 'Discover'],
      icon: 'users',
    })
  })

  links.push({
    label: 'Quest Builder',
    path: '/quest',
    breadcrumbs: ['Tools', 'Builders'],
    icon: 'hammer',
  })

  links.push({
    label: 'Releases',
    path: '/releases',
    breadcrumbs: ['Official', 'Updates'],
    icon: 'bullhorn',
  })

  releases.forEach(release => {
    links.push({
      label: release.title,
      path: '/releases/' + release.slug,
      breadcrumbs: ['Official', 'Updates'],
      icon: 'bullhorn',
    })
  })

  links.push({
    label: 'Battle Simulator',
    path: '/simulators/battle',
    breadcrumbs: ['Tools', 'Simulators'],
    icon: 'wand',
  })

  puzzles.forEach(puzzle => {
    links.push({
      label: puzzle.name,
      path: `/puzzles/${puzzle.slug}`,
      breadcrumbs: ['Community', 'Contest'],
      icon: 'trophy',
    })
  })

  links.push({
    label: 'Puzzles',
    path: '/puzzles',
    breadcrumbs: ['Community', 'Contest'],
    icon: 'trophy',
  })

  links.push({
    label: 'Books Simulator',
    path: '/simulators/books',
    breadcrumbs: ['Tools', 'Simulators'],
    icon: 'wand',
  })

  links.push({
    label: 'Draft Simulator',
    path: '/simulators/draft',
    breadcrumbs: ['Tools', 'Simulators'],
    icon: 'wand',
  })

  links.push({
    label: 'Stories',
    path: '/stories',
    breadcrumbs: ['Stories'],
    icon: 'quill',
  })

  Object.keys(STORY_CATEGORIES).forEach(category => {
    links.push({
      label: STORY_CATEGORIES[category].title,
      path: '/stories/' + category,
      breadcrumbs: ['Stories'],
      icon: 'quill',
    })
  })

  stories.forEach(story => {
    links.push({
      label: story.title,
      path: `/stories/${story.slug}`,
      breadcrumbs: ['Stories', STORY_CATEGORIES[story.category].title],
      icon: 'quill',
    })
  })

  links.push({
    label: 'Tournaments Hall of Fame',
    path: '/tournaments/hall-of-fame',
    breadcrumbs: ['Community', 'Contests'],
    icon: 'trophy',
  })

  links.push({
    label: 'Trivia Game',
    path: '/trivia',
    breadcrumbs: ['Community', 'Contests'],
    icon: 'trophy',
  })

  links.push({
    label: 'YouTube Channels',
    path: '/videos',
    breadcrumbs: ['Community', 'Discover'],
    icon: 'youtube',
  })

  return links
}

export default getSearchIndex
