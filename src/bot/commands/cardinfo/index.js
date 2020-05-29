import getCardsForSearch from '../../../helpers/getCardsForSearch'

export default search =>
  getCardsForSearch(search)
    .map(card => 'https://stormbound-kitty.com/card/' + card.id)
    .slice(0, 2)
    .join('\n') || undefined
