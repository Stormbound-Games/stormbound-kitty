import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import Row from '../Row'
import './index.css'

const useOutsideAlerter = (props, ref) => {
  const { open, close } = props

  const handleClickOutside = React.useCallback(
    event => {
      if (open && ref.current && !ref.current.contains(event.target)) close()
    },
    [ref, open, close]
  )

  React.useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [handleClickOutside])
}

export default React.memo(function HeaderMegaMenu(props) {
  const ref = React.useRef(null)

  useOutsideAlerter(props, ref)

  return (
    <div
      ref={ref}
      className={['HeaderMegaMenu', props.open && 'HeaderMegaMenu--open']
        .filter(Boolean)
        .join(' ')}
      style={{ '--columns': props.columns.length }}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      <Row desktopOnly>
        {props.columns.map((column, index) => (
          <Row.Column width={`1/${props.columns.length}`} key={index}>
            <h2 className='HeaderMegaMenu__title'>
              {column.icon ? (
                <Icon icon={column.icon} className='HeaderMegaMenu__icon' />
              ) : null}
              {column.to ? (
                <Link to={column.to}>{column.title}</Link>
              ) : (
                column.title
              )}
            </h2>
            <ul className='HeaderMegaMenu__list'>
              {column.items.map(item => (
                <li key={item.label} className='HeaderMegaMenu__item'>
                  {item.href ? (
                    <a
                      href={item.href}
                      className='HeaderMegaMenu__link'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {item.label}
                      <Icon
                        icon='arrow-top-right'
                        className='HeaderMegaMenu__newTab'
                      />
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className={[
                        'HeaderMegaMenu__link',
                        props.active.includes(item.id) &&
                          'HeaderMegaMenu__link--active',
                        item.new && 'Header__item--new',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Row.Column>
        ))}
      </Row>
      {props.close && (
        <button
          type='button'
          onClick={props.close}
          aria-label='Close menu'
          className='HeaderMegaMenu__close'
        >
          &times;
        </button>
      )}
    </div>
  )
})
