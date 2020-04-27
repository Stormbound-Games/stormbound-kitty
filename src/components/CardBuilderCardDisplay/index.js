import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import { RARITY_COPIES } from '../../constants/game'
import Card from '../Card'
import Column from '../Column'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const isLevelAvailable = (card, level) => {
  // If the card is missing from the collection, it means there are 0 extra
  // copies which means no level can be highlighted. Similarly, if the card is
  // already level 5, we can short-circuit the function.
  if (card.missing || card.level === 5) return false

  // Begin with all levels not being available, either because they have been
  // reached already, or because we don’t know yet whether they can be.
  const isLevelAvailable = [false, false, false, false, false]
  const { rarity } = getRawCardData(card.id)
  let { copies } = card

  // Go from the current card level (from 1 to 4) to 5, and check if we have
  // enough copies to reach the next missing level; deduct the number of copies
  // used for each level.
  for (let i = card.level; i < 5; i++) {
    let copiesForNextLevel = RARITY_COPIES[rarity].copies[i - 1]

    isLevelAvailable[i] = copies - copiesForNextLevel > 0
    copies -= copiesForNextLevel
  }

  return isLevelAvailable[level - 1]
}

export default React.memo(function CardBuilderCardDisplay(props) {
  const match = useRouteMatch()
  const [activeLevel, setActiveLevel] = React.useState(props.level || 1)
  const { hasDefaultCollection, collection } = React.useContext(
    CollectionContext
  )
  const cardInCollection =
    hasDefaultCollection || !match.params.cardId
      ? { level: 5 }
      : collection.find(card => card.id === match.params.cardId) || { level: 5 }

  return (
    <>
      <Only.Desktop>
        <div className='CardBuilderCardDisplay'>
          <Row
            desktopOnly
            wideGutter={
              // If rendering a card from the collection, use a wider gutter than
              // normal as the green highlight for available levels takes some
              // space around the cards.
              !!cardInCollection.id
            }
          >
            {[0, 1, 2, 3, 4].map(level => (
              <Column width='1/5' key={level}>
                <div
                  className={[
                    'CardBuilderApp__card',
                    props.hasSingleLevel &&
                      props.level !== level + 1 &&
                      'CardBuilderApp__card--irrelevant',
                    level + 1 === cardInCollection.level &&
                      'CardBuilderApp__card--current',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  data-testid={`card-preview-${level}`}
                >
                  <Card
                    {...props}
                    mana={props.mana.values[level]}
                    strength={props.strength.values[level]}
                    ability={props.ability.values[level]}
                    image={
                      getRawCardData(props.imageCardId).image || props.imageURL
                    }
                    missing={
                      cardInCollection.missing ||
                      level + 1 > cardInCollection.level
                    }
                    affordable={isLevelAvailable(cardInCollection, level + 1)}
                    level={level + 1}
                  />
                </div>
              </Column>
            ))}
          </Row>
        </div>
      </Only.Desktop>
      <Only.Mobile>
        <div className='CardBuilderApp__single-card'>
          <Card
            {...props}
            mana={props.mana.values[activeLevel - 1]}
            strength={props.strength.values[activeLevel - 1]}
            ability={props.ability.values[activeLevel - 1]}
            image={getRawCardData(props.imageCardId).image || props.imageURL}
            level={activeLevel}
          />

          {!props.hasSingleLevel && (
            <div className='CardBuilderCardDisplay__buttons'>
              <Row>
                <Column>
                  {activeLevel > 1 && (
                    <CTA
                      type='button'
                      onClick={() => setActiveLevel(l => l - 1)}
                    >
                      Level {activeLevel - 1}
                    </CTA>
                  )}
                </Column>
                <Column>
                  {activeLevel < 5 && (
                    <CTA
                      type='button'
                      onClick={() => setActiveLevel(l => l + 1)}
                    >
                      Level {activeLevel + 1}
                    </CTA>
                  )}
                </Column>
              </Row>
            </div>
          )}
        </div>
      </Only.Mobile>
    </>
  )
})
