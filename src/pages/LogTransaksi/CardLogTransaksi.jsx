import React, { Component } from 'react'
import { Card, Container, Grid, Modal, Image, Button } from 'semantic-ui-react'

export default class CardLogTransaksi extends Component {
  render() {
    return (
      <Container>
        <Card fluid style={styles.textColor}>
          <Card.Content>
            <Card.Header>Id transaksi</Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid divided>
              <Grid.Row>
                <Grid.Column width={9}>
                  <Card.Description>kota asal</Card.Description>
                  <Card.Description>tujuan</Card.Description>
                  <Card.Description>detail alamat</Card.Description>
                  <Card.Description>tanggal</Card.Description>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Card.Description>total berat</Card.Description>
                  <Card.Description>total harga</Card.Description>
                  <Card.Description>ongkir</Card.Description>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Image
                    style={styles.imageFloat}
                    src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}

const styles = {
  textColor: {
    color: 'black',
    boxShadow: '2px 3px 6px 3px #ccc',
  },
  imageFloat: {
    width: '60%',
    position: 'relative',
    left: '20%',
    trasnform: 'translateX(-20%)',
  },
}
