const WIKI_URL = 'https://stormboundkingdomwars.fandom.com/wiki/'

const getWikiCardLink = cardData => {
  // Normalize the card name to match the Wiki’s naming conventions.
  const name = cardData.name.replace(/\s/g, '_').replace(/’/g, "'")

  // Token cards do not have individual pages on the Wiki, but there is a page
  // discussing token cards overall.
  return WIKI_URL + (cardData.token ? 'Token_cards' : encodeURIComponent(name))
}

export default getWikiCardLink
