const cellFormDialogAppear = {
  from: {
    opacity: 0,
    transform: 'translate(-50%, 5%) rotateX(10deg) scale(0.85)',
  },
  to: {
    opacity: 1,
    transform: 'translate(-50%, -5%) scale(0.85)',
  },
}

const container = {
  position: 'absolute',
}

const dialog = {
  position: 'absolute',
  transform: 'translateX(-50%)',
  animationName: cellFormDialogAppear,
  animationDuration: '400ms',
  boxShadow: '0 0 0 3px var(--dark-blue), 0 0 2em 1em rgba(0, 0, 0, 0.2)',
}

const body = {
  textAlign: 'initial',
}

const overlay = {
  backgroundColor: 'initial',
}

export default { container, dialog, body, overlay }
