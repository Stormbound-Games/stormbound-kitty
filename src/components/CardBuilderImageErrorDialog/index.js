import React from 'react'
import Link from '~/components/Link'
import Dialog from '~/components/Dialog'

export default React.memo(function CardBuilderImageErrorDialog(props) {
  const dialog = React.useRef(null)
  const [isImgurPage, setIsImgurPage] = React.useState(false)
  const registerDialog = instance => {
    dialog.current = instance

    if (instance) {
      instance.on('show', (_, url) => {
        try {
          if (new URL(url).host === 'imgur.com') {
            setIsImgurPage(true)
          }
        } catch (error) {}
      })
    }

    props.dialogRef(instance)
  }

  const close = () => {
    dialog.current.hide()
    setIsImgurPage(false)
  }

  return (
    <Dialog
      id='image-error-dialog'
      dialogRef={registerDialog}
      title='Cannot load image'
      close={close}
      image='https://cdn.sanity.io/images/5hlpazgd/production/d7567c8333cfa033713404794775bc0b939f5715-301x300.png'
    >
      {isImgurPage ? (
        <p>
          It looks like you copied the link of the Imgur page instead of the URL
          of the image itself. On Imgur, right click or long tap on the image
          and select “Copy image address”. The image should be served from
          i.imgur.com.
        </p>
      ) : (
        <>
          <p>
            Unfortunately it looks like it is not possible to load that image,
            either because it’s not actually an image format or because the
            website protects it from being linked from other places.{' '}
            <Link to={{ pathname: '/faq', hash: '#card-image-error' }}>
              Learn more in the FAQ
            </Link>
            .
          </p>

          <p>
            You can either pick another image, or try to save it and upload it
            to an image sharing service such as{' '}
            <Link href='https://imgur.com/upload'>imgur</Link>.
          </p>
        </>
      )}
    </Dialog>
  )
})
