const row = ({ isDesktopOnly, withNarrowGutter }) => ({
  display: 'flex',
  flexDirection: isDesktopOnly ? 'column' : 'row',
  marginLeft: isDesktopOnly ? 0 : 'calc(var(--s-smaller) * -1)',
  marginRight: isDesktopOnly ? 0 : 'calc(var(--s-smaller) * -1)',

  ':empty': isDesktopOnly ? { marginBottom: 0 } : {},

  medium: {
    flexDirection: 'row',
    marginLeft: `calc(var(--s-${withNarrowGutter ? 'smaller' : 'base'}) * -1)`,
    marginRight: `calc(var(--s-${withNarrowGutter ? 'smaller' : 'base'}) * -1)`,
  },
})

const column = ({ align, isDesktopOnly, withNarrowGutter }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: isDesktopOnly
    ? '1 1 100%'
    : '1 0 calc(100% / var(--columns) * var(--spread, 1))',
  alignItems: align,
  paddingLeft: isDesktopOnly ? 0 : 'var(--s-smaller)',
  paddingRight: isDesktopOnly ? 0 : 'var(--s-smaller)',
  transition: '250ms',

  medium: {
    paddingLeft: `var(--s-${withNarrowGutter ? 'smaller' : 'base'})`,
    paddingRight: `var(--s-${withNarrowGutter ? 'smaller' : 'base'})`,
    flex: '1 0 calc(100% / var(--columns) * var(--spread, 1))',
  },
})

const styles = { row, column }

export default styles
