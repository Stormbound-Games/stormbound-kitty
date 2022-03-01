import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import Label from '~/components/Label'
import Teasers from '~/components/Teasers'
import Title from '~/components/Title'
import { CardsContext } from '~/components/CardsProvider'
import microMarkdown from '~/helpers/microMarkdown'
import serialization from '~/helpers/serialization'
import styles from './styles'

export const getCardData = (cardsIndex, id) => {
  const data = serialization.card.deserialize(cardsIndex, id)
  data.image = cardsIndex[data.imageCardId]?.image ?? data.imageURL
  data.strength = data.strength.values[0]
  data.mana = data.mana.values[0]
  data.ability = data.ability.values[0]
  data.level = 1
  return data
}

export const CardBuilderHallOfFameSeason = React.memo(
  function CardBuilderHallOfFameSeason(props) {
    const { cardsIndex } = React.useContext(CardsContext)
    const ITEMS = props.weeks.map(week => {
      const cardData = getCardData(cardsIndex, week.winner.id)

      return {
        id: week.winner.id,
        card: cardData,
        title: 'Card by ' + week.winner.author,
        meta: `Week #${week.id} – ${week.name}`,
        to: `/card/${week.winner.id}/display`,
        excerpt: (
          <>
            <strong className='Highlight'>Ability:</strong>{' '}
            {microMarkdown(cardData.ability)}
          </>
        ),
      }
    })

    return <Teasers items={ITEMS} />
  }
)

export default React.memo(function CardBuilderHallOfFame(props) {
  const { css } = useFela()

  return (
    <>
      <Title id='hall-of-fame'>Hall of Fame</Title>

      {props.seasons.map((season, index) => (
        <details key={index} open={index == 0}>
          <summary className={css(styles.summary)}>
            <Label as='h3' extend={styles.title}>
              <Icon icon='sword' extend={styles.icon} />
              Season {props.seasons.length - index} entries
            </Label>
          </summary>

          <CardBuilderHallOfFameSeason
            weeks={season.weeks.filter(week => !!week.winner)}
          />
        </details>
      ))}
    </>
  )
})
