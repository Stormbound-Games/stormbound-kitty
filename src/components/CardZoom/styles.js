const cardIn = {
  from: {
    opacity: 0,
    transform: 'translateY(-20%) rotateX(-40deg) rotateY(-20deg)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) rotateX(0deg) rotateY(0deg)',
  },
}

const overlay = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: '#00000099',
  animationName: { from: { opacity: 0 } },
  animationDuration: '0.5s',
  animationFillMode: 'both',
}

const wrapper = {
  width: '200px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  perspective: 1000,

  '> *': {
    animationName: cardIn,
    animationDuration: '0.75s',
    animationFillMode: 'both',
  },
}

const styles = { overlay, wrapper }

export default styles
