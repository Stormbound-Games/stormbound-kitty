import React from 'react'
import Card from '../Card'
import CTA from '../CTA'
import Row from '../Row'
import Column from '../Column'
import getRawCardData from '../../helpers/getRawCardData'
import useViewportWidth from '../../helpers/useViewportWidth'
import './index.css'

const CBCardDisplay = props => {
  const viewportWidth = useViewportWidth()
  const [activeLevel, setActiveLevel] = React.useState(props.level || 1)

  if (viewportWidth >= 700) {
    return (
      <Row desktopOnly>
        {[0, 1, 2, 3, 4].map(level => (
          <Column width={20} key={level}>
            <div
              className={[
                'CBApp__card',
                props.hasSingleLevel &&
                  props.level !== level + 1 &&
                  'CBApp__card--irrelevant',
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
    )
  }

  return (
    <div>
      <Card
        {...props}
        mana={props.mana.values[activeLevel - 1]}
        strength={props.strength.values[activeLevel - 1]}
        ability={props.ability.values[activeLevel - 1]}
        image={getRawCardData(props.imageCardId).image || props.imageURL}
        level={activeLevel}
      />

      {!props.hasSingleLevel && (
        <div className='CBCardDisplay__buttons'>
          <Row>
            <Column>
              {activeLevel > 1 && (
                <CTA type='button' onClick={() => setActiveLevel(l => l - 1)}>
                  Level {activeLevel - 1}
                </CTA>
              )}
            </Column>
            <Column>
              {activeLevel < 5 && (
                <CTA type='button' onClick={() => setActiveLevel(l => l + 1)}>
                  Level {activeLevel + 1}
                </CTA>
              )}
            </Column>
          </Row>
        </div>
      )}
    </div>
  )
}

export default CBCardDisplay
