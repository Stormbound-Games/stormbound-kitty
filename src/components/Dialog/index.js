import React from 'react'
import A11yDialog from 'react-a11y-dialog'
import ButtonIcon from '../ButtonIcon'
import Title from '../Title'
import Image from '../Image'
import CTA from '../CTA'
import './index.css'

export default class Dialog extends React.Component {
  static defaultProps = {
    ctaProps: {},
    image: '/assets/images/cards/lady_rime.png',
    hideHeader: false,
    allowScroll: false
  }

  registerDialog = ref => {
    if (ref && !this.props.allowScroll) {
      ref
        .on('show', () => {
          document.documentElement.style.overflowY = 'hidden'
        })
        .on('hide', () => {
          document.documentElement.style.overflowY = ''
        })
    }

    this.props.dialogRef(ref)
  }

  render() {
    const hasCTA = Object.keys(this.props.ctaProps).length > 0

    return (
      <A11yDialog
        id={this.props.id}
        appRoot="#root"
        dialogRoot="#dialog-root"
        dialogRef={this.registerDialog}
        title={this.props.title}
        useDialog={false}
        classNames={{
          base: 'Dialog',
          overlay: 'Dialog__overlay',
          element: `Dialog__content`,
          document: 'Dialog__document',
          title: 'Dialog__hidden',
          closeButton: 'Dialog__hidden'
        }}
      >
        <ButtonIcon
          type="button"
          onClick={this.props.close}
          title="Close dialog"
          aria-label="Close dialog"
          className="Dialog__button"
          data-testid={`${this.props.id}-close`}
        >
          &times;
        </ButtonIcon>

        <header
          className={[
            'Dialog__header',
            this.props.hideHeader && 'visually-hidden'
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Title
            className="Dialog__title"
            data-testid={`${this.props.id}-title`}
          >
            {this.props.title}
          </Title>
        </header>

        <div
          className={[`Dialog__body`, hasCTA && 'Dialog__body--with-cta']
            .filter(Boolean)
            .join(' ')}
        >
          {this.props.image !== null && (
            <Image className="Dialog__image" src={this.props.image} alt="" />
          )}

          {this.props.children}

          {hasCTA && <CTA {...this.props.ctaProps} className="Dialog__CTA" />}
        </div>
      </A11yDialog>
    )
  }
}
