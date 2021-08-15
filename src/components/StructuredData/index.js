import React from 'react'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../data/faq'
import getRawCardData from '../../helpers/getRawCardData'

const Script = props => (
  <Helmet>
    <script type='application/ld+json'>{props.children}</script>
  </Helmet>
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
  } else if (tree.props.children) {
    text += getTextFromTree(tree.props.children)
  } else if (tree.props.id) {
    const card = getRawCardData(tree.props.id)
    if (card) text += card.name
  }

  return text
}

const getFAQData = () => {
  const formattedEntries = FAQ.map(category => category.entries)
    .reduce((a, b) => a.concat(b), [])
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
        return <Script>{JSON.stringify(getLogoData())}</Script>
      case 'FAQ':
        return <Script>{JSON.stringify(getFAQData())}</Script>
      default:
        return null
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('StructuredData', error)
    return null
  }
})
