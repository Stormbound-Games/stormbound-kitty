import React from 'react'
import dynamic from 'next/dynamic'
import Info from '~/components/Info'
import useSelectStyles from '~/hooks/useSelectStyles'
import useIsMounted from '~/hooks/useIsMounted'
import useUser from '~/hooks/useUser'

const Select = dynamic(() => import('react-select'), { ssr: false })

const UserSelect = props => {
  const styles = useSelectStyles({ withClear: true })
  const [user, setUser] = useUser()

  return (
    <Select
      id='user-name'
      isClearable
      value={user ? { value: user.slug, label: user.name } : null}
      onChange={option =>
        setUser(option ? { name: option.label, slug: option.value } : null)
      }
      options={props.members.map(user => ({
        value: user.slug,
        label: user.name,
        rarity:
          user.role === 'SUPER_KAT'
            ? 'epic'
            : user.role === 'KAT'
            ? 'rare'
            : 'common',
      }))}
      styles={styles}
    />
  )
}

export default React.memo(function MemberTagYourself(props) {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <Info icon='user' title='Tag yourself!'>
      <p>
        If you are a listed community member, you can tag yourself. By stating
        who you are, the site can sometimes highlight your content more
        conveniently and make it easier for you to navigate.
      </p>
      <UserSelect members={props.members} />
    </Info>
  )
})
