const target = ({ isHidden }) => ({
  animationFillMode: 'forwards',
  animationDuration: '250ms',
  overflow: isHidden ? 'hidden' : 'visible',
  animationName: isHidden
    ? {
        from: { opacity: 1, maxHeight: '100vh' },
        to: { visibility: 'hidden', maxHeight: 0, opacity: 0 },
      }
    : {
        from: { opacity: 0, maxHeight: 0, overflow: 'hidden' },
        '99%': { maxHeight: '100vh' },
        to: { maxHeight: 'none', opacity: 1, overflow: 'visible' },
      },
})

const styles = { target }

export default styles
