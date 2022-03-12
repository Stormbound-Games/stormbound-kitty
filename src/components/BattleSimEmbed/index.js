import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import BattleSimApp from '~/components/BattleSimApp'
import PageEmbed from '~/components/PageEmbed'
import Spacing from '~/components/Spacing'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import useBattleSim from '~/hooks/useBattleSim'
import styles from './styles'

const BattleSimEmbed = props => {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const state = useBattleSim({
    ...props,
    mode: 'DISPLAY',
    sim: getInitialBattleData(cardsIndex, props.id),
  })

  return (
    <PageEmbed>
      <BattleSimApp withoutGestures {...state} />
      {props.children ? (
        <Spacing top='SMALL'>
          <p className={css(styles.caption)}>{props.children}</p>
        </Spacing>
      ) : null}
    </PageEmbed>
  )
}

export default React.memo(BattleSimEmbed)
