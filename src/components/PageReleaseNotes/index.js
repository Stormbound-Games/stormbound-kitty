import React from 'react'
import { useFela } from 'react-fela'
import BlocksRenderer from '#components/BlocksRenderer'
import Page from '#components/Page'

const odd = {
  fontSize: '170%',

  "[data-position='edge']": { color: '#ac6d4f' },
  "[data-position='middle']": { color: '#473062', opacity: 0.8 },
}

const createOddsNode = (content, position, styles) => {
  const node = document.createElement('span')
  node.innerText = content
  node.setAttribute('class', styles)
  node.setAttribute('data-position', position)
  node.setAttribute('data-selector', 'odd')

  return node
}

const useFirstReleaseConfusionVisualization = id => {
  const { css } = useFela()
  const [withConfusionFix, setWithConfusionFix] = React.useState(true)

  React.useEffect(() => {
    const ODDS = [
      ['A3', '1\u20443', '4\u20449', 'middle'],
      ['B2', '1\u20443', '2\u20449', 'middle'],
      ['B4', '1\u20443', '3\u20449', 'middle'],
      ['D1', '1\u20443', '2\u20443', 'edge'],
      ['E2', '2\u20443', '1\u20443', 'edge'],
    ]

    ODDS.forEach(([coords, newOdd, oldOdd, position]) => {
      const container = document.querySelector(`[data-cell-coords="${coords}"]`)
      if (!container) return
      const odds = container.querySelector('[data-selector="odd"]')
      const content = withConfusionFix ? newOdd : oldOdd

      if (odds) odds.innerText = content
      else container.appendChild(createOddsNode(content, position, css(odd)))
    })
  }, [id, withConfusionFix, css])

  React.useEffect(() => {
    if (id !== '2020_07') return

    const interval = setInterval(() => {
      setWithConfusionFix(current => !current)
    }, 5000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [id])
}

export default React.memo(function PageReleaseNotes(props) {
  useFirstReleaseConfusionVisualization(props.id)

  return (
    <Page
      title={props.title}
      description={props.excerpt}
      author={props.author}
      image={props.background}
      action={{ to: '/releases', children: 'Back to releases' }}
      meta={'Official · ' + props.date}
      background={props.background}
      ratio={props.ratio}
      isEditorialContent
      withDropCap
    >
      <Page.Narrow>
        <BlocksRenderer value={props.content} date={props.date} />
      </Page.Narrow>
    </Page>
  )
})
