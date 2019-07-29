import React from 'react'
import Markdown from '../Markdown'
import Guide from '../Guide'
import guide from '../../data/Winter_guide.md'

class WinterGuide extends React.Component {
  state = { content: null }

  componentDidMount() {
    fetch(guide)
      .then(response => response.text())
      .then(content => this.setState({ content }))
  }

  render() {
    return this.state.content ? (
      <Guide
        title="Winter Guide"
        description="A Stormbound guide to learn how to play Winter Pact"
        author="WinterBoii"
      >
        <Markdown source={this.state.content} />
      </Guide>
    ) : null
  }
}

export default WinterGuide
