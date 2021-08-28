import useLocalStorage from '~/hooks/useLocalStorage'

const useMemberName = (initialValue = null) => {
  const [name, setName] = useLocalStorage('sk.user_name', initialValue)

  return [name, setName]
}

export default useMemberName
