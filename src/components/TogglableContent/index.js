import React, { Fragment } from 'react'
import './index.css'

export default class TogglableContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: props.isExpanded
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isExpanded !== this.props.isExpanded) {
      this.setState({ isExpanded: this.props.isExpanded })
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.renderToggle({
          id: this.props.id,
          'aria-controls': this.props.id + '-target',
          'aria-expanded': this.state.isExpanded
        })}

        <div
          className="TogglableContent__target"
          id={this.props.id + '-target'}
          aria-labelledby={this.props.id}
          aria-hidden={!this.state.isExpanded}
        >
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}
