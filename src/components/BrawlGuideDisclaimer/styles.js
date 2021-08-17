import styles from '~/components/HorizontalRule/styles'

const disclaimer = {
  color: 'var(--beige)',

  '::before': {
    ...styles.rule,
    content: '""',
    display: 'block',
    marginBottom: 'var(--s-large)',
  },

  '::after': {
    ...styles.rule,
    content: '""',
    display: 'block',
    marginTop: 'var(--s-large)',
  },
}

export default { disclaimer }
