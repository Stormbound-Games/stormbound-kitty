import React from 'react'
import Dialog from '../Dialog'
import CellForm from '../BSCellForm'
import './index.css'

const BSCellFormDialog = props => {
  return (
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
}

export default BSCellFormDialog
