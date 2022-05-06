// 1. `1.5em` is a magic number that gives enough space on both sides to render
//    the backgrounds. Safari needs 1px less… :eye-roll:
const cta = ({ isDisabled, isFullWidthOnMobile }) => ({
  display: 'inline-flex',
  padding: '0 calc(1.5em - 1px)', // 1
  border: 0,
  position: 'relative',

  textDecoration: 'none',
  color: 'var(--black)',
  transition: '250ms',

  backgroundColor: 'transparent',
  backgroundSize: 'contain',
  backgroundPosition: 'left, right',
  backgroundRepeat: 'no-repeat',
  backgroundImage: [
    'url("/assets/images/iconography/cta_left.png")',
    'url("/assets/images/iconography/cta_right.png")',
  ].join(','),

  filter: isDisabled ? 'grayscale(1)' : undefined,
  cursor: isDisabled ? 'not-allowed' : 'pointer',

  small: { width: isFullWidthOnMobile ? '100%' : undefined },

  ':hover': { filter: isDisabled ? 'grayscale(1)' : 'hue-rotate(60deg)' },
  ':focus': { outlineStyle: 'auto' },
})

const content = {
  padding: 'var(--s-small) var(--s-base)',
  flexGrow: 1,
  height: '100%',

  lineHeight: 1,
  fontSize: '80%',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  textAlign: 'center',

  backgroundImage: 'url("/assets/images/iconography/cta_center.png")',
  backgroundRepeat: 'repeat-x',
  backgroundSize: 'contain',
}

const styles = { cta, content }

export default styles
