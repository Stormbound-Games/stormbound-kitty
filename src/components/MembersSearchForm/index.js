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
      <Row.Column>
        <Select
          label='Type'
          id='type'
          value={props.type}
          onChange={event => props.setType(event.target.value)}
        >
          <option value='*'>Any</option>
          <option value='ARTWORK'>Artworks</option>
          <option value='CONTEST'>Card Contests</option>
          <option value='DECK'>Decks</option>
          <option value='DONATION'>Donations</option>
          <option value='GUIDE'>Guides</option>
          <option value='HOST'>Hosted Tournaments</option>
          <option value='PODIUM'>Podiums</option>
          <option value='PUZZLE'>Puzzles</option>
          <option value='STORY'>Stories</option>
          <option value='CONTRIBUTION'>Code Contributions</option>
        </Select>
      </Row.Column>
    </Row>
  )
}

export default React.memo(MembersSearchForm)
