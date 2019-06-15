import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

export default class InputJumlah extends Component {
  state = {
    value: this.props.initialValue
  }

  changeValue(value) {
    this.setState({ value })
  }

  resetValue() {
    this.setState({ value: this.props.initialValue })
  }

  isTouched() {
    return parseInt(this.state.value) !== this.props.initialValue
  }

  render() {
    return (
      <>
        <Input
          type="number"
          value={this.state.value}
          onChange={(event, { value }) => this.changeValue(value)}
          min="1"
        />

        {this.isTouched() ? (
          <Button.Group style={styles.buttonGroup}>
            <Button
              primary
              onClick={() => this.props.onSubmit(this.state.value)}
            >
              Simpan
            </Button>
            <Button color="red" onClick={() => this.resetValue()}>
              Batal
            </Button>
          </Button.Group>
        ) : null}
      </>
    )
  }
}

const styles = {
  buttonGroup: {
    marginTop: 15
  }
}
