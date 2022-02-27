import React from 'react'
import { useFela } from 'react-fela'
import { CollectionContext } from '~/components/CollectionProvider'
import { CardsContext } from '~/components/CardsProvider'
import Card from '~/components/Card'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import isLevelAvailable from '~/helpers/isLevelAvailable'
import styles from './styles'

export default React.memo(function CardBuilderCardDisplay(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const cardId = props.id
  const [activeLevel, setActiveLevel] = React.useState(props.level || 1)
  const { hasDefaultCollection, indexedCollection } =
    React.useContext(CollectionContext)
  const cardInCollection =
    hasDefaultCollection || !cardId || props.mode === 'EDITOR'
      ? { level: 5 }
      : indexedCollection[cardId] || { level: 5 }

  return (
    <>
      <Only.Desktop>
        <Spacing bottom='LARGE'>
          <Row isDesktopOnly>
            {[0, 1, 2, 3, 4].map(level => (
              <Row.Column width='1/5' key={level}>
                <div
                  className={css(
                    styles.card({
                      isIrrelevant:
                        props.hasSingleLevel && props.level !== level + 1,
                    })
                  )}
                  data-testid={`card-preview-${level}`}
                >
                  <Card
                    {...props}
                    containerWidth={220}
                    mana={props.mana.values[level]}
                    strength={props.strength.values[level]}
                    ability={props.ability.values[level]}
                    image={
                      cardsIndex[props.imageCardId].image || props.imageURL
                    }
                    missing={
                      cardInCollection.missing ||
                      level + 1 > cardInCollection.level
                    }
                    upgradable={isLevelAvailable(
                      cardsIndex,
                      cardInCollection,
                      level + 1
                    )}
                    level={level + 1}
                  />
                </div>
              </Row.Column>
            ))}
          </Row>
        </Spacing>
      </Only.Desktop>
      <Only.Mobile>
        <Spacing top='BASE'>
          <Card
            {...props}
            containerWidth={400}
            mana={props.mana.values[activeLevel - 1]}
            strength={props.strength.values[activeLevel - 1]}
            ability={props.ability.values[activeLevel - 1]}
            image={cardsIndex[props.imageCardId].image || props.imageURL}
            level={activeLevel}
          />

          {!props.hasSingleLevel && (
            <Spacing top='LARGER'>
              <Row withNarrowGutter>
                <Row.Column>
                  {activeLevel > 1 && (
                    <CTA
                      type='button'
                      onClick={() => setActiveLevel(l => l - 1)}
                    >
                      Level {activeLevel - 1}
                    </CTA>
                  )}
                </Row.Column>
                <Row.Column>
                  {activeLevel < 5 && (
                    <CTA
                      type='button'
                      onClick={() => setActiveLevel(l => l + 1)}
                    >
                      Level {activeLevel + 1}
                    </CTA>
                  )}
                </Row.Column>
              </Row>
            </Spacing>
          )}
        </Spacing>
      </Only.Mobile>
    </>
  )
})
