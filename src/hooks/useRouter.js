import { useRouteMatch, useHistory, useLocation } from 'react-router-dom'

const useRouter = () => {
  const { params } = useRouteMatch()
  const history = useHistory()
  const location = useLocation()

  return { params, history, location }
}

export default useRouter
