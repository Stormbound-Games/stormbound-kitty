import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import serialize from 'form-serialize'
import Confetti from 'react-dom-confetti'
import Article from '../Article'
import CTA from '../CTA'
import Info from '../Info'
import Notice from '../Notice'
import Radio from '../Radio'
import Row from '../Row'
import Spacing from '../Spacing'
import Sparkles from '../Sparkles'
import Strikethrough from '../Strikethrough'
import VisuallyHidden from '../VisuallyHidden'
import getRandomQuestion from '../../helpers/getRandomQuestion'
import microMarkdown from '../../helpers/microMarkdown'
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
      <Notice icon='fire'>
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

const Trivia = () => {
  const { css } = useFela()
  const form = React.useRef()
  const [{ question, choices }, setQuestion] = React.useState(
    getRandomQuestion()
  )
  const [status, setStatus] = React.useState('UNANSWERED')

  const askAgain = React.useCallback(() => {
    setQuestion(getRandomQuestion())
    setStatus('UNANSWERED')
    form.current.reset()
  }, [])

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
    [question.answer, choices]
  )

  return (
    <Article
      title='Trivia Game'
      description='Test your knownledge of Stormbound with this trivia game!'
      isEditorialContent
    >
      <Article.Narrow>
        <p>
          Welcome to the <Strikethrough>Thunder</Strikethrough> Stormdome! Test
          your knowledge of Stormbound—both useful and useless—with the
          Stormbound trivia. You can play as little or as long as you want as
          you’re your own opponent.
        </p>

        <Spacing bottom='LARGEST'>
          <form onSubmit={handleSubmit} className={css(styles.form)} ref={form}>
            <Notice>{microMarkdown(question.question)}</Notice>

            <Spacing bottom='LARGE'>
              <fieldset
                className={css(styles.legend)}
                disabled={status !== 'UNANSWERED'}
              >
                <VisuallyHidden as='legend'>{question.question}</VisuallyHidden>
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
        </Spacing>

        <Info icon='compass' title='Fun facts'>
          <p>
            If you haven’t had the chance yet, consider reading the{' '}
            <Link to='/guides/trivia'>trivia guide</Link>! It contains little
            fun facts about the game such as the expected gravity acceleration
            in the shattered world of Stormbound.
          </p>
        </Info>

        <hr />

        <form name='trivia' method='POST'>
          <p>
            <span
              className={
                'Highlight ' +
                css({
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '90%',
                })
              }
            >
              Want to suggest a question?
            </span>{' '}
            Fantastic! Fill the form below (please be considerate, don’t spam).
            You can also get in touch with Kitty#1909 on Discord to discuss it
            if you would rather.
          </p>

          <input type='hidden' name='form-name' value='trivia' />

          <div hidden>
            <label htmlFor='beartrap'>Do not fill you’re a human</label>
            <input type='text' name='beartrap' id='beartrap' />
          </div>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='question'>Your question</label>
              <input type='text' name='question' id='question' required />
            </Row.Column>
            <Row.Column>
              <label htmlFor='answer'>The answer</label>
              <input type='text' name='answer' id='answer' required />
            </Row.Column>
          </Row>
          <CTA type='submit'>Submit</CTA>
        </form>
      </Article.Narrow>
    </Article>
  )
}

export default Trivia
