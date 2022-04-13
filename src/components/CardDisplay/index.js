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

export default React.memo(function CardDisplay(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const [activeLevel, setActiveLevel] = React.useState(props.level || 1)
  const { indexedCollection } = React.useContext(CollectionContext)
  const isOfficial = props.id in cardsIndex
  const cardInCollection = indexedCollection[props.id] || { level: 5 }

  return (
    <>
      <Only.Desktop>
        <Spacing bottom='LARGE'>
          <Row isDesktopOnly>
            {[0, 1, 2, 3, 4].map(level => {
              const isIrrelevant =
                props.hasSingleLevel && props.level !== level + 1
              const isMissing = isOfficial
                ? cardInCollection.missing || level + 1 > cardInCollection.level
                : false
              const isUpgradable = isOfficial
                ? isLevelAvailable(cardsIndex, cardInCollection, level + 1)
                : false

              return (
                <Row.Column width='1/5' key={level}>
                  <div
                    className={css(styles.card({ isIrrelevant }))}
                    data-testid={`card-preview-${level}`}
                  >
                    <Card
                      {...props}
                      containerWidth={220}
                      mana={props.mana.values[level]}
                      strength={props.strength.values[level]}
                      ability={props.ability.values[level]}
                      image={
                        cardsIndex[props.imageCardId]?.image ?? props.imageURL
                      }
                      missing={isMissing}
                      upgradable={isUpgradable}
                      level={level + 1}
                    />
                  </div>
                </Row.Column>
              )
            })}
          </Row>
        </Spacing>
      </Only.Desktop>
      <Only.Mobile>
        <Spacing vertical='LARGER'>
          <Card
            {...props}
            key={activeLevel}
            containerWidth={400}
            mana={props.mana.values[activeLevel - 1]}
            strength={props.strength.values[activeLevel - 1]}
            ability={props.ability.values[activeLevel - 1]}
            image={cardsIndex[props.imageCardId]?.image ?? props.imageURL}
            level={activeLevel}
          />
          {!props.hasSingleLevel && (
            <Spacing top='LARGE'>
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
