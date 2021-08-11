import React from 'react'
import Select from 'react-select'
import { UserContext } from '../UserProvider'
import Info from '../Info'
import useSelectStyles from '../../hooks/useSelectStyles'

const UserSelect = props => {
  const styles = useSelectStyles({ withClear: true })

  return (
    <Select
      id='user-name'
      isClearable
      value={{ id: props.value, label: props.value }}
      onChange={props.onChange}
      options={props.options.map(value => ({ id: value, label: value }))}
      styles={styles}
    />
  )
}

export default React.memo(function MemberTagYourself(props) {
  const { name, setName } = React.useContext(UserContext)

  return (
    <Info icon='user' title='Tag yourself!'>
      <p>
        If you are a listed community member, you can tag yourself. By stating
        who you are, the site can sometimes highlight your content more
        conveniently and make it easier for you to navigate.
      </p>
      <UserSelect
        options={props.members}
        value={name}
        onChange={option => {
          setName(option?.id ?? null)
        }}
      />
    </Info>
  )
})
