import React from 'react'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'
import Confetti from 'react-dom-confetti'
import Article from '../Article'
import CTA from '../CTA'
import Info from '../Info'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Radio from '../Radio'
import Sparkles from '../Sparkles'
import getRandomQuestion from '../../helpers/getRandomQuestion'
import microMarkdown from '../../helpers/microMarkdown'
import './index.css'

const Success = () => {
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
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Confetti config={CONFETTI} active={active} />
      </div>
      <Notice icon='star' style={{ marginTop: 0, marginBottom: '2em' }}>
        <span className='Highlight'>Congratulations!</span> The answer is
        correct.
      </Notice>
    </>
  )
}

const Failure = ({ answer }) => {
  return (
    <Notice icon='fire' style={{ marginTop: 0, marginBottom: '2em' }}>
      <span className='Highlight'>Oh no!</span> Unfortunately the answer is not
      correct.
      <details>
        <summary>Do you want to reveal the answer?</summary>
        <p
          className='Highlight'
          style={{ marginBottom: 0, marginTop: '0.5em', fontSize: '120%' }}
        >
          <Sparkles>{answer}</Sparkles>
        </p>
      </details>
    </Notice>
  )
}

const Trivia = () => {
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
    <Article title='Trivia'>
      <Article.Narrow>
        <p>
          Welcome to the{' '}
          <s style={{ textDecoration: 'line-through', opacity: 0.5 }}>
            Thunder
          </s>
          Stormdome! Test your knowledge of Stormbound—both useful and
          useless—with the Stormbound trivia. You can play as little or as long
          as you want as you’re your own opponent.
        </p>

        <form onSubmit={handleSubmit} className='Trivia__form' ref={form}>
          <Notice>{microMarkdown(question.question)}</Notice>

          <fieldset
            className='Trivia__legend'
            disabled={status !== 'UNANSWERED'}
          >
            <legend className='VisuallyHidden'>{question.question}</legend>
            {Object.keys(choices).map(letter => (
              <Radio
                key={letter}
                id={'try-' + letter}
                name='try'
                value={letter}
                className='Trivia__radio'
              >
                {choices[letter]}
              </Radio>
            ))}
          </fieldset>
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
        <Info icon='compass' title='Fun facts'>
          <p>
            If you haven’t had the chance yet, consider reading the{' '}
            <Link to='/guides/trivia'>trivia guide</Link>! It contains little
            fun facts about the game such as the expected gravity acceleration
            in the shattered world of Stormbound.
          </p>
        </Info>
      </Article.Narrow>

      <PageMeta
        title='Trivia'
        description='Test your knownledge of Stormbound with this trivia game!'
      />
    </Article>
  )
}

export default Trivia
