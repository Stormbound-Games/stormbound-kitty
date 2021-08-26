const getWikiCardLink = name =>
  'https://stormboundkingdomwars.fandom.com/' +
  encodeURIComponent(name.replace(/\s/g, '_').replace(/’/g, "'"))

export default getWikiCardLink
