import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()

  return {
    params: {},
    history: {
      push: router.push.bind(router),
      replace: router.replace.bind(router),
    },
    location: { pathname: router.asPath },
  }
}
