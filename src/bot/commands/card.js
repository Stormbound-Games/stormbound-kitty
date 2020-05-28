import getCardsForSearch from '../../helpers/getCardsForSearch'

export default content => {
  const search = content.replace('!card', '').trim()

  if (search.length === 0) return

  const results = getCardsForSearch(search)

  if (results.length === 0) {
    return 'Meeooow… Sorry, I could not find a card matching this search term. :sob:'
  }

  return results
    .map(card => 'https://stormbound-kitty.com/card/' + card.id)
    .slice(0, 2)
    .join('\n')
}
