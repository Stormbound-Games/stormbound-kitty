import React from 'react'
import { useFela } from 'react-fela'
import BattleSimApp from '~/components/BattleSimApp'
import BattleSimState from '~/components/BattleSimState'
import PageEmbed from '~/components/PageEmbed'
import Spacing from '~/components/Spacing'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import styles from './styles'

const BattleSimEmbed = props => {
  const { css } = useFela()

  return (
    <PageEmbed>
      <BattleSimState
        environment={props.environment}
        simId={props.id}
        mode='DISPLAY'
        sim={getInitialBattleData(props.id)}
      >
        {state => <BattleSimApp withoutGestures {...state} />}
      </BattleSimState>
      {props.children ? (
        <Spacing top='SMALL'>
          <p className={css(styles.caption)}>{props.children}</p>
        </Spacing>
      ) : null}
    </PageEmbed>
  )
}

export default React.memo(BattleSimEmbed)
