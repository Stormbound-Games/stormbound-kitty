import React from 'react'
import Head from 'next/head'
import getRawCardData from '~/helpers/getRawCardData'

const Script = props => (
  <Head>
    <script type='application/ld+json'>{props.children}</script>
  </Head>
)

const getLogoData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://stormbound-kitty.com',
  logo: 'https://stormbound-kitty.com/assets/images/kitty.png',
})

const getTextFromTree = tree => {
  let text = ''

  if (typeof tree === 'string') {
    text += tree
  } else if (Array.isArray(tree)) {
    text += tree.map(getTextFromTree).join('')
  } else if (tree.children) {
    text += getTextFromTree(tree.children)
  } else if (tree.text) {
    text += tree.text
  }

  return text
}

const getFAQData = data => {
  const formattedEntries = data
    .flatMap(category => category.entries)
    .map(entry => {
      const answer = getTextFromTree(entry.answer)
      if (!answer) return null
      return {
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      }
    })
    .filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: formattedEntries,
  }
}

export default React.memo(function StructuredData(props) {
  try {
    switch (props.type) {
      case 'LOGO':
        return <Script>{JSON.stringify(getLogoData(props.data))}</Script>
      case 'FAQ':
        return <Script>{JSON.stringify(getFAQData(props.data))}</Script>
      default:
        return null
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('StructuredData', error)
    return null
  }
})
