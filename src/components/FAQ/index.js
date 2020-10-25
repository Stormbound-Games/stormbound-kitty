import React from 'react'
import Article from '../Article'
import FAQSection from '../FAQSection'
import PageMeta from '../PageMeta'
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
      <Article.Narrow>
        <Title>Topics</Title>

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
                    {expanded.includes(category.id) ? '- collapse' : '+ expand'}
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

        {categories.map(category => (
          <FAQSection {...category} key={category.id} />
        ))}

        <StructuredData type='FAQ' />
        <PageMeta
          title='Frequently Asked questions'
          description='Find answers to the frequently asked questions about Stormbound and Stormbound-Kitty'
        />
      </Article.Narrow>
    </Article>
  )
})
