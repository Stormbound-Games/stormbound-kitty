import React from 'react'

export const UserContext = React.createContext({})

const getStoredName = () => {
  try {
    const name = localStorage.getItem('sk.user_name')
    // Workaround for a serialisation bug where `null` would get stored as a
    // string in localStorage.
    return name === 'null' ? null : name
  } catch {
    return null
  }
}

const storeName = name => {
  try {
    if (name) {
      localStorage.setItem('sk.user_name', name)
    } else {
      localStorage.removeItem('sk.user_name')
    }
  } catch {}
}

export default React.memo(function UserProvider(props) {
  const [name, setName] = React.useState(getStoredName())

  React.useEffect(() => storeName(name), [name])

  return (
    <UserContext.Provider value={{ name, setName }}>
      {props.children}
    </UserContext.Provider>
  )
})
