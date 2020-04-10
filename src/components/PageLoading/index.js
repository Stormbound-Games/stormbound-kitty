import React from 'react'
import Error from '../Error'
import Loader from '../Loader'

const PageLoading = props => {
  if (props.error) {
    return <Error retry={props.retry} error={props.error} />
  } else if (props.timedOut) {
    return (
      <Error retry={props.retry} error='It looks like the request timed out.' />
    )
  } else if (props.pastDelay) {
    return <Loader />
  } else {
    return null
  }
}

export default PageLoading
