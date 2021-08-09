const article = {
  marginBottom: '6em',
}

/**
 * 1. Pull the meta content within the bottom spacing of the `HeaderBanner`
 *    component.
 */
const meta = {
  marginTop: '-2em' /* 1 */,
  textTransform: 'uppercase',
  color: 'var(--beige)',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '4em',
  textAlign: 'center',

  medium: {
    marginBottom: '6em',
    display: 'flex',
    fontSize: '120%',
    justifyContent: 'space-between',
  },
}

const action = {
  textDecoration: 'none',
  flex: '1 0 100%',
  marginTop: '0.5em',
  fontSize: '80%',
  textTransform: 'uppercase',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  ':not(:disabled):hover': {
    textDecoration: 'underline',
  },

  medium: {
    marginLeft: 'auto',
    flex: '0 0 auto',
    marginTop: 0,
    fontSize: '100%',
  },
}

const actionIcon = {
  marginRight: '1ch',
  position: 'relative',
  top: '0.2em',

  ':last-child': {
    marginLeft: '1ch',
    marginRight: 0,
  },
}

/**
 * 1. Historically, the site’s font size was set relatively small because it was
 *    mostly tools which required to display many things on screen at once such
 *    as the battle sim. However, as the site evolved, more and more content
 *    became text-based, such as stories, guides and over pages with a non-
 *    trivial amount of text content. The initial font size is no longer adequat
 *    and it’s too difficult/risky to increase it side-wide. Instead, most pages
 *    use the `Article` component as a main wrapper, which sets a larger font
 *    size. For pages which need to benefit from the `Article` layout but need
 *    the original small font size, the `smallFontSize` prop can be used.
 */
const content = ({ smallFontSize, noDropCap }) => ({
  hyphens: 'auto',
  fontSize: smallFontSize ? undefined : '125%' /* 1 */,
})

/**
 * 1. By default, the `Article` layout spreads across the entire 1200px width of
 *    the main container. However, when the context is mostly text-based, 1200px
 *    is too wide for comfortable reading. The `Article.Narrow` sub-component
 *    provides a narrower width adjusted to be reading length.
 * 2. This is a monstrosity, I know… `.Article__content` is the closest unique
 *    guaranteed container we have. Then, it should not have the `no-drop-cap`
 *    modifier. Then, find the first `.Article__narrow` (which is basically a
 *    text content container), then provided the first child is a paragraph,
 *    draw a drop-cap for first letter.
 */
const narrow = ({ withDropCap }) => ({
  maxWidth: '65ch' /* 1 */,
  margin: 'auto',

  ':first-child > p:first-child::first-letter': /* 2 */ withDropCap && {
    color: 'var(--beige)',
    float: 'left',
    fontFamily: 'Georgia, serif',
    fontSize: '81px',
    lineHeight: '60px',
    paddingTop: '8px',
    paddingRight: '8px',
    paddingLeft: '3px',
  },
})

const embed = {
  marginTop: '1.5em',
  marginBottom: '1.5em',

  medium: {
    marginTop: '3em',
    marginBottom: '3em',
  },
}

export default { article, meta, action, actionIcon, content, narrow, embed }
