import React from 'react'
import { useFela } from 'react-fela'
import Image from 'next/image'
import News from '~/components/News'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function HomeNews(props) {
  const { css } = useFela()

  return (
    <aside className={css(styles.container)}>
      <div className={css(styles.image)}>
        <Image
          src='/assets/images/cards/full/sparkly_kitties.png'
          alt='Sparkly Kitties'
          width={390}
          height={390}
          layout='intrinsic'
        />
      </div>

      <Spacing bottom='LARGE'>
        <div className={css(styles.box)}>
          <Title extend={styles.title}>News</Title>
          <News items={props.news} />
        </div>
      </Spacing>
    </aside>
  )
})
