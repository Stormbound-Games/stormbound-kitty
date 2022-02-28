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
      <div className={css(styles.image)}>
        <Image
          src='https://cdn.sanity.io/images/5hlpazgd/production/f675c9ec86b27088ee6433b53433a9a3fdd96803-512x512.png'
          alt='Sparkly Kitties'
          width={390}
          height={390}
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
