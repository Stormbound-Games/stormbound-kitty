import React from 'react'
import copy from 'copy-to-clipboard'
import minifyUrl from '~/helpers/minifyUrl'
import track from '~/helpers/track'

const useShare = ({
  processURL = url => url,
  title = '',
  content = '',
  shortenURL = false,
} = {}) => {
  const [hasCopied, setHasCopied] = React.useState(false)

  const canUseShareAPI = React.useCallback(() => {
    if (typeof navigator === 'undefined') return false

    const isShareAPISupported = typeof navigator.share === 'function'
    const isMobile = window.matchMedia('(max-width: 700px)').matches

    return isShareAPISupported && isMobile
  }, [])

  const getURL = React.useCallback(() => {
    // If is important `window.location.href` is read when calling `getURL` and
    // not on mount otherwise the URL might have been updated between reading it
    // and trying to share it.
    const url = processURL(window.location.href)

    return !shortenURL ? url : minifyUrl(url)
  }, [processURL, shortenURL])

  const copyToClipboard = React.useCallback(async () => {
    const url = await getURL()

    if (copy([content, url].filter(Boolean).join('\n'))) {
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 3000)
    }
  }, [content, getURL])

  const share = async () => {
    track('page_share', { url: processURL(window.location.href) })

    if (!canUseShareAPI()) return copyToClipboard()

    try {
      await navigator.share({ url: await getURL(), title, text: content })
    } catch (error) {
      if (error instanceof DOMException) {
        // eslint-disable-next-line
        console.error(error.message)
      }

      await copyToClipboard()
    }
  }

  return { share, hasCopied, canUseShareAPI: canUseShareAPI() }
}

export default useShare
