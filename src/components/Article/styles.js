const article = {
  marginBottom: 'var(--s-largest)',
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
const content = ({ smallFontSize }) => ({
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

export default { article, content, narrow }
