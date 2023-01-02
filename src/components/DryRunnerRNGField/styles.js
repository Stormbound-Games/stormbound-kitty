const info = {
  color: 'var(--beige)',
  display: 'block',
}

const infoInner = {
  display: 'block',

  // 1. Make sure links can be hovered to trigger the tooltip.
  '> a': {
    isolation: 'isolate' /* 1 */,
  },
}

const styles = { info, infoInner }

export default styles
