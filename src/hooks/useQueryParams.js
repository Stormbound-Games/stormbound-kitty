import { useRouter } from 'next/router'

const useQueryParams = () => {
  const router = useRouter()
  const query = { ...router.query }

  // The `id` route parameter is used for tools which have an optional ID in
  // the URL (e.g. `/card` and `/card/:id`). In that case, the first argument is
  // the ID and can be provided through the hook for convenience.
  if (Array.isArray(query.id)) {
    query.id = query.id[0]
  }

  return query
}

export default useQueryParams
