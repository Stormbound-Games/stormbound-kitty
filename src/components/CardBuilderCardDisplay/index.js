import React from 'react'
import { useFela } from 'react-fela'
import { CollectionContext } from '~/components/CollectionProvider'
import Card from '~/components/Card'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import getRawCardData from '~/helpers/getRawCardData'
import isLevelAvailable from '~/helpers/isLevelAvailable'
import useRouter from '~/hooks/useRouter'
import styles from './styles'

export default React.memo(function CardBuilderCardDisplay(props) {
  const { css } = useFela()
  const { params } = useRouter()
  const [activeLevel, setActiveLevel] = React.useState(props.level || 1)
  const { hasDefaultCollection, indexedCollection } =
    React.useContext(CollectionContext)
  const cardInCollection =
    hasDefaultCollection || !params.cardId || props.mode === 'EDITOR'
      ? { level: 5 }
      : indexedCollection[params.cardId] || { level: 5 }

  return (
    <>
      <Only.Desktop>
        <Spacing bottom='LARGE'>
          <Row
            isDesktopOnly
            withWideGutter={
              // If rendering a card from the collection, use a wider gutter than
              // normal as the green highlight for available levels takes some
              // space around the cards.
              !!cardInCollection.id
            }
          >
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
              </Row.Column>
            ))}
          </Row>
        </Spacing>
      </Only.Desktop>
      <Only.Mobile>
        <Spacing horizontal='BASE' top='BASE'>
          <Card
            {...props}
            mana={props.mana.values[activeLevel - 1]}
            strength={props.strength.values[activeLevel - 1]}
            ability={props.ability.values[activeLevel - 1]}
            image={getRawCardData(props.imageCardId).image || props.imageURL}
            level={activeLevel}
          />

          {!props.hasSingleLevel && (
            <Spacing top='LARGER'>
              <Row>
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
