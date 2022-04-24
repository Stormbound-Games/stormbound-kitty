// 1. Arbitrary dimensions for the progress bar.
// 2. Prevent background color from leaking behind the padding, which is
//    necessary to have that gap between the filling and the border.
// 3. Remove right border to have the pointy edge.
// 4. Soften the corners to make the transition between the top/bottom border
//    and the pseudo-element smoother.
const progress = {
  height: '25px', // 1
  width: '15em', // 1
  maxWidth: '100%',
  padding: '3px',
  backgroundColor: 'var(--green)',
  backgroundClip: 'content-box', // 2
  border: '1px solid var(--beige)',
  borderRight: 0, // 3
  borderRadius: '0 1px 1px 0', // 4
  position: 'relative',

  // 1. √(25 * 25 / 2) or accurate width and height to have a diagonal exactly
  //    equal to the height of the progress bar (25px).
  // 2. Soften the corners to make the transition between the top/bottom border
  //    and the pseudo-element smoother.
  '::after': {
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    right: 0,
    top: '50%',
    width: '17.67766952966369px', // 1
    height: '17.67766952966369px', // 1
    borderRight: '1px solid var(--beige)',
    borderTop: '1px solid var(--beige)',
    borderRadius: '1px 0 1px 0', // 2
    transform: 'translateX(-0.5px) translate(50%, -50%) rotate(45deg)',
  },
}

const inner = {
  height: '100%',
  backgroundColor: 'var(--yellow)',

  // 1. √(17 * 17 / 2) or accurate width and height to have a diagonal exactly
  //    equal to the height of the filling (25px - 3px * 2 - 1px * 2).
  '::after': {
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    right: 0,
    top: '50%',
    width: '12.020815280171307px', // 1
    height: '12.020815280171307px', // 1
    transform: 'translateX(-3px) translate(50%, -50%) rotate(45deg)',
    backgroundColor: 'var(--green)',
  },

  // 1. Make sure the pointy edge is gold and not green when full.
  '[aria-valuenow="100"]::after': {
    backgroundColor: 'inherit', // 1
  },
}

const styles = { progress, inner }

export default styles
