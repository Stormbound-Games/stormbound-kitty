import React from 'react'
import useLocalStorage from '~/hooks/useLocalStorage'

const useUser = (initialValue = null) =>
  useLocalStorage('sk.user', initialValue)

export default useUser
