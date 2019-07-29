import React from 'react'
import Markdown from '../Markdown'
import Guide from '../Guide'
import guide from '../../data/Stormbound_guide.md'
import './index.css'

class CompleteGuide extends React.Component {
  state = { content: null }

  componentDidMount() {
    fetch(guide)
      .then(response => response.text())
      .then(content => this.setState({ content }))
  }

  render() {
    return this.state.content ? (
      <Guide
        title="Stormbound Guide"
        description="A complete Stormbound Guide by Arikrat"
        author="Arikrat"
        className="CompleteGuide"
      >
        <Markdown source={this.state.content} />
      </Guide>
    ) : null
  }
}

export default CompleteGuide
