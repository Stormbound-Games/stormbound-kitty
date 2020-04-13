import React from 'react'
import copy from 'copy-to-clipboard'
import minifyUrl from '../helpers/minifyUrl'

const useShare = ({
  url = window.location.href,
  title = '',
  content = '',
  shortenURL = false,
} = {}) => {
  const [hasCopied, setHasCopied] = React.useState(false)

  const canUseShareAPI = React.useCallback(() => {
    const isShareAPISupported = typeof navigator.share === 'function'
    const isMobile = window.matchMedia('(max-width: 700px)').matches

    return isShareAPISupported && isMobile
  }, [])

  const getURL = React.useCallback(() => (!shortenURL ? url : minifyUrl(url)), [
    shortenURL,
    url,
  ])

  const copyToClipboard = React.useCallback(async () => {
    const url = await getURL()

    if (copy([content, url].filter(Boolean).join('\n'))) {
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 3000)
    }
  }, [content, getURL])

  const share = async () => {
    if (!canUseShareAPI()) return copyToClipboard()

    try {
      await navigator.share({ url: await getURL(), title, text: content })
    } catch (error) {
      if (error instanceof DOMException) {
        console.error(error.message)
      }

      await copyToClipboard()
    }
  }

  return { share, hasCopied, canUseShareAPI: canUseShareAPI() }
}

export default useShare
