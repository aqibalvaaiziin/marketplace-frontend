import React, { useState } from 'react'
import { Input, Button } from 'semantic-ui-react'

export default function InputJumlah(props) {
  const [value, setValue] = useState(props.initialValue)

  function changeValue(value) {
    setValue(value)
  }

  function resetValue() {
    setValue(props.initialValue)
  }

  function isTouched() {
    return parseInt(value) !== props.initialValue
  }

  return (
    <>
      <Input
        type="number"
        value={value}
        onChange={(event, { value }) => changeValue(value)}
        min="1"
      />

      {isTouched() && (
        <Button.Group style={styles.buttonGroup}>
          <Button primary onClick={() => props.onSubmit(value)}>
            Simpan
          </Button>
          <Button color="red" onClick={() => resetValue()}>
            Batal
          </Button>
        </Button.Group>
      )}
    </>
  )
}

const styles = {
  buttonGroup: {
    marginTop: 15,
  },
}
