import React from 'react'
import { useFela } from 'react-fela'
import hookIntoProps from 'hook-into-props'
import Form from '~/components/QuestBuilderForm'
import Row from '~/components/Row'
import Quest from '~/components/Quest'
import Page from '~/components/Page'
import serialisation from '~/helpers/serialisation'
import useNavigator from '~/hooks/useNavigator'

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

  updateURL = () =>
    this.props.navigator.replace(
      '/quest/' + serialisation.quest.serialise(this.state)
    )

  reset = () => {
    this.setState(
      {
        currency: 'coins',
        amount: 0,
        name: '',
        description: '',
        difficulty: 1,
      },
      () => this.props.navigator.push('/quest')
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
                setCurrency={currency =>
                  this.setState({ currency }, this.updateURL)
                }
                setAmount={amount => this.setState({ amount }, this.updateURL)}
                setName={name => this.setState({ name }, this.updateURL)}
                setDescription={description =>
                  this.setState({ description }, this.updateURL)
                }
                setDifficulty={difficulty =>
                  this.setState({ difficulty }, this.updateURL)
                }
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
  navigator: useNavigator(),
}))(QuestBuilderRoot)
