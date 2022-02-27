import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import { Coins, Stones } from '~/components/Resource'
import getCostForLevel from '~/helpers/getCostForLevel'
import getExtraAfterMax from '~/helpers/getExtraAfterMax'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function CardUpgradeStats(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const card = getResolvedCardData(cardsIndex, props)

  if (card.level === 5) return null

  const extraAfterMax = getExtraAfterMax(card)

  return (
    <>
      {[1, 2, 3, 4, 5]
        .filter(level => card.missing || card.level < level)
        .map(level => ({
          nextLevelCost: getCostForLevel(level)(card),
          level,
        }))
        .map(({ nextLevelCost, level }, index) => (
          <p key={level}>
            <span className='Highlight'>
              {level === 1 ? 'Crafting' : 'Upgrading'} cost for level {level}
              {index > 0 ? ' (including previous levels)' : ''}:{' '}
            </span>
            {nextLevelCost.coins > 0 && (
              <>
                <Coins amount={nextLevelCost.coins} />
                {nextLevelCost.stones ? <> and </> : null}
              </>
            )}
            {nextLevelCost.stones > 0 && (
              <>
                <Stones amount={nextLevelCost.stones} /> for{' '}
                {nextLevelCost.copies} missing{' '}
                {nextLevelCost.copies > 1 ? 'copies' : 'copy'}
              </>
            )}
            .
          </p>
        ))}

      {extraAfterMax.copies > 0 && (
        <p>
          Upgrading that card level 5 and exchanging the {extraAfterMax.copies}{' '}
          extra {extraAfterMax.copies > 1 ? 'copies' : 'copy'} would give you{' '}
          <Coins amount={extraAfterMax.coins} />, effectively reducing the
          upgrade cost to{' '}
          <Coins
            amount={Math.max(
              getCostForLevel(5)(card).coins - extraAfterMax.coins,
              0
            )}
          />
          .
        </p>
      )}
    </>
  )
})
