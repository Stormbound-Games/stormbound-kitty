import React from 'react'
import Article from '../Article'
import Column from '../Column'
import Row from '../Row'
import Title from '../Title'
import TornadoSignup from '../TornadoSignup'

export default React.memo(function TournamentTornado(props) {
  return (
    <Article title='Tornado' author='Stratadox'>
      <Article.Narrow>
        <Row desktopOnly wideGutter>
          <Column>
            <Title>Signup</Title>
            <TornadoSignup />
          </Column>
          <Column>
            <Title>Log in</Title>
          </Column>
        </Row>
      </Article.Narrow>
    </Article>
  )
})
