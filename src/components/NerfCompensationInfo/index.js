import React from 'react'
import { useFela } from 'react-fela'
import Info from '~/components/Info'
import ResourceIcon from '~/components/ResourceIcon'
import { Coins, Stones } from '~/components/Resource'
import { RARITIES } from '~/constants/game'
import capitalise from '~/helpers/capitalise'
import getRawCardData from '~/helpers/getRawCardData'
import toSentence from '~/helpers/toSentence'

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
      {coins > 0 && <Coins amount={coins} />}
      {coins > 0 && stones > 0 && ' and '}
      {stones > 0 && <Stones amount={stones} />} at level {level}
      {level !== 5 && ', '}
    </>
  )
}

export default React.memo(function NerfCompensationInfo(props) {
  const { css } = useFela()
  const ids = props.ids || []
  const cards = ids.length > 0 ? ids.map(getRawCardData) : []
  const rarities =
    ids.length > 0 ? cards.map(card => card.rarity) : Object.keys(RARITIES)
  const names = cards.map(card => card.name)

  return (
    <Info
      icon='heart'
      title={props.title || 'Nerf compensation'}
      spacing={props.spacing || { vertical: 'LARGE' }}
    >
      <p>
        As usual, some compensation in the form of coins and fusion stones will
        be provided to owners of{' '}
        {ids ? toSentence(names, 'and') : 'nerfed cards'}, proportional to the
        level and rarity of the card. Find below the compensation values for
        each rarity and level.
      </p>
      <ul
        className={css({
          marginBottom: 0,
          listStyleType: 'none',
          padding: 0,
        })}
      >
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
              .
            </li>
          ))}
      </ul>
    </Info>
  )
})
