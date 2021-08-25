const row = ({ isDesktopOnly }) => ({
  display: 'flex',
  marginLeft: 'calc(var(--s-base) * -1)',
  marginRight: 'calc(var(--s-base) * -1)',

  /**
   * 1. If the row is “desktop only”, it should be treated as a column on mobile.
   */
  small: isDesktopOnly
    ? {
        flexDirection: 'column' /* 1 */,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,

        ':empty': { marginBottom: 0 },
      }
    : undefined,
})

const column = ({ align, isDesktopOnly }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: align,
  paddingLeft: 'var(--s-base)',
  paddingRight: 'var(--s-base)',
  transition: '250ms',
  flex: '1 0 calc(100% / var(--columns) * var(--spread, 1))',

  small: isDesktopOnly
    ? { flex: '1 1 100%', paddingLeft: 0, paddingRight: 0 }
    : undefined,
})

const styles = { row, column }

export default styles
