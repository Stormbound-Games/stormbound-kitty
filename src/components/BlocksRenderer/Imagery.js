import React from 'react'
import { client } from '~/constants/sanity'
import imageUrlBuilder from '@sanity/image-url'
import Guide from '~/components/Guide'
import Image from '~/components/Image'
import Row from '~/components/Row'

const builder = imageUrlBuilder(client)

const getUrl = (image, width) =>
  builder.image(image).width(width).fit('max').auto('format').url()

const Imagery = props => {
  const { images } = props.value

  if (images.length === 1) {
    const [image] = props.value.images

    return <Image src={getUrl(image, 1200)} alt={image.description} lazy />
  }

  const Container = images.length === 2 ? React.Fragment : Guide.FullWidth

  return (
    <Container>
      <Row isDesktopOnly>
        {images.map(image => (
          <Row.Column width={'1/' + images.length} key={image._key}>
            <Image
              src={getUrl(image, Math.round(1200 / images.length))}
              alt={image.description}
              lazy
            />
          </Row.Column>
        ))}
      </Row>
    </Container>
  )
}

export default Imagery
