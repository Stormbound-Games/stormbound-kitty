import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import Card from '../Card'
import Column from '../Column'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const CardBuilderCardDisplay = props => {
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
        <Row desktopOnly>
          {[0, 1, 2, 3, 4].map(level => (
            <Column width={20} key={level}>
              <div
                className={[
                  'CardBuilderApp__card',
                  props.hasSingleLevel &&
                    props.level !== level + 1 &&
                    'CardBuilderApp__card--irrelevant',
                  (cardInCollection.missing ||
                    level + 1 > cardInCollection.level) &&
                    'CardBuilderApp__card--missing',
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
                  level={level + 1}
                />
              </div>
            </Column>
          ))}
        </Row>
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
}

export default CardBuilderCardDisplay
