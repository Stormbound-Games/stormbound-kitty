import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '~/components/BrawlProvider'
import Image from '~/components/Image'
import styles from './styles'

const getImageProps = heart => {
  const basePath = '/assets/images/iconography/'

  if (heart.isProtected)
    return {
      src: `${basePath}/heart_protected.png`,
      alt: 'Protected heart',
      title: 'Protected heart',
    }
  if (heart.isFull && heart.isPermanent)
    return {
      src: `${basePath}/heart_full_permanent.png`,
      alt: 'Permanent and full heart',
      title: 'Permanent and full heart',
    }
  if (heart.isFull)
    return {
      src: `${basePath}/heart_full_temporary.png`,
      alt: 'Non-permanent and full heart',
      title: 'Non-permanent and full heart',
    }
  if (!heart.isFull && heart.isPermanent)
    return {
      src: `${basePath}/heart_empty_permanent.png`,
      alt: 'Permanent and empty heart',
      title: 'Permanent and empty heart',
    }
  if (!heart.isFull)
    return {
      src: `${basePath}/heart_empty_temporary.png`,
      alt: 'Non-permanent and empty heart',
      title: 'Non-permanent and empty heart',
    }
}

export default React.memo(function BrawlLossCounter() {
  const { css } = useFela()
  const { meta } = React.useContext(BrawlContext)

  return (
    <div className={css(styles.counter)}>
      {meta.hearts.map((heart, index) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
          key={[heart.isFull, heart.isPermanent, heart.isProtected, index]
            .map(Number)
            .join('')}
          extend={styles.heart}
          {...getImageProps(heart)}
        />
      ))}
    </div>
  )
})
