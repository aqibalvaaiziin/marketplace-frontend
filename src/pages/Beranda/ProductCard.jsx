import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'

class CardProduct extends Component {
  render() {
    return (
      <Card>
        <Image src="https://placeimg.com/250/200/tech" />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Description>Rp. {this.props.price}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default CardProduct
