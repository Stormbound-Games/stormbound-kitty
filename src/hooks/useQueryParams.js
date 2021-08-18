import { useRouter } from 'next/router'
import querystring from 'querystring'

const useQueryParams = () => {
  const router = useRouter()
  const query = {
    ...router.query,
    ...querystring.parse(router.asPath.split('?')[1]),
  }

  // The `rest` route parameter is used for tools which have an optional ID in
  // the URL (e.g. `/card` and `/card/:id`). In that case, the first argument is
  // the ID and can be provided through the hook for convenience.
  if (typeof router.query.rest !== 'undefined') {
    query.id = router.query.rest[0]
  }

  return query
}

export default useQueryParams
