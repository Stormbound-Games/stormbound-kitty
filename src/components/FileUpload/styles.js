// 1. Visually hide the native input while spreading it on top of the button so
//    it remains clickable.
const file = {
  position: 'absolute', // 1
  top: 0, // 1
  opacity: 0, // 1
  width: 0, // 1
  height: 0, // 1
}

const styles = { file }

export default styles
