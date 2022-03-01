import React from 'react'
import Row from '~/components/Row'
import Select from '~/components/Select'
import useIsMounted from '~/hooks/useIsMounted'

const MembersSearchForm = props => {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <Row withNarrowGutter>
      <Row.Column>
        <Select
          label='Sort'
          id='sort'
          value={props.sort}
          onChange={event => props.setSort(event.target.value)}
        >
          <option value='ALPHABETICALLY'>Alphabetically</option>
          <option value='CONTRIBUTIONS'>By contributions</option>
        </Select>
      </Row.Column>
      <Row.Column></Row.Column>
    </Row>
  )
}

export default React.memo(MembersSearchForm)
