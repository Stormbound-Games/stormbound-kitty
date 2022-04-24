// 1. Simulate a reflection with a sharp split gradient.
const quest = {
  border: '1px solid var(--beige)',
  position: 'relative',
  width: '100%',
  backgroundImage:
    'linear-gradient(45deg, var(--dark-blue) 50%, var(--light-blue) 50%)', // 1
  marginTop: 'var(--s-smallest)',
  marginBottom: 'var(--s-large)',
  fontSize: 'var(--fontSize)',

  // 1. Force a specific ratio for the quest box, regardless of its width.
  '::before': {
    content: '""',
    paddingTop: 'calc(112 / 264 * 100%)', // 1
    display: 'block',
  },
}

// 1. Simulate a double border by having a tiny gap between the container and
//    the element, and the same border on both.
const inner = {
  position: 'absolute',
  top: '0.1em', // 1
  left: '0.1em', // 1
  right: '0.1em', // 1
  bottom: '0.1em', // 1
  border: 'inherit', // 1
  padding: '1em',
  display: 'flex',
}

const difficulty = {
  position: 'absolute',
  display: 'flex',
  left: '50%',
  top: 0,
  transform: 'translate(-50%, -50%) translateY(-2px)',
}

const difficultyDiamond = ({ level }) => ({
  border: '1px solid var(--beige)',
  width: '1em',
  height: '1em',
  transform: 'rotate(45deg)',
  margin: '0 0.3em',
  backgroundColor: ['#256a9c', '#85299a', '#e79312'][level - 1],
})

const content = {
  flex: '0 0 65%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
}

const name = {
  textTransform: 'uppercase',
  fontSize: '130%',
}

const description = {
  color: 'var(--beige)',
  margin: 0,
  wordBreak: 'break-word',
  fontSize: '90%',
}

const reward = {
  flex: '1 0 35%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const amount = {
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: 1.1,
  textTransform: 'uppercase',
}

const currencyImage = {
  maxWidth: '4em',
  display: 'block',
  height: 'auto',
  margin: '0 auto 1em',
}

const number = {
  fontSize: '150%',
}

const currency = {
  fontSize: '70%',
}

const styles = {
  quest,
  inner,
  difficulty,
  difficultyDiamond,
  content,
  name,
  description,
  reward,
  amount,
  currencyImage,
  number,
  currency,
}

export default styles
