import React from 'react'
import dynamic from 'next/dynamic'
import Info from '~/components/Info'
import useSelectStyles from '~/hooks/useSelectStyles'
import useIsMounted from '~/hooks/useIsMounted'
import useMemberName from '~/hooks/useMemberName'

const Select = dynamic(() => import('react-select'), { ssr: false })

const UserSelect = props => {
  const styles = useSelectStyles({ withClear: true })

  return (
    <Select
      id='user-name'
      isClearable
      value={{ id: props.value, label: props.value }}
      onChange={props.onChange}
      options={props.members.map(user => ({
        value: user.name,
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
  const [name, setName] = useMemberName()

  if (!isMounted) return null

  return (
    <Info icon='user' title='Tag yourself!'>
      <p>
        If you are a listed community member, you can tag yourself. By stating
        who you are, the site can sometimes highlight your content more
        conveniently and make it easier for you to navigate.
      </p>
      <UserSelect
        members={props.members}
        value={name}
        onChange={option => {
          setName(option?.value ?? null)
        }}
      />
    </Info>
  )
})
