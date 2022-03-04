import React from 'react'
import { useFela } from 'react-fela'
import Title from '~/components/Title'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function Loader(props) {
  const { css } = useFela()

  return (
    <div className={css(styles.loader, props.extend)}>
      <svg
        width='44'
        height='44'
        viewBox='0 0 44 44'
        xmlns='http://www.w3.org/2000/svg'
        stroke='var(--beige)'
        className={css(styles.svg, props.extendSvg)}
      >
        <g fill='none' fillRule='evenodd' strokeWidth='2'>
          <circle cx='22' cy='22' r='1'>
            <animate
              attributeName='r'
              begin='0s'
              dur='1.8s'
              values='1; 20'
              calcMode='spline'
              keyTimes='0; 1'
              keySplines='0.165, 0.84, 0.44, 1'
              repeatCount='indefinite'
            />
            <animate
              attributeName='stroke-opacity'
              begin='0s'
              dur='1.8s'
              values='1; 0'
              calcMode='spline'
              keyTimes='0; 1'
              keySplines='0.3, 0.61, 0.355, 1'
              repeatCount='indefinite'
            />
          </circle>
          <circle cx='22' cy='22' r='1'>
            <animate
              attributeName='r'
              begin='-0.9s'
              dur='1.8s'
              values='1; 20'
              calcMode='spline'
              keyTimes='0; 1'
              keySplines='0.165, 0.84, 0.44, 1'
              repeatCount='indefinite'
            />
            <animate
              attributeName='stroke-opacity'
              begin='-0.9s'
              dur='1.8s'
              values='1; 0'
              calcMode='spline'
              keyTimes='0; 1'
              keySplines='0.3, 0.61, 0.355, 1'
              repeatCount='indefinite'
            />
          </circle>
        </g>
      </svg>
      {props.hideLabel ? (
        <VisuallyHidden as='p'>Loading content…</VisuallyHidden>
      ) : (
        <Title element='p'>Loading content…</Title>
      )}
    </div>
  )
})
