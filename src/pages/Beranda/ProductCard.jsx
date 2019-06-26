import React, { Component } from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import axios from 'axios'

class CardProduct extends Component {
  addToCart() {
    axios
      .post('https://marketplace-express.herokuapp.com/keranjang', {
        id_produk: this.state.produk.id_produk,
        jumlah: this.state.jumlah,
      })
      .then((response) => this.props.history.push('/keranjang'))
  }

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
