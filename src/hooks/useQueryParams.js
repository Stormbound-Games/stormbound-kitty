import { useRouter } from 'next/router'
import querystring from 'querystring'

const useQueryParams = () => {
  const router = useRouter()

  return {
    ...router.query,
    ...querystring.parse(router.asPath.split('?')[1]),
  }
}

export default useQueryParams
