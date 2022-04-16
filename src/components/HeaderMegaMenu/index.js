import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import Link from '~/components/Link'
import Icon from '~/components/Icon'
import Label from '~/components/Label'
import NewPulse from '~/components/NewPulse'
import Row from '~/components/Row'
import styles from './styles'

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

export default React.memo(
  function HeaderMegaMenu(props) {
    const { css } = useFela({ isOpen: props.open })
    const ref = React.useRef(null)

    useOutsideAlerter(props, ref)

    return (
      <div
        ref={ref}
        className={css(styles.menu)}
        style={{ '--columns': props.columns.length }}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
      >
        <Row isDesktopOnly>
          {props.columns.map((column, index) => (
            <Row.Column width={`1/${props.columns.length}`} key={index}>
              <Label
                as='h2'
                extend={styles.title({
                  isActive: props.active[0] === column.id,
                })}
              >
                {column.icon ? (
                  <Icon icon={column.icon} extend={styles.icon} />
                ) : null}
                {column.to ? (
                  <Link to={column.to}>{column.title}</Link>
                ) : (
                  column.title
                )}
              </Label>
              <ul className={css(styles.list)}>
                {column.items.map(item => (
                  <li key={item.label} className={css(styles.item)}>
                    <Link
                      href={item.href}
                      to={item.to}
                      extend={styles.link({
                        isActive: props.active[1] === item.id,
                      })}
                    >
                      {item.label}
                    </Link>
                    {item.isNew && <NewPulse />}
                  </li>
                ))}
              </ul>
            </Row.Column>
          ))}
        </Row>
        {props.close && (
          <BlankButton
            onClick={props.close}
            label='Close menu'
            extend={styles.close}
          >
            <Icon icon='cross' />
          </BlankButton>
        )}
      </div>
    )
  },
  function areEqual(prevProps, nextProps) {
    return prevProps.open === nextProps.open
  }
)
