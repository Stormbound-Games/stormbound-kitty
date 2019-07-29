import React from 'react'
import copy from 'copy-to-clipboard'
import minifyUrl from '../../helpers/minifyUrl'

export default class Share extends React.Component {
  static defaultProps = {
    shortenURL: false
  }

  state = {
    hasCopied: false
  }

  canUseShareAPI = () => {
    const isShareAPISupported = typeof navigator.share === 'function'
    const isMobile = window.matchMedia('(max-width: 700px)').matches

    return isShareAPISupported && isMobile
  }

  getURL = () => {
    if (!this.props.shortenURL) {
      return this.props.url
    }

    return minifyUrl(this.props.url)
  }

  copyToClipboard = async () => {
    const url = await this.getURL()
    const content = [this.props.content, url].filter(Boolean).join('\n')

    if (copy(content)) {
      this.setState({ hasCopied: true }, () => {
        setTimeout(() => this.setState({ hasCopied: false }), 3000)
      })
    }
  }

  share = async () => {
    if (!this.canUseShareAPI()) {
      return this.copyToClipboard()
    }

    try {
      const payload = {
        url: await this.getURL(),
        title: this.props.title,
        text: this.props.content
      }

      await navigator.share(payload)
    } catch (error) {
      if (error instanceof DOMException) {
        console.error(error.message)
      }

      await this.copyToClipboard()
    }
  }

  render() {
    return this.props.children({
      share: this.share,
      canUseShareAPI: this.canUseShareAPI(),
      hasCopied: this.state.hasCopied
    })
  }
}
