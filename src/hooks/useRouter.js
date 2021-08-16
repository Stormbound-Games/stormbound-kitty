import querystring from 'querystring'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const query = {
    ...router.query,
    ...querystring.parse(router.asPath.split('?')[1]),
  }

  return {
    push: router.push.bind(router),
    replace: router.replace.bind(router),

    params: {},
    query,
    history: {
      push: router.push.bind(router),
      replace: router.replace.bind(router),
    },
    location: { pathname: router.asPath },
  }
}
