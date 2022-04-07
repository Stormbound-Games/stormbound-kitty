const radio = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '2.5em',
  margin: 'var(--s-smaller) 0',
  color: 'currentcolor',
}

/**
 * 1. Arbitrary translate to align the radio icon with its accompanying label.
 */
const icon = ({ isDisabled }) => ({
  width: '1.25em',
  height: '1.25em',
  border: '1px solid var(--dark-beige)',
  transform: 'translate(25%, -50%) rotate(45deg)' /* 1 */,
  display: 'inline-block',
  position: 'absolute',
  borderRadius: '0.25em',
  cursor: 'pointer',
  top: '50%',
  left: 0,

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

const input = {
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  cursor: 'pointer',

  /**
   * 1. Define the default browser outline on the icon itself so it looks like it
   *    can be focused.
   */
  ':focus + *': {
    outline: [
      'auto 2px Highlight',
      'auto 5px -webkit-focus-ring-color',
    ] /* 1 */,
  },

  ':checked + *::before': {
    content: '""',
    position: 'absolute',
    backgroundColor: 'var(--beige)',
    top: '20%',
    right: '20%',
    bottom: '20%',
    left: '20%',
  },
}

const label = ({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : undefined })

const styles = { radio, icon, input, label }

export default styles
