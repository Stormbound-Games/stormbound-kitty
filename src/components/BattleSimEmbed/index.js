import React from 'react'
import { useFela } from 'react-fela'
import BattleSimApp from '~/components/BattleSimApp'
import BattleSimState from '~/components/BattleSimState'
import Guide, { GuideRenderingContext } from '~/components/Guide'
import Spacing from '~/components/Spacing'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import styles from './styles'

const BattleSimEmbed = props => {
  const { css } = useFela()
  const { isWithinGuide } = React.useContext(GuideRenderingContext)
  const Container = isWithinGuide ? Guide.FullWidth : React.Fragment

  return (
    <Container>
      <BattleSimState
        environment={props.environment}
        simId={props.id}
        mode='DISPLAY'
        sim={getInitialBattleData(props.id)}
      >
        {state => <BattleSimApp {...state} />}
      </BattleSimState>
      {props.children ? (
        <Spacing top='BASE'>
          <p className={css(styles.caption)}>{props.children}</p>
        </Spacing>
      ) : null}
    </Container>
  )
}

export default React.memo(BattleSimEmbed)
