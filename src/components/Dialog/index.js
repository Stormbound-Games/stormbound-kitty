import React from 'react'
import A11yDialog from 'react-a11y-dialog'
import ButtonIcon from '../ButtonIcon'
import CTA from '../CTA'
import Image from '../Image'
import Title from '../Title'
import './index.css'

const Dialog = React.memo(function Dialog(props) {
  const registerDialog = ref => {
    if (ref && !props.allowScroll) {
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

  const hasCTA = Object.keys(props.ctaProps).length > 0

  return (
    <A11yDialog
      id={props.id}
      appRoot='#root'
      dialogRoot='#dialog-root'
      dialogRef={registerDialog}
      title={props.title}
      useDialog={false}
      classNames={{
        base: 'Dialog',
        overlay: 'Dialog__overlay',
        element: `Dialog__content`,
        document: 'Dialog__document',
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
        className={['Dialog__header', props.hideHeader && 'VisuallyHidden']
          .filter(Boolean)
          .join(' ')}
      >
        <Title className='Dialog__title' data-testid={`${props.id}-title`}>
          {props.title}
        </Title>
      </header>

      <div
        className={[`Dialog__body`, hasCTA && 'Dialog__body--with-cta']
          .filter(Boolean)
          .join(' ')}
      >
        {props.image !== null && (
          <Image className='Dialog__image' src={props.image} alt='' />
        )}

        {props.children}

        {hasCTA && <CTA {...props.ctaProps} className='Dialog__CTA' />}
      </div>
    </A11yDialog>
  )
})

Dialog.defaultProps = {
  ctaProps: {},
  image: '/assets/images/cards/lady_rime.png',
  hideHeader: false,
  allowScroll: false,
}

export default Dialog
