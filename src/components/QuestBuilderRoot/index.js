import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import Form from '../QuestBuilderForm'
import Row from '../Row'
import PageMeta from '../PageMeta'
import Quest from '../Quest'
import HeaderBanner from '../HeaderBanner'
import serialisation from '../../helpers/serialisation'
import getInitialQuestData from '../../helpers/getInitialQuestData'
import './index.css'

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
      this.props.history.replace(
        '/quest/' + serialisation.quest.serialise(this.state)
      )
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
      <>
        <HeaderBanner title='Create Your Quest' />

        <div className='QuestBuilder'>
          <Row desktopOnly wideGutter>
            <Row.Column style={{ justifyContent: 'center' }}>
              <Quest {...this.state} />
            </Row.Column>
            <Row.Column>
              <Form
                {...this.state}
                setCurrency={currency => this.setState({ currency })}
                setAmount={amount => this.setState({ amount })}
                setName={name => this.setState({ name })}
                setDescription={description => this.setState({ description })}
                setDifficulty={difficulty => this.setState({ difficulty })}
                reset={this.reset}
              />
            </Row.Column>
          </Row>
        </div>

        <PageMeta
          title='Quest Builder'
          description='Design your very own Stormbound quest'
        />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  history: useHistory(),
  questId: useRouteMatch().params.questId,
}))(QuestBuilderRoot)
