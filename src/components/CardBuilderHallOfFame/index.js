import React from 'react'
import BlankButton from '~/components/BlankButton'
import Icon from '~/components/Icon'
import Teasers from '~/components/Teasers'
import TogglableContent from '~/components/TogglableContent'
import Title from '~/components/Title'
import getRawCardData from '~/helpers/getRawCardData'
import serialisation from '~/helpers/serialisation'

export const getCardData = id => {
  const data = serialisation.card.deserialise(id)
  data.image = getRawCardData(data.imageCardId).image || data.imageURL
  data.strength = data.strength.values[0]
  data.mana = data.mana.values[0]
  data.ability = data.ability.values[0]
  data.level = 1
  return data
}

export const CardBuilderHallOfFameSeason = React.memo(
  function CardBuilderHallOfFameSeason(props) {
    const ITEMS = props.weeks.map(week => {
      const cardData = getCardData(week.winner.id)

      return {
        id: week.winner.id,
        card: cardData,
        title: 'Card by ' + week.winner.author,
        meta: `Week #${week.id} – ${week.name}`,
        to: `/card/${week.winner.id}/display`,
        excerpt: (
          <>
            <strong className='Highlight'>Ability:</strong> {cardData.ability}
          </>
        ),
      }
    })

    return <Teasers items={ITEMS} />
  }
)

export default React.memo(function CardBuilderHallOfFame(props) {
  const [statuses, setStatuses] = React.useState(
    props.seasons.map((_, index) => index === 0)
  )

  const updateAtIndex = React.useCallback(
    index => {
      const clone = statuses.slice(0)
      clone[index] = !statuses[index]
      return clone
    },
    [statuses]
  )

  return (
    <>
      <Title id='hall-of-fame'>Hall of Fame</Title>

      {props.seasons.map((season, index) => (
        <TogglableContent
          key={index}
          id={`season-${props.seasons.length - index}`}
          isExpanded={statuses[index]}
          renderToggle={toggleProps => (
            <h3>
              <BlankButton
                {...toggleProps}
                extend={{ textTransform: 'uppercase' }}
                onClick={() => setStatuses(() => updateAtIndex(index))}
              >
                <Icon
                  icon={statuses[index] ? 'arrow-down' : 'arrow-right'}
                  extend={{ transform: 'translateY(2px)', marginRight: '1ch' }}
                />{' '}
                Season {props.seasons.length - index} entries
              </BlankButton>
            </h3>
          )}
        >
          <CardBuilderHallOfFameSeason
            weeks={season.filter(week => !!week.winner)}
          />
        </TogglableContent>
      ))}
    </>
  )
})
