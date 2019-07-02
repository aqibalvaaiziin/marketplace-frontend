import React, { Component } from 'react'
import { Card, Container, Grid, Image } from 'semantic-ui-react'

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
                  <Card.Description>Kota Asal : {this.props.kotaAsal}</Card.Description>
                  <Card.Description>Kota Tujuan : {this.props.tujuan}</Card.Description>
                  <Card.Description>Alamat Tujuan : {this.props.detailAlamat}</Card.Description>
                  <Card.Description>Tanggal Transaksi : {this.props.tanggal}</Card.Description>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Card.Description>Total Berat : {this.props.totalBerat}</Card.Description>
                  <Card.Description>Total Harga : {this.props.totalHarga}</Card.Description>
                  <Card.Description>Ongkos Kirim :{this.props.ongkir}</Card.Description>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Image
                    style={styles.imageFloat}
                    src={this.props.buktiBayar}
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
    width: '90%',
    marginTop: '5px'
  },
}
