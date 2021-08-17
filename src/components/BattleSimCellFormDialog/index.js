import React from 'react'
import CellForm from '~/components/BattleSimCellForm'
import Dialog from '~/components/Dialog'
import styles from './styles'

export default React.memo(function BattleSimCellFormDialog(props) {
  return (
    <Dialog
      id='cell-form-dialog'
      title='Current cell'
      dialogRef={props.dialogRef}
      close={props.close}
      image={null}
      hideHeader={true}
      allowScroll={true}
      extend={{
        container: styles.container,
        dialog: styles.dialog,
        overlay: styles.overlay,
        body: styles.body,
      }}
    >
      <CellForm {...props} />
    </Dialog>
  )
})
