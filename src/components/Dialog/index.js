import React from 'react'
import { useFela } from 'react-fela'
import { A11yDialog } from 'react-a11y-dialog'
import DiamondButton from '~/components/DiamondButton'
import CTA from '~/components/CTA'
import Image from '~/components/Image'
import Title from '~/components/Title'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function Dialog(props) {
  const ctaProps = props.ctaProps || {}
  const hasCTA = Object.keys(ctaProps).length > 0
  const { css } = useFela({ withCTA: hasCTA })
  const image =
    typeof props.image === 'undefined'
      ? '/https://cdn.sanity.io/images/5hlpazgd/production/1c3030c89bb57cf4b49cbf0bf83d2acaa4a1a6fd-512x512.png'
      : props.image
  const hideHeader = false
  const allowScroll = false

  const registerDialog = ref => {
    if (ref && !allowScroll) {
      ref
        .on('show', () => {
          document.documentElement.style.overflowY = 'hidden'
        })
        .on('hide', () => {
          document.documentElement.style.overflowY = ''
        })
    }

    props.dialogRef(ref)
  }

  return (
    <A11yDialog
      role={props.role}
      id={props.id}
      dialogRef={registerDialog}
      title={props.title}
      classNames={{
        container: css(styles.container, props.extend?.container),
        overlay: css(styles.overlay, props.extend?.overlay),
        dialog: css(styles.content, props.extend?.dialog),
        title: css({ display: 'none' }, props.extend?.title),
        closeButton: css({ display: 'none' }, props.extend?.closeButton),
      }}
    >
      <DiamondButton
        type='button'
        onClick={props.close}
        label='Close dialog'
        extend={styles.button}
        isActive
        aria-pressed={undefined}
        icon='cross'
        data-testid={`${props.id}-close`}
      >
        &times;
      </DiamondButton>

      {hideHeader ? (
        <VisuallyHidden as='header'>
          <Title data-testid={`${props.id}-title`}>{props.title}</Title>
        </VisuallyHidden>
      ) : (
        <header className={css(styles.header)}>
          <Title extend={styles.title} data-testid={`${props.id}-title`}>
            {props.title}
          </Title>
        </header>
      )}

      {image !== null && (
        <Image
          extend={styles.image}
          src={image}
          alt=''
          width={props.imageWidth || 200}
          height={props.imageHeight || 200}
          lazy
        />
      )}

      <div className={css(styles.body, props.extend?.body)}>
        <div className={css({ '> :last-child': { marginBottom: 0 } })}>
          {props.children}
        </div>
        {hasCTA && <CTA {...ctaProps} extend={[styles.cta, ctaProps.extend]} />}
      </div>
    </A11yDialog>
  )
})
