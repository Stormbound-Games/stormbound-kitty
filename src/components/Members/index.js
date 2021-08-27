import React from 'react'
import { useFela } from 'react-fela'
import Page from '~/components/Page'
import Icon from '~/components/Icon'
import MemberListEntry from '~/components/MemberListEntry'
import MemberTagYourself from '~/components/MemberTagYourself'
import MembersSearchForm from '~/components/MembersSearchForm'
import Row from '~/components/Row'
import styles from './styles'

export default React.memo(function Members(props) {
  const { css } = useFela()
  const [sort, setSort] = React.useState('ALPHABETICALLY')
  const [type, setType] = React.useState('*')
  const members = props.members
    .filter(({ type: cType }) => type === '*' || type === cType)
    .sort((a, b) => {
      if (sort === 'CONTRIBUTIONS') return b.count - a.count
      if (sort === 'ALPHABETICALLY') return a.member - b.member
      return 0
    })

  return (
    <Page
      title='Members'
      description='Find an index of all Stormbound-Kitty community members having contributed, one way or another, to the site with content'
    >
      <Row isDesktopOnly>
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
            sort={sort}
            type={type}
            setSort={setSort}
            setType={setType}
          />
          <MemberTagYourself members={members} />
        </Row.Column>
        <Row.Column width='2/3'>
          <ul className={css(styles.list)}>
            {members.map(member => (
              <li className={css(styles.item)} key={member.member}>
                <MemberListEntry {...member} />
              </li>
            ))}
          </ul>
        </Row.Column>
      </Row>
    </Page>
  )
})
