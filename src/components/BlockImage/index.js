import React from 'react'
import Image from '~/components/Image'
import PageEmbed from '~/components/PageEmbed'

export default React.memo(function BlockImage(props) {
  const extend = props.value.extend ? JSON.parse(props.value.extend) : undefined
  const Container = props.value.wide ? PageEmbed : React.Fragment

  return (
    <Container>
      <Image
        src={props.value.src + '?fit=max'}
        alt={props.value.alt}
        extend={extend}
        lazy
      />
    </Container>
  )
})
