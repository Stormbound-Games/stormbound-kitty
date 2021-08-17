import React from 'react'
import Page from '~/components/Page'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import MemberListEntry from '~/components/MemberListEntry'
import MemberTagYourself from '~/components/MemberTagYourself'
import Row from '~/components/Row'
import Select from '~/components/Select'
import chunk from '~/helpers/chunk'
import getMembersList from '~/helpers/getMembersList'

export default React.memo(function Members(props) {
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('*')
  const members = getMembersList()
    .filter(({ member }) => name === '' || member.toLowerCase().includes(name))
    .filter(({ type: cType }) => type === '*' || type === cType)
  const rows = chunk(members, 3)

  return (
    <Page
      title='Members'
      description='Find an index of all Stormbound-Kitty community members having contributed, one way or another, to the site with content'
    >
      <Row isDesktopOnly withWideGutter>
        <Row.Column width='1/3'>
          <p>
            Find on this page all contributing members to Stormbound-Kitty,
            whether implicitly or explicitly. Any player with any site
            contribution of any kind will figure on this list (guides, decks,
            puzzles, donations, card contests, tournaments…).
          </p>
          <p>
            Players marked with a star <Icon icon='star' /> are{' '}
            <abbr title='Kitty Appreciation Team'>KAT</abbr> members for having
            generously supported the site hence making it possible to actively
            keep working on it. Rare players marked with a shiny star{' '}
            <Icon icon='super-star' /> are Super KAT members for having issued{' '}
            <span className='Highlight'>multiple</span> donations!
          </p>
          <Row>
            <Row.Column>
              <Input
                label='Name'
                type='search'
                id='name'
                placeholder='e.g. Kitty'
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Row.Column>
            <Row.Column>
              <Select
                label='Type'
                id='type'
                value={type}
                onChange={event => setType(event.target.value)}
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

          <MemberTagYourself members={members.map(a => a.member)} />
        </Row.Column>
        <Row.Column width='2/3'>
          {rows.map(([a, b, c], index) => (
            <Row isDesktopOnly key={index}>
              <Row.Column width='1/3'>
                {a && <MemberListEntry key={a.member} member={a.member} />}
              </Row.Column>
              <Row.Column width='1/3'>
                {b && <MemberListEntry key={b.member} member={b.member} />}
              </Row.Column>
              <Row.Column width='1/3'>
                {c && <MemberListEntry key={c.member} member={c.member} />}
              </Row.Column>
            </Row>
          ))}
        </Row.Column>
      </Row>
    </Page>
  )
})
