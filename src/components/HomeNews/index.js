import React from 'react'
import { useFela } from 'react-fela'
import Image from '../Image'
import News from '../News'
import Spacing from '../Spacing'
import Title from '../Title'
import styles from './styles'

export default React.memo(function HomeNews(props) {
  const { css } = useFela()

  return (
    <aside className={css(styles.container)}>
      <Image extend={styles.image} src='/assets/images/kitty.png' withoutWebp />

      <Spacing bottom='LARGE'>
        <div className={css(styles.box)}>
          <Title extend={styles.title}>News</Title>
          <News />
        </div>
      </Spacing>
    </aside>
  )
})
