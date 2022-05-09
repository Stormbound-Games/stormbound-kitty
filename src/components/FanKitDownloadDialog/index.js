import React from 'react'
import Dialog from '~/components/Dialog'
import Link from '~/components/Link'

export default React.memo(function FanKitDownloadDialog(props) {
  return (
    <Dialog
      id='fan-kit-dialog'
      dialogRef={props.dialogRef}
      close={props.close}
      title={props.name || 'Download image'}
      image={props.displayImage === false ? null : props.image}
      ctaProps={
        props.image
          ? {
              href:
                props.image + '?dl=' + encodeURIComponent(props.name + '.png'),
              'data-testid': 'fan-kit-link',
              children: 'PNG file',
            }
          : undefined
      }
    >
      {props.image ? (
        <p>
          <Link href={props.image}>Open image in new tab</Link> or download it
          as:
        </p>
      ) : (
        <p>An error has occurred.</p>
      )}
    </Dialog>
  )
})
