import React from 'react'
import ResourceIcon from '../ResourceIcon'
import getCostForLevel from '../../helpers/getCostForLevel'
import getExtraAfterMax from '../../helpers/getExtraAfterMax'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

const CardUpgradeStats = props => {
  const card = resolveCardForLevel(props)

  if (card.level === 5) return null

  const extraAfterMax = getExtraAfterMax(card)

  return (
    <>
      {card.missing ? (
        <p>
          <span className='CardUpgradeStats__mark'>Crafting cost:</span>{' '}
          <ResourceIcon resource='STONE' /> {getCostForLevel(1)(card).stones}{' '}
          fusion stones.
        </p>
      ) : (
        [2, 3, 4, 5]
          .filter(level => card.level < level)
          .map(level => ({
            nextLevelCost: getCostForLevel(level)(card),
            level,
          }))
          .map(({ nextLevelCost, level }, index) => (
            <p key={level}>
              <span className='CardUpgradeStats__mark'>
                Upgrading cost for level {level}
                {index > 0 ? ' (including previous levels)' : ''}:{' '}
              </span>
              <ResourceIcon resource='COIN' /> {nextLevelCost.coins} coins
              {nextLevelCost.stones > 0 && (
                <>
                  {' '}
                  and <ResourceIcon resource='STONE' /> {nextLevelCost.stones}{' '}
                  fusion stones for {nextLevelCost.copies} missing{' '}
                  {nextLevelCost.copies > 1 ? 'copies' : 'copy'}
                </>
              )}
              .
            </p>
          ))
      )}

      {extraAfterMax.copies > 0 && (
        <p>
          Upgrading that card level 5 and exchanging the {extraAfterMax.copies}{' '}
          extra {extraAfterMax.copies > 1 ? 'copies' : 'copy'} would give you{' '}
          <ResourceIcon resource='COIN' /> {extraAfterMax.coins} coins,
          effectively reducing the upgrade cost to{' '}
          <ResourceIcon resource='COIN' />
          {Math.max(
            getCostForLevel(5)(card).coins - extraAfterMax.coins,
            0
          )}{' '}
          coins.
        </p>
      )}
    </>
  )
}

export default CardUpgradeStats
