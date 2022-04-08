import React from 'react'
import { useFela } from 'react-fela'
import Page from '~/components/Page'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Link from '~/components/Link'
import Spacing from '~/components/Spacing'
import StructuredData from '~/components/StructuredData'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function PageFAQ(props) {
  const { css } = useFela()

  return (
    <Page
      title='FAQ'
      description='Find answers to the frequently asked questions about Stormbound and Stormbound-Kitty'
      isEditorialContent
    >
      <Page.Narrow>
        <Title>Topics</Title>

        <ul className={css(styles.toc)}>
          {props.data.map(category => (
            <li key={category.id}>
              <Link href={'#' + category.id} extend={styles.link}>
                {category.title}
              </Link>
              <ul className={css(styles.list)}>
                {category.entries.map(entry => (
                  <li key={entry.id}>
                    <Link href={'#' + entry.id} extend={styles.link}>
                      {entry.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Image
          src='/assets/images/kitty.png'
          alt='Kitty Sparkles by Hurricane Sunny'
          extend={{ margin: 'auto' }}
          lazy
          width={500}
          height={364}
          // Webp happens to be significantly heavier than PNG on that image
          withoutWebp
        />

        {props.data.map((category, index) => (
          <Spacing
            bottom={index !== props.data.length - 1 ? 'LARGEST' : 'NONE'}
            key={category.id}
          >
            <FAQSection {...category} />
          </Spacing>
        ))}

        <StructuredData type='FAQ' data={props.data} />
      </Page.Narrow>
    </Page>
  )
})
