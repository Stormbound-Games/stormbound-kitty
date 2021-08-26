import getRawCardData from '~/helpers/getRawCardData'

const isCardOfficial = cardId => Boolean(getRawCardData(cardId).name)

export default isCardOfficial
