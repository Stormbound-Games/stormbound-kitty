import React from 'react'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'

export default React.memo(function BlockNerfCompensation(props) {
  return <NerfCompensationInfo ids={props.value.ids} />
})
