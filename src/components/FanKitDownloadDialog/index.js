import React from 'react'
import { useFela } from 'react-fela'
import Dialog from '~/components/Dialog'
import Link from '~/components/Link'

export default React.memo(function FanKitDownloadDialog(props) {
  const { css } = useFela()
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
              href: props.image,
              download: true,
              className: css({ minWidth: 0 }),
              'data-testid': 'fan-kit-link',
              children: 'PNG file',
            }
          : undefined
      }
    >
      {props.image ? (
        <p>
          <Link href={props.image} inNewTab>
            Open image in new tab
          </Link>{' '}
          or download it as:
        </p>
      ) : (
        <p>An error has occurred.</p>
      )}
    </Dialog>
  )
})
