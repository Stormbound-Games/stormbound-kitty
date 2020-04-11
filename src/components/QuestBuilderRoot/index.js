import React, { Fragment } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import Quest from '../Quest'
import PageMeta from '../PageMeta'
import Title from '../Title'
import Form from '../QuestBuilderForm'
import getInitialQuestData from '../../helpers/getInitialQuestData'
import './index.css'
import { serialiseQuest } from '../../helpers/serialise'

class QuestBuilderRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: 'coins',
      amount: 0,
      name: '',
      description: '',
      difficulty: 1,
      ...getInitialQuestData(props.questId),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hasAnyPropChanged = [
      'currency',
      'amount',
      'name',
      'description',
      'difficulty',
    ].some(prop => this.state[prop] !== prevState[prop])

    if (hasAnyPropChanged) {
      this.props.history.replace('/quest/' + serialiseQuest(this.state))
    } else if (prevProps.questId !== this.props.questId) {
      if (this.props.questId) {
        this.setState({ ...getInitialQuestData(this.props.questId) })
      } else {
        this.reset()
      }
    }
  }

  reset = () => {
    this.setState(
      {
        currency: 'coins',
        amount: 0,
        name: '',
        description: '',
        difficulty: 1,
      },
      () => this.props.history.push('/quest')
    )
  }

  render() {
    return (
      <Fragment>
        <div className='QuestBuilder'>
          <Title element='h1'>Build your quest</Title>
          <Quest {...this.state} />
          <Form
            {...this.state}
            setCurrency={currency => this.setState({ currency })}
            setAmount={amount => this.setState({ amount })}
            setName={name => this.setState({ name })}
            setDescription={description => this.setState({ description })}
            setDifficulty={difficulty => this.setState({ difficulty })}
            reset={this.reset}
          />
        </div>

        <PageMeta
          title='Quest Builder'
          description='Create your own Stormbound quest.'
        />
      </Fragment>
    )
  }
}

export default hookIntoProps(() => ({
  history: useHistory(),
  questId: useRouteMatch().params.questId,
}))(QuestBuilderRoot)
