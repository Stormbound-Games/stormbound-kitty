import { createRenderer } from 'fela'
import embedded from 'fela-plugin-embedded'
import extend from 'fela-plugin-extend'
import enforceLongHands from 'fela-enforce-longhands'
import sortClassNames from 'fela-sort-classnames'
import sortMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first'
import responsiveValue from 'fela-plugin-responsive-value'
import namedKeys from 'fela-plugin-named-keys'
import fallback from 'fela-plugin-fallback-value'
import { BREAKPOINTS } from '~/constants/styles'

const toObject = (acc, prop) => ({ ...acc, [prop]: true })

const getMediaQueries = values => {
  if (values.length === 2) return [BREAKPOINTS.medium.query]
}

// prettier-ignore
const responsiveProperties = [
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
]

function createFelaRenderer() {
  return createRenderer({
    optimizeCaching: true,
    plugins: [
      extend(),
      embedded(),
      responsiveValue(
        getMediaQueries,
        responsiveProperties.reduce(toObject, {})
      ),
      namedKeys({
        medium: BREAKPOINTS.medium.query,
        small: BREAKPOINTS.small.query,
      }),
      fallback(),
    ],
    enhancers: [
      sortClassNames(),
      sortMediaQueryMobileFirst(),
      enforceLongHands(),
    ],
    keyframePrefixes: [],
    filterClassName: className =>
      !'ad,ads,adv,bi,fb,ig,pin,tw,vk'.split(',').includes(className),
  })
}

export default createFelaRenderer
