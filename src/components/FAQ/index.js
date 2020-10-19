import React from 'react'
import Article from '../Article'
import Column from '../Column'
import FAQSection from '../FAQSection'
import PageMeta from '../PageMeta'
import Row from '../Row'
import StructuredData from '../StructuredData'
import Title from '../Title'
import TogglableContent from '../TogglableContent'
import categories from '../../data/faq'
import './index.css'

export default React.memo(function FAQ() {
  const [expanded, setExpanded] = React.useState([])
  const toggle = id =>
    expanded.includes(id)
      ? setExpanded(ids => ids.filter(i => i !== id))
      : setExpanded(ids => [...ids, id])

  React.useEffect(() => {
    if (!window.location.hash) return

    const requestedId = window.location.hash.slice(1)
    const category = categories.find(
      cat =>
        cat.id === requestedId ||
        cat.entries.find(entry => entry.id === requestedId)
    )

    if (category && !expanded.includes(category.id)) {
      setExpanded(ids => [...ids, category.id])
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Article title='FAQ'>
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title style={{ marginTop: 0 }}>Topics</Title>

          <ul className='FAQ__toc'>
            {categories.map(category => (
              <li key={category.id}>
                <a href={'#' + category.id}>{category.title}</a>
                <TogglableContent
                  isExpanded={expanded.includes(category.id)}
                  id={category.id + '-questions'}
                  renderToggle={toggleProps => (
                    <button
                      className='ButtonAsLink FAQ__toggle'
                      onClick={() => toggle(category.id)}
                    >
                      (
                      {expanded.includes(category.id)
                        ? '- collapse'
                        : '+ expand'}
                      )
                    </button>
                  )}
                >
                  <ul className='FAQ__toc-list'>
                    {category.entries.map(entry => (
                      <li key={entry.id}>
                        <a href={'#' + entry.id}>{entry.question}</a>
                      </li>
                    ))}
                  </ul>
                </TogglableContent>
              </li>
            ))}
          </ul>
        </Column>

        <Column width='2/3'>
          {categories.map(category => (
            <FAQSection {...category} key={category.id} />
          ))}
        </Column>
      </Row>

      <StructuredData type='FAQ' />
      <PageMeta
        title='Frequently Asked questions'
        description='Find answers to the frequently asked questions about Stormbound and Stormbound-Kitty'
      />
    </Article>
  )
})
