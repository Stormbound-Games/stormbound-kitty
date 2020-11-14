import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import Card from '../Card'
import Column from '../Column'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'
import getRawCardData from '../../helpers/getRawCardData'
import isLevelAvailable from '../../helpers/isLevelAvailable'
import './index.css'

export default React.memo(function CardBuilderCardDisplay(props) {
  const match = useRouteMatch()
  const [activeLevel, setActiveLevel] = React.useState(props.level || 1)
  const { hasDefaultCollection, indexedCollection } = React.useContext(
    CollectionContext
  )
  const cardInCollection =
    hasDefaultCollection || !match.params.cardId || props.mode === 'EDITOR'
      ? { level: 5 }
      : indexedCollection[match.params.cardId] || { level: 5 }

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
                    upgradable={isLevelAvailable(cardInCollection, level + 1)}
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
