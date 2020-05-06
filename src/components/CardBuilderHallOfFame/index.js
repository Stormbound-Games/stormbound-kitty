import React from 'react'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import HallOfFameTeaser from '../HallOfFameTeaser'
import Column from '../Column'
import Row from '../Row'
import Title from '../Title'
import chunk from '../../helpers/chunk'

export default React.memo(function CardBuilderHallOfFame(props) {
  const weeks = WEEKLY_CARD_CONTEST.filter(
    contest => !!contest.winner
  ).reverse()
  return (
    <div className='CardBuilderHallOfFame'>
      <Title>Hall of Fame</Title>

      {chunk(weeks, 3).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          <Column width='1/3'>
            {row[0] && (
              <HallOfFameTeaser
                {...row[0]}
                index={index * 3 + 0}
                description={weeks[index * 3 + 0].description}
              />
            )}
          </Column>
          <Column width='1/3'>
            {row[1] && (
              <HallOfFameTeaser
                {...row[1]}
                index={index * 3 + 1}
                description={weeks[index * 3 + 1].description}
              />
            )}
          </Column>
          <Column width='1/3'>
            {row[2] && (
              <HallOfFameTeaser
                {...row[2]}
                index={index * 3 + 2}
                description={weeks[index * 3 + 2].description}
              />
            )}
          </Column>
        </Row>
      ))}
    </div>
  )
})
