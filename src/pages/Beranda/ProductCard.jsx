import React from 'react'
import { Card, Image } from 'semantic-ui-react'

function CardProduct(props) {
  return (
    <Card>
      <Image src="https://placeimg.com/250/200/any" />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Description>Rp. {props.price}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default CardProduct
