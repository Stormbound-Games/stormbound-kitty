import React from 'react'
import { Helmet } from 'react-helmet-async'

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

export default React.memo(function StructuredData(props) {
  try {
    switch (props.type) {
      case 'LOGO':
        return <Script>{JSON.stringify(getLogoData())}</Script>
      default:
        return null
    }
  } catch (error) {
    console.error('StructuredData', error)
    return null
  }
})
