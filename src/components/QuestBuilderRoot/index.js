import React from 'react'
import { useFela } from 'react-fela'
import hookIntoProps from 'hook-into-props'
import Form from '~/components/QuestBuilderForm'
import Row from '~/components/Row'
import Quest from '~/components/Quest'
import Page from '~/components/Page'
import serialisation from '~/helpers/serialisation'
import getInitialQuestData from '~/helpers/getInitialQuestData'
import useRouter from '~/hooks/useRouter'

class QuestBuilderRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: 'coins',
      amount: 0,
      name: '',
      description: '',
      difficulty: 1,
      ...props.quest,
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
        '/quest/' + serialisation.quest.serialise(this.state),
        undefined,
        { scroll: false }
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
      () => this.props.history.push('/quest', undefined, { scroll: false })
    )
  }

  render() {
    return (
      <Page
        title='Create Your Quest'
        description='Design your very own Stormbound quest'
      >
        <div
          className={this.props.css({
            maxWidth: '100%',
            width: '900px',
            margin: '0 auto',
          })}
        >
          <Row isDesktopOnly withWideGutter>
            <Row.Column extend={{ justifyContent: 'center' }}>
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
      </Page>
    )
  }
}

export default hookIntoProps(() => ({
  ...useFela(),
  history: useRouter().history,
}))(QuestBuilderRoot)
