import getCardsForSearch from '../../helpers/getCardsForSearch'

export default content => {
  const search = content.replace('!cardinfo', '').trim()

  if (search.length === 0) return

  const results = getCardsForSearch(search)

  if (results.length === 0) return

  return results
    .map(card => 'https://stormbound-kitty.com/card/' + card.id)
    .slice(0, 2)
    .join('\n')
}
