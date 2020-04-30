import React from 'react'
import Column from '../Column'
import Row from '../Row'
import StoryTeaser from '../StoryTeaser'
import chunk from '../../helpers/chunk'

export default React.memo(function Stories(props) {
  return chunk(props.stories, props.columns).map((row, index) => (
    <Row key={index} desktopOnly wideGutter>
      {Array.from({ length: props.columns }, (_, index) => (
        <Column
          key={index}
          width={props.columns === 2 ? undefined : `1/${props.columns}`}
        >
          {row[index] && <StoryTeaser {...row[index]} />}
        </Column>
      ))}
    </Row>
  ))
})
