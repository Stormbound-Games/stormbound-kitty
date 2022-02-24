import React from 'react'
import { client } from '~/constants/sanity'
import imageUrlBuilder from '@sanity/image-url'
import Image from '~/components/Image'

const builder = imageUrlBuilder(client)

const getUrl = image => builder.image(image).fit('max').auto('format').url()

export default React.memo(function BlockImage(props) {
  const extend = props.value.extend ? JSON.parse(props.value.extend) : undefined

  return (
    <Image
      src={getUrl(props.value)}
      alt={props.value.alt}
      extend={extend}
      lazy
    />
  )
})
