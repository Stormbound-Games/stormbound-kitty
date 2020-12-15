import React from 'react'
import { A11yDialog } from 'react-a11y-dialog'
import ButtonIcon from '../ButtonIcon'
import CTA from '../CTA'
import Image from '../Image'
import Title from '../Title'
import './index.css'

export default React.memo(function Dialog(props) {
  const ctaProps = props.ctaProps || {}
  const image =
    typeof props.image === 'undefined'
      ? '/assets/images/cards/lady_rime.png'
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

  const hasCTA = Object.keys(ctaProps).length > 0

  return (
    <A11yDialog
      role={props.role}
      id={props.id}
      appRoot='#root'
      dialogRoot='#dialog-root'
      dialogRef={registerDialog}
      title={props.title}
      classNames={{
        container: 'Dialog',
        overlay: 'Dialog__overlay',
        dialog: 'Dialog__content',
        inner: 'Dialog__document',
        title: 'Dialog__hidden',
        closeButton: 'Dialog__hidden',
      }}
    >
      <ButtonIcon
        type='button'
        onClick={props.close}
        title='Close dialog'
        aria-label='Close dialog'
        className='Dialog__button'
        data-testid={`${props.id}-close`}
      >
        &times;
      </ButtonIcon>

      <header
        className={['Dialog__header', hideHeader && 'VisuallyHidden']
          .filter(Boolean)
          .join(' ')}
      >
        <Title className='Dialog__title' data-testid={`${props.id}-title`}>
          {props.title}
        </Title>
      </header>

      {image !== null && (
        <Image className='Dialog__image' src={image} alt='' withAvif />
      )}

      <div
        className={[`Dialog__body`, hasCTA && 'Dialog__body--with-cta']
          .filter(Boolean)
          .join(' ')}
      >
        {props.children}

        {hasCTA && <CTA {...ctaProps} className='Dialog__CTA' />}
      </div>
    </A11yDialog>
  )
})
