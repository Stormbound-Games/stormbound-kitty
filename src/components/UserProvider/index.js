import React from 'react'

export const UserContext = React.createContext({})

const getStoredName = () => {
  try {
    return localStorage.getItem('sk.user_name')
  } catch {
    return null
  }
}

const storeName = name => {
  try {
    localStorage.setItem('sk.user_name', name)
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
