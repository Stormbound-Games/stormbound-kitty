import React from 'react'
import Row from '~/components/Row'
import Input from '~/components/Input'
import Select from '~/components/Select'
import useIsMounted from '~/hooks/useIsMounted'

const MembersSearchForm = props => {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <Row>
      <Row.Column>
        <Input
          label='Name'
          type='search'
          id='name'
          placeholder='e.g. Kitty'
          value={props.name}
          onChange={event => props.setName(event.target.value)}
        />
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
          <option value='CARD'>Card Contests</option>
          <option value='CONTRIBUTION'>Code Updates</option>
          <option value='DECK'>Decks</option>
          <option value='DONATION'>Donations</option>
          <option value='EVENT'>Events</option>
          <option value='GUIDE'>Guides</option>
          <option value='HOST'>Tournament Hosts</option>
          <option value='PODIUM'>Podiums</option>
          <option value='PUZZLE'>Puzzles</option>
          <option value='STORY'>Stories</option>
          <option value='VIDEO'>Videos</option>
        </Select>
      </Row.Column>
    </Row>
  )
}

export default React.memo(MembersSearchForm)
