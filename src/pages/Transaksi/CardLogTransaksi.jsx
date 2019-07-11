import React from 'react'
import { Card, Container, Grid, Image } from 'semantic-ui-react'


function CardLogTransaksi (props){
  return (
          <Container>
            <Card fluid style={styles.textColor}>
              <Card.Content>
                <Card.Header>Id Transaksi : {props.idTransaksi}</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid divided>
                  <Grid.Row>
                    <Grid.Column width={9}>
                      <Card.Description>Kota Asal : {props.kotaAsal}</Card.Description>
                      <Card.Description>Kota Tujuan : {props.tujuan}</Card.Description>
                      <Card.Description>Alamat Tujuan : {props.detailAlamat}</Card.Description>
                      <Card.Description>Tanggal Transaksi : {props.tanggal}</Card.Description>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Card.Description>Total Berat : {props.totalBerat}</Card.Description>
                      <Card.Description>Total Harga : {props.totalHarga}</Card.Description>
                      <Card.Description>Ongkos Kirim :{props.ongkir}</Card.Description>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Image
                        style={styles.imageFloat}
                        src={props.buktiBayar}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Container>
        )
}


export default CardLogTransaksi

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
