import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import serialize from 'form-serialize'
import Confetti from 'react-dom-confetti'
import Page from '~/components/Page'
import CTA from '~/components/CTA'
import Info from '~/components/Info'
import Notice from '~/components/Notice'
import Radio from '~/components/Radio'
import Spacing from '~/components/Spacing'
import Sparkles from '~/components/Sparkles'
import Strikethrough from '~/components/Strikethrough'
import VisuallyHidden from '~/components/VisuallyHidden'
import getRandomQuestion from '~/helpers/getRandomQuestion'
import microMarkdown from '~/helpers/microMarkdown'
import styles from './styles'

const Success = () => {
  const { css } = useFela()
  const [active, setActive] = React.useState(false)

  const CONFETTI = {
    angle: 90,
    spread: 180,
    startVelocity: 40,
    elementCount: 35,
    dragFriction: 0.15,
    duration: 2000,
    stagger: 0,
    width: '10px',
    height: '10px',
    perspective: '1000px',
    colors: [
      'var(--winter)',
      'var(--shadowfen)',
      'var(--swarm)',
      'var(--ironclad)',
      'var(--beige)',
    ],
  }

  React.useEffect(() => setActive(true), [])

  return (
    <>
      <div
        className={css({
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        })}
      >
        <Confetti config={CONFETTI} active={active} />
      </div>

      <Spacing bottom='LARGE'>
        <Notice icon='star'>
          <span className='Highlight'>Congratulations!</span> The answer is
          correct.
        </Notice>
      </Spacing>
    </>
  )
}

const Failure = ({ answer }) => {
  const { css } = useFela()

  return (
    <Spacing bottom='LARGE'>
      <Notice icon='fire' as='div'>
        <span className='Highlight'>Oh no!</span> Unfortunately the answer is
        not correct.
        <details>
          <summary>Do you want to reveal the answer?</summary>
          <Spacing top='SMALLER' bottom='NONE'>
            <p className={css({ color: 'var(--beige)', fontSize: '120%' })}>
              <Sparkles>{answer}</Sparkles>
            </p>
          </Spacing>
        </details>
      </Notice>
    </Spacing>
  )
}

export default React.memo(function PageTrivia(props) {
  const { css } = useFela()
  const form = React.useRef()
  const [{ question, choices }, setQuestion] = React.useState({})
  const [status, setStatus] = React.useState('UNANSWERED')

  React.useEffect(
    () => setQuestion(getRandomQuestion(props.questions)),
    [props.questions]
  )

  const askAgain = React.useCallback(() => {
    setQuestion(getRandomQuestion(props.questions))
    setStatus('UNANSWERED')
    form.current.reset()
  }, [props.questions])

  const handleSubmit = React.useCallback(
    event => {
      event.preventDefault()

      const formData = serialize(event.target, { hash: true })

      // For some reason, using the `required` attribute on the radio inputs
      // cause the HTML validation to trigger when the ‘New question’ button is
      // being pressed.
      if (!formData.try) return

      const proposition = String(choices[formData.try])
      const answer = String(question.answer)

      setStatus(proposition === answer ? 'SUCCESS' : 'FAILURE')
    },
    [question, choices]
  )

  return (
    <Page
      title='Trivia Game'
      description='Test your knownledge of Stormbound with this trivia game!'
      isEditorialContent
    >
      <Page.Narrow>
        <p>
          Welcome to the <Strikethrough>Thunder</Strikethrough> Stormdome! Test
          your knowledge of Stormbound—both useful and useless—with the
          Stormbound trivia. You can play as little or as long as you want as
          you’re your own opponent.
        </p>

        <Spacing top='LARGE' bottom='LARGEST'>
          {question ? (
            <form
              onSubmit={handleSubmit}
              className={css(styles.form)}
              ref={form}
            >
              <Notice>{microMarkdown(question.question)}</Notice>

              <Spacing top='BASE' bottom='LARGE'>
                <fieldset
                  className={css(styles.legend)}
                  disabled={status !== 'UNANSWERED'}
                >
                  <VisuallyHidden as='legend'>
                    {question.question}
                  </VisuallyHidden>
                  {Object.keys(choices).map(letter => (
                    <Radio
                      key={letter}
                      id={'try-' + letter}
                      name='try'
                      value={letter}
                      extend={styles.radio}
                    >
                      {choices[letter]}
                    </Radio>
                  ))}
                </fieldset>
              </Spacing>

              {status === 'FAILURE' && <Failure {...question} />}
              {status === 'SUCCESS' && <Success />}
              {status === 'UNANSWERED' ? (
                <CTA type='submit'>Confirm</CTA>
              ) : (
                <CTA type='button' onClick={askAgain}>
                  New question
                </CTA>
              )}
            </form>
          ) : (
            <Notice>Enable JavaScript to play the Trivia game.</Notice>
          )}
        </Spacing>

        <Info icon='compass' title='Fun facts'>
          <p>
            If you haven’t had the chance yet, consider reading the{' '}
            <Link to='/guides/trivia'>trivia guide</Link>! It contains little
            fun facts about the game such as the expected gravity acceleration
            in the shattered world of Stormbound.
          </p>
        </Info>
      </Page.Narrow>
    </Page>
  )
})
