import getRawCardData from '../getRawCardData'
import sortByMana from '../sortByMana'

const getDeckBuilderMetaTags = (deck, matchedDeck) => {
  const metaTags = {
    title: 'Deck Builder',
  }

  if (matchedDeck) {
    metaTags.title = `${matchedDeck.name} by ${matchedDeck.author}`
  }

  if (deck.length < 12) {
    metaTags.description = 'Compose your own deck.'
  } else {
    metaTags.description = deck
      .slice(0)
      .sort(sortByMana)
      .map(card => {
        return `${getRawCardData(card.id).name} (${card.level})`
      })
      .join(', ')
  }

  return metaTags
}

export default getDeckBuilderMetaTags
