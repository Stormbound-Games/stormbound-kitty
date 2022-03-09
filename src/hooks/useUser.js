import React from 'react'
import useLocalStorage from '~/hooks/useLocalStorage'

const useUser = (initialValue = null) => {
  const [name, setName] = useLocalStorage('sk.user_name', initialValue)
  const [user, setUser] = useLocalStorage('sk.user', initialValue)

  React.useEffect(() => {
    if (name && !user) {
      setUser({ name, slug: name.replace(/\s/g, '').toLowerCase() })
      setName(null)
    }
    // eslint-disable-next-line
  }, [name, user])

  return [user, setUser]
}

export default useUser
