const checkbox = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '2.5em',
  margin: 'var(--s-smaller) 0',
}

const icon = ({ isDisabled }) => ({
  width: '1.25em',
  height: '1.25em',
  border: '1px solid #ded7a480',
  transform: 'translate(25%, -50%) rotate(45deg)',
  display: 'inline-block',
  position: 'absolute',
  top: '50%',
  left: 0,
  opacity: isDisabled ? 0.5 : undefined,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
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

  ':checked + ::before': {
    content: '""',
    position: 'absolute',
    backgroundColor: 'var(--beige)',
    top: '20%',
    right: '20%',
    bottom: '20%',
    left: '20%',
  },

  // 1. Define the default browser outline on the icon itself so it looks like it
  //    can be focused.
  ':focus + *': {
    outline: ['auto 2px Highlight', 'auto 5px -webkit-focus-ring-color'], // 1
  },
}

const label = ({ isDisabled }) => ({
  opacity: isDisabled ? 0.5 : undefined,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
})

const styles = { checkbox, icon, input, label }

export default styles
