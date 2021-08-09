const arrow = {
  fontSize: '80%',
  transform: 'translateY(1px)',
  margin: '0 0.75ch',
}

const meta = {
  display: 'block',
  opacity: 0.8,
}

const wrapper = {
  textAlign: 'left',
  position: 'relative',
}

const inputWwrapper = {
  display: 'inline-block',
  width: '100%',
}

const list = {
  listStyle: 'none',
  padding: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: 'var(--dark-blue)',
  borderRadius: '4px',
  top: 'calc(100% - 0.5em)',
  boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
}

const item = {
  padding: '0.5em',
}

const hint = {
  margin: '1.5em auto 0',
  maxWidth: '40ch',
  fontSize: '80%',
}

const body = {
  fontSize: '120%',
}

export default {
  arrow,
  meta,
  wrapper,
  inputWwrapper,
  list,
  item,
  hint,
  body,
}
