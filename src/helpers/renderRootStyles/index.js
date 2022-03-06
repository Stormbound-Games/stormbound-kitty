import { SPACING_TOKENS } from '~/constants/styles'

const renderRootStyles = renderer => {
  renderer.renderFont('Nunito', ['/assets/fonts/nunito-700.woff2'], {
    fontDisplay: 'swap',
    localAlias: ['Nunito'],
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  })

  renderer.renderFont('Nunito', ['/assets/fonts/nunito-900.woff2'], {
    fontWeight: 'bold',
    fontDisplay: 'swap',
    localAlias: ['Nunito', 'Nunito Bold', 'Nunito-Bold'],
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  })

  renderer.renderStatic(
    {
      boxSizing: 'border-box',
    },
    '*'
  )

  renderer.renderStatic(
    {
      margin: 0,
      fontFamily:
        "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      backgroundImage: "url('/assets/images/background.png')",
      backgroundRepeat: 'repeat',
      backgroundColor: '#101f26',
      color: 'var(--white)',
    },
    'body'
  )

  renderer.renderStatic(
    {
      scrollPaddingTop: '2em',

      // Game colors
      '--beige': '#e2d7af',
      '--dark-beige': '#9b8e70',
      '--light-blue': '#2e5662',
      '--dark-blue': '#20353f',
      '--green': '#36786d',
      '--black': '#101f26',
      '--white': '#f5f2e5',
      '--yellow': '#d0b84c',

      // Faction colors
      '--neutral': '#4e5659',
      '--swarm': '#604830',
      '--ironclad': '#824648',
      '--shadowfen': '#30655d',
      '--winter': '#405477',
      '--light-swarm': '#b89571',
      '--light-ironclad': '#b6787a',
      '--light-shadowfen': '#56afa1',
      '--light-winter': '#6680ad',

      // Card colors
      '--affordable': '#6be79c',
      '--upgradable': '#e7d146',

      // Battle sim colors
      '--player-red': '#cb2b43',
      '--player-blue': '#195d9c',
      '--poison': '#700470',
      '--freeze': '#60adc7',
      '--confused': '#c59948',
      '--vitalized': '#24e071',
      '--disabled': '#a52086',

      // League colors
      '--starter': 'currentcolor',
      '--iron': '#d3d1cc',
      '--bronze': '#e2c3b7',
      '--silver': '#d6d9e2',
      '--gold': '#f1e0be',
      '--platinum': '#c0e0cf',
      '--diamond': '#c8c0df',
      '--heroes': '#caf9ff',

      // Rarity colors
      '--common': '#f5f1e5',
      '--common-bright': '#97927b',
      '--rare': '#95d7f9',
      '--rare-bright': '#1faee0',
      '--epic': '#dba8f5',
      '--epic-bright': '#c45de6',
      '--legendary': '#f5c79f',
      '--legendary-bright': '#e88931',

      // Spacing variables
      '--s-smallest': SPACING_TOKENS.SMALLEST,
      '--s-smaller': SPACING_TOKENS.SMALLER,
      '--s-small': SPACING_TOKENS.SMALL,
      '--s-base': SPACING_TOKENS.BASE,
      '--s-large': SPACING_TOKENS.LARGE,
      '--s-larger': SPACING_TOKENS.LARGER,
      '--s-largest': SPACING_TOKENS.LARGEST,
    },
    ':root'
  )

  renderer.renderStatic(
    {
      minHeight: '100%',
      overflowX: 'hidden',
    },
    'html'
  )

  renderer.renderStatic(
    {
      font: 'inherit',
    },
    'button'
  )

  renderer.renderStatic(
    {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
    },
    'html, body, #__next'
  )

  renderer.renderStatic(
    {
      display: 'none !important',
    },
    '[hidden]'
  )

  renderer.renderStatic(
    {
      marginTop: 0,
      marginBottom: 'var(--s-base)',
    },
    'p'
  )

  // This will hide the focus indicator if the element receives focus via the
  // mouse, but it will still show up on keyboard focus.
  renderer.renderStatic(
    {
      outline: 'none',
    },
    '.js-focus-visible :focus:not(.focus-visible)'
  )

  renderer.renderStatic(
    {
      color: 'var(--black)',
    },
    'option'
  )

  renderer.renderStatic(
    {
      padding: 0,
      margin: 0,
      border: 0,
    },
    'fieldset'
  )

  renderer.renderStatic(
    {
      color: 'var(--beige)',
      fontWeight: 'normal',
    },
    '.Highlight'
  )

  renderer.renderStatic(
    {
      color: 'var(--beige)',
      fontSize: '110%',
    },
    'code'
  )

  renderer.renderStatic(
    {
      borderBottom: '1px dotted',
      textDecoration: 'none',
      cursor: 'help',
    },
    'abbr[title]'
  )

  renderer.renderStatic(
    {
      cursor: 'pointer',
      borderBottom: '1px solid transparent',
      display: 'inline-block',
      transition: '250ms',
    },
    'summary'
  )

  renderer.renderStatic(
    {
      display: 'none',
    },
    'summary::-webkit-details-marker'
  )

  renderer.renderStatic(
    {
      color: 'var(--beige)',
      borderBottomColor: 'currentcolor',
    },
    'summary:hover'
  )

  renderer.renderStatic(
    {
      color: 'var(--beige)',
    },
    '.EditorialContent p:not([class]) strong, .EditorialContent li:not([class]) strong'
  )

  renderer.renderStatic(
    {
      color: 'var(--beige)',
      marginTop: 'var(--s-large)',
    },
    '.EditorialContent h3:not([class])'
  )

  renderer.renderStatic(
    {
      marginTop: 'var(--s-smaller)',
      marginBottom: 0,
    },
    '.EditorialContent ol ul:not([class])'
  )

  renderer.renderStatic(
    {
      padding: 0,
      listStylePosition: 'inside',
    },
    '.EditorialContent ol:not([class]), .EditorialContent ul:not([class])'
  )

  renderer.renderStatic(
    {
      paddingLeft: '1.2em',
      textIndent: '-1.2em',
      marginBottom: 'var(--s-smaller)',
    },
    '.EditorialContent ol li:not([class])'
  )

  renderer.renderStatic(
    {
      paddingLeft: '1em',
      textIndent: '-1em',
      marginBottom: 'var(--s-smaller)',
    },
    '.EditorialContent ul li:not([class])'
  )

  renderer.renderStatic(
    {
      marginTop: 'var(--s-smaller)',
      marginBottom: 0,
    },
    '.EditorialContent li ul'
  )
}

export default renderRootStyles
