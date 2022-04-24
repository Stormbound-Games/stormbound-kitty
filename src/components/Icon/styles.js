const icon = ({ type }) => ({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  stroke: 'currentcolor',
  fill: 'currentcolor',

  // 1. The ‘sword’ icon is in fact a ‘pipette’ icon that needs to be rotated so
  //    it does look like a sword.
  transform:
    type === 'sword'
      ? 'rotate(90deg)'
      : type === 'super-star'
      ? 'translateY(1px) scale(1.3)'
      : undefined, // 1
})

const styles = { icon }

export default styles
