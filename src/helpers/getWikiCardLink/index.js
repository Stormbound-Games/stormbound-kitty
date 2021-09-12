const WIKI_URL = 'https://stormboundkingdomwars.fandom.com/wiki/'

const getWikiCardLink = name => {
  const path = name.toLowerCase().includes('token')
    ? 'Token_cards'
    : encodeURIComponent(name.replace(/\s/g, '_').replace(/’/g, "'"))

  return WIKI_URL + path
}

export default getWikiCardLink
