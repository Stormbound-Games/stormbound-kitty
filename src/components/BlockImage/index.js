import React from 'react'
import { client } from '~/constants/sanity'
import imageUrlBuilder from '@sanity/image-url'
import Image from '~/components/Image'
import PageEmbed from '~/components/PageEmbed'

const builder = imageUrlBuilder(client)

const getUrl = image => builder.image(image).fit('max').auto('format').url()

export default React.memo(function BlockImage(props) {
  const extend = props.value.extend ? JSON.parse(props.value.extend) : undefined
  const Container = props.value.wide ? PageEmbed : React.Fragment

  return (
    <Container>
      <Image
        src={getUrl(props.value)}
        alt={props.value.alt}
        extend={extend}
        lazy
      />
    </Container>
  )
})
