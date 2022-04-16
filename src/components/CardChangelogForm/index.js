import React from 'react'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Title from '~/components/Title'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function CardChangelogForm(props) {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <>
      <Title>Filters</Title>
      <Row withNarrowGutter>
        <Row.Column>
          <Select
            label='Sort by'
            id='sorting'
            value={props.sorting}
            onChange={event => props.setSorting(event.target.value)}
          >
            <option value='DATE'>Date</option>
            <option value='CARD'>Card</option>
          </Select>
        </Row.Column>
        <Row.Column>
          <Select
            label='Change type'
            id='type'
            value={props.type}
            onChange={event => props.setType(event.target.value)}
          >
            <option value='*'>Any</option>
            <option value='BUFF'>Buff</option>
            <option value='INFO'>Info</option>
            <option value='MIXED'>Mixed</option>
            <option value='NERF'>Nerf</option>
          </Select>
        </Row.Column>
      </Row>
    </>
  )
})
