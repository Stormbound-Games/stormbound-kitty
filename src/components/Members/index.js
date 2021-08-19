import React from 'react'
import Page from '~/components/Page'
import Icon from '~/components/Icon'
import MemberListEntry from '~/components/MemberListEntry'
import MemberTagYourself from '~/components/MemberTagYourself'
import MembersSearchForm from '~/components/MembersSearchForm'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'

export default React.memo(function Members(props) {
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('*')
  const members = props.members
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

          <MembersSearchForm
            name={name}
            type={type}
            setName={setName}
            setType={setType}
          />
          <MemberTagYourself members={members.map(a => a.member)} />
        </Row.Column>
        <Row.Column width='2/3'>
          {rows.map(([a, b, c], index) => (
            <Row isDesktopOnly key={index}>
              <Row.Column width='1/3'>
                {a && <MemberListEntry key={a.member} {...a} />}
              </Row.Column>
              <Row.Column width='1/3'>
                {b && <MemberListEntry key={b.member} {...b} />}
              </Row.Column>
              <Row.Column width='1/3'>
                {c && <MemberListEntry key={c.member} {...c} />}
              </Row.Column>
            </Row>
          ))}
        </Row.Column>
      </Row>
    </Page>
  )
})
