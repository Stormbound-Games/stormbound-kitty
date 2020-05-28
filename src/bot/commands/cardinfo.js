import getCardsForSearch from '../../helpers/getCardsForSearch'

export default search => {
  if (search.length === 0) return

  const results = getCardsForSearch(search)

  if (results.length === 0) return

  return results
    .map(card => 'https://stormbound-kitty.com/card/' + card.id)
    .slice(0, 2)
    .join('\n')
}
