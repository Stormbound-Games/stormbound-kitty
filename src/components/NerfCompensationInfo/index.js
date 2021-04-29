import React from 'react'
import Info from '../Info'
import ResourceIcon from '../ResourceIcon'
import { RARITIES } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import getRawCardData from '../../helpers/getRawCardData'
import toSentence from '../../helpers/toSentence'

const COMPENSATION = {
  common: [
    [0, 0],
    [10, 0],
    [20, 1],
    [50, 2],
    [120, 5],
  ],
  rare: [
    [0, 0],
    [15, 2],
    [30, 3],
    [90, 7],
    [190, 10],
  ],
  epic: [
    [0, 0],
    [15, 2],
    [40, 5],
    [120, 10],
    [250, 20],
  ],
  legendary: [
    [0, 1],
    [20, 5],
    [50, 10],
    [150, 20],
    [300, 50],
  ],
}

const LevelCompensation = ({ level, coins, stones }) => {
  if (coins === 0 && stones === 0) return null

  return (
    <>
      {coins > 0 && (
        <>
          <ResourceIcon resource='COIN' />
          &nbsp;
          {coins}
        </>
      )}
      {coins > 0 && stones > 0 && ' and '}
      {stones > 0 && (
        <>
          <ResourceIcon resource='STONE' />
          &nbsp;
          {stones}
        </>
      )}{' '}
      at level {level}
      {level !== 5 && ', '}
    </>
  )
}

export default React.memo(function NerfCompensationInfo(props) {
  const ids = props.ids || []
  const cards = ids ? ids.map(getRawCardData) : []
  const rarities = ids ? cards.map(card => card.rarity) : Object.keys(RARITIES)
  const names = cards.map(card => card.name)

  return (
    <Info icon='heart' title='Nerf compensation'>
      <p>
        As usual, some compensation in the form of coins and fusion stones will
        be provided to owners of{' '}
        {ids ? toSentence(names, 'and') : 'nerfed cards'}, proportional to the
        level and rarity of the card. Find below the compensation values for
        each rarity and level.
      </p>
      <ul style={{ marginBottom: 0 }}>
        {Object.keys(COMPENSATION)
          .filter(rarity => rarities.includes(rarity))
          .map(rarity => (
            <li key={rarity}>
              <ResourceIcon resource={rarity.toUpperCase()} />
              &nbsp; {capitalise(rarity)} card:{' '}
              {COMPENSATION[rarity].reduce((acc, level, index) => {
                return (
                  <>
                    {acc}
                    <LevelCompensation
                      coins={level[0]}
                      stones={level[1]}
                      level={index + 1}
                    />
                  </>
                )
              }, null)}
            </li>
          ))}
      </ul>
    </Info>
  )
})
