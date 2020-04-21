import React from 'react'
import { useLocation } from 'react-router-dom'
import Column from '../Column'
import FAQSection from '../FAQSection'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import TogglableContent from '../TogglableContent'
import categories from '../../data/faq'
import './index.css'

const FAQ = props => {
  const { hash } = useLocation()
  const [expanded, setExpanded] = React.useState([])
  const toggle = id =>
    expanded.includes(id)
      ? setExpanded(ids => ids.filter(i => i !== id))
      : setExpanded(ids => [...ids, id])

  React.useEffect(() => {
    if (!hash) return
    const node = document.querySelector(hash)
    if (node) node.scrollIntoView()
    const category = categories.find(
      cat => !!cat.entries.find(entry => entry.id === hash.slice(1))
    )
    if (!expanded.includes(category.id)) {
      setExpanded(ids => [...ids, category.id])
    }
    //eslint-disable-next-line
  }, [hash])

  return (
    <div className='FAQ'>
      <h1 className='VisuallyHidden'>Frequently Asked Questions</h1>

      <Row desktopOnly wideGutter>
        <Column width={33}>
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

        <Column width={66}>
          {categories.map(category => (
            <FAQSection {...category} key={category.id} />
          ))}
        </Column>
      </Row>

      <PageMeta
        title='Frequently Asked questions'
        description='Frequently asked questions about Stormbound Kitty.'
      />
    </div>
  )
}

export default FAQ
