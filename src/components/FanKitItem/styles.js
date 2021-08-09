const item = {
  position: 'relative',
}
/*
.FanKitItem:hover .FanKitItem__download {
  opacity: 1,
}
*/

const image = {
  display: 'block',
  margin: '1em auto',
  maxWidth: '100%',
  width: 'var(--width, 1200px)',
  maxHeight: 'var(--height, auto)',
  height: 'auto',
  objectFit: 'contain',
}

const download = {
  position: 'absolute',
  bottom: '1em',
  right: '1em',
  opacity: 0.25,
  zIndex: 10,
}

export default {
  item,
  image,
  download,
}
