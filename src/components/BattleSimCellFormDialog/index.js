import React from 'react'
import Dialog from '../Dialog'
import CellForm from '../BattleSimCellForm'
import './index.css'

const BattleSimCellFormDialog = props => (
  <Dialog
    id='cell-form-dialog'
    title='Current cell'
    dialogRef={props.dialogRef}
    close={props.close}
    image={null}
    hideHeader={true}
    allowScroll={true}
  >
    <CellForm {...props} />
  </Dialog>
)

export default BattleSimCellFormDialog
