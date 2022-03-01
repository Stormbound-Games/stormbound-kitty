import { BRAWLS } from '~/constants/brawl'
import { CATEGORIES as GUIDE_CATEGORIES } from '~/constants/guides'
import { STORY_CATEGORIES } from '~/constants/stories'
import getCards from '~/api/cards/getCards'
import getDecks from '~/api/decks/getDecks'
import getGuides from '~/api/guides/getGuides'
import getStories from '~/api/stories/getStories'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getReleases from '~/api/releases/getReleases'

const getSearchIndex = async (withEverything = true) => {
  const cards = await getCards()
  const decks = await getDecks()
  const guides = await getGuides()
  const stories = await getStories()
  const puzzles = await getPuzzles()
  const releases = await getReleases()
  const seasons = await getSWCCSeasons()
  const users = await getUsers()
  const links = []
  const limit = withEverything ? Infinity : 1

  links.push({
    label: 'News',
    path: '/',
    breadcrumbs: ['Home'],
  })

  links.push({
    label: 'About',
    path: '/about',
    breadcrumbs: ['Home'],
  })

  links.push({
    label: 'Brawl Tracker',
    path: '/brawl',
    breadcrumbs: ['Your Content'],
  })

  BRAWLS.slice(0, limit).forEach(brawl => {
    const slug = brawl.id.replace(/_/g, '-').toLowerCase()
    links.push({
      label: brawl.label,
      path: '/brawl/' + slug,
      breadcrumbs: ['Your Content'],
    })
  })

  links.push({
    label: 'Brewed Sages Podcast',
    path: '/brewed-sages',
    breadcrumbs: ['Community', 'Discover'],
  })

  links.push({
    label: 'Books Calculator',
    path: '/calculators/books',
    breadcrumbs: ['Tools', 'Calculators'],
  })

  links.push({
    label: 'Brawl Calculator',
    path: '/calculators/brawl',
    breadcrumbs: ['Tools', 'Calculators'],
  })

  links.push({
    label: 'Income Calculator',
    path: '/calculators/income',
    breadcrumbs: ['Tools', 'Calculators'],
  })

  links.push({
    label: 'Value Calculator',
    path: '/calculators/value',
    breadcrumbs: ['Tools', 'Calculators'],
  })

  links.push({
    label: 'Hero Calculator',
    path: '/calculators/hero',
    breadcrumbs: ['Tools', 'Calculators'],
  })

  links.push({
    label: 'Card Builder',
    path: '/card',
    breadcrumbs: ['Tools', 'Builders'],
  })

  cards.slice(0, limit).forEach(card => {
    links.push({
      label: card.name,
      path: `/card/${card.id}/display`,
      breadcrumbs: ['Tools', 'Card Builder', 'Display'],
    })
  })

  seasons
    .map(season => season.weeks)
    .flat()
    .slice(0, limit)
    .forEach(contest => {
      links.push({
        label: 'SWCC #' + contest.id + ' ' + contest.name,
        path: `/card/${contest.winner.id}/display`,
        breadcrumbs: ['Community', 'Contests'],
      })
    })

  links.push({
    label: 'Weekly Card Contest',
    path: '/card/contest',
    breadcrumbs: ['Community', 'Contests'],
  })

  links.push({
    label: 'Card Statistics',
    path: '/card/stats',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Card Changelog',
    path: '/changelog',
    breadcrumbs: ['Official', 'Updates'],
  })

  links.push({
    label: 'Card Collection',
    path: '/collection',
    breadcrumbs: ['Your Content'],
  })

  links.push({
    label: 'Card Collection Statistics',
    path: '/collection/stats',
    breadcrumbs: ['Your Content'],
  })

  links.push({
    label: 'Deck Builder',
    path: '/deck',
    breadcrumbs: ['Tools', 'Builders'],
  })

  decks.slice(0, limit).forEach(deck => {
    links.push({
      label: deck.name,
      path: `/deck/${deck.id}/detail`,
      breadcrumbs: ['Tools', 'Builders', 'Detail'],
    })

    links.push({
      label: deck.name,
      path: `/deck/${deck.id}`,
      breadcrumbs: ['Tools', 'Builders', 'Editor'],
    })
  })

  links.push({
    label: 'Deck Collection',
    path: '/deck/collection',
    breadcrumbs: ['Your Content'],
  })

  links.push({
    label: 'Featured Decks',
    path: '/deck/featured',
    breadcrumbs: ['Community', 'Meta'],
  })

  links.push({
    label: 'Fan Art',
    path: '/fan-art',
    breadcrumbs: ['Community', 'Discover'],
  })

  links.push({
    label: 'Fan-Kit',
    path: '/fan-kit',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Fan-Kit Avatars',
    path: '/fan-kit/avatars',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Fan-Kit Books',
    path: '/fan-kit/books',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Fan-Kit Cards',
    path: '/fan-kit/cards',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Fan-Kit Desktop Wallpapers',
    path: '/fan-kit/wallpapers/desktop',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Fan-Kit Mobile Wallpapers',
    path: '/fan-kit/wallpapers/mobile',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({ label: 'FAQ', path: '/faq', breadcrumbs: ['Home'] })

  Object.keys(GUIDE_CATEGORIES)
    .slice(0, limit)
    .forEach(name => {
      const category = GUIDE_CATEGORIES[name]
      links.push({
        label: category.name.long,
        path: '/guides/' + category.slug,
        breadcrumbs: ['Guides'],
      })
    })

  // Always test all guides because they are all different.
  guides.forEach(guide => {
    links.push({
      label: guide.name,
      path: '/guides/' + guide.slug,
      breadcrumbs: ['Guides', GUIDE_CATEGORIES[guide.category].name.short],
    })
  })

  links.push({
    label: 'Known Bugs',
    path: '/known-bugs',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'Lexicon',
    path: '/lexicon',
    breadcrumbs: ['Official', 'Information'],
  })

  links.push({
    label: 'List Builder',
    path: '/list',
    breadcrumbs: ['Tools', 'Builders'],
  })

  links.push({
    label: 'Equals List',
    path: '/list/equals',
    breadcrumbs: ['Community', 'Meta'],
  })

  links.push({
    label: 'Ranked List',
    path: '/list/ranked',
    breadcrumbs: ['Community', 'Meta'],
  })

  links.push({
    label: 'Members',
    path: '/members',
    breadcrumbs: ['Community', 'Discover'],
  })

  users.slice(0, limit).forEach(user => {
    links.push({
      label: user.name,
      path: '/members/' + user.slug,
      breadcrumbs: ['Community', 'Discover'],
    })
  })

  links.push({
    label: 'Quest Builder',
    path: '/quest',
    breadcrumbs: ['Tools', 'Builders'],
  })

  links.push({
    label: 'Releases',
    path: '/releases',
    breadcrumbs: ['Official', 'Updates'],
  })

  // Always test all releases because they are all different.
  releases.forEach(release => {
    links.push({
      label: release.title,
      path: '/releases/' + release.slug,
      breadcrumbs: ['Official', 'Updates'],
    })
  })

  links.push({
    label: 'Battle Simulator',
    path: '/simulators/battle',
    breadcrumbs: ['Tools', 'Simulators'],
  })

  puzzles.slice(0, limit).forEach(puzzle => {
    links.push({
      label: puzzle.name,
      path: `/simulators/battle/${puzzle.board}/display`,
      breadcrumbs: ['Community', 'Contest'],
    })
  })

  links.push({
    label: 'Puzzles',
    path: '/simulators/battle/puzzles',
    breadcrumbs: ['Community', 'Contest'],
  })

  links.push({
    label: 'Books Simulator',
    path: '/simulators/books',
    breadcrumbs: ['Tools', 'Simulators'],
  })

  links.push({
    label: 'Draft Simulator',
    path: '/simulators/draft',
    breadcrumbs: ['Tools', 'Simulators'],
  })

  links.push({
    label: 'Stories',
    path: '/stories',
    breadcrumbs: ['Stories'],
  })

  Object.keys(STORY_CATEGORIES)
    .slice(0, limit)
    .forEach(category => {
      links.push({
        label: STORY_CATEGORIES[category].title,
        path: '/stories/' + category,
        breadcrumbs: ['Stories'],
      })
    })

  stories.slice(0, limit).forEach(story => {
    links.push({
      label: story.title,
      path: `/stories/${story.slug}`,
      breadcrumbs: ['Stories', STORY_CATEGORIES[story.category].title],
    })
  })

  links.push({
    label: 'Tournaments Hall of Fame',
    path: '/tournaments/hall-of-fame',
    breadcrumbs: ['Community', 'Contests'],
  })

  links.push({
    label: 'Trivia Game',
    path: '/trivia',
    breadcrumbs: ['Community', 'Contests'],
  })

  links.push({
    label: 'YouTube Channels',
    path: '/videos',
    breadcrumbs: ['Community', 'Discover'],
  })

  return links
}

export default getSearchIndex
