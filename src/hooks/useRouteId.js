import { useRouter } from 'next/router'

const useRouteId = () => {
  const router = useRouter()
  const [id] = router.query.id || []

  return id
}

export default useRouteId
