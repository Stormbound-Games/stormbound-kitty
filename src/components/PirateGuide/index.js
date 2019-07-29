import React from 'react'
import Markdown from '../Markdown'
import Guide from '../Guide'
import guide from '../../data/Pirate_guide.md'

class PirateGuide extends React.Component {
  state = { content: null }

  componentDidMount() {
    fetch(guide)
      .then(response => response.text())
      .then(content => this.setState({ content }))
  }

  render() {
    return this.state.content ? (
      <Guide
        title="Pirate Guide"
        description="A Stormbound guide to learn how to play Pirate decks"
        author="MooreFunn"
      >
        <Markdown source={this.state.content} />
      </Guide>
    ) : null
  }
}

export default PirateGuide
