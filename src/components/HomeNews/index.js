import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import News from '~/components/News'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function HomeNews(props) {
  const { css } = useFela()

  return (
    <aside className={css(styles.container)}>
      <Image
        extend={styles.image}
        src='/assets/images/kitty.png'
        withoutWebp
        width={446}
        height={339}
        lazy
      />

      <Spacing bottom='LARGE'>
        <div className={css(styles.box)}>
          <Title extend={styles.title}>News</Title>
          <News items={props.news} />
        </div>
      </Spacing>
    </aside>
  )
})
