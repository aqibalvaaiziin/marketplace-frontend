import React, { useState } from 'react'
import {
  Container,
  Accordion,
  Icon,
  Grid,
  Header,
  Button,
} from 'semantic-ui-react'

function CardLogTransaksi(props) {
  const [activeIndex, setActiveIndex] = useState(null)

  function handleClick(event, titleProps) {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  return (
    <Container>
      <Grid columns={3} celled verticalAlign="middle" textAlign="center">
        <Grid.Column width={7} textAlign="left">
          <Header size="medium">
            <Icon name="file alternate outline" />
            <Header.Content style={styles.h2}>
              {props.idTransaksi}
              <Header.Subheader>{props.tanggal}</Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header size="huge">
            <Header.Content>
              <Header.Subheader>Total Transaksi :</Header.Subheader>
              Rp.{props.totalTransaksi + props.ongkir}
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button basic color="blue" onClick={props.onDetailButtonClick}>
            Detail Keranjang
          </Button>
        </Grid.Column>
      </Grid>
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}>
          <Icon name="dropdown" />
          Rincian Pembayaran
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <div style={styles.box}>
            <div style={styles.boxTitle}>
              <p>Total Berat</p>
              <p>Total Harga Produk</p>
              <p>Ongkos Kirim</p>
            </div>
            <div style={styles.boxColon}>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div style={styles.boxValue}>
              <p>{props.totalBerat} g</p>
              <p>Rp. {props.totalTransaksi}</p>
              <p>Rp. {props.ongkir}</p>
            </div>
          </div>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}>
          <Icon name="dropdown" />
          Alamat Transaksi
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <div style={styles.box}>
            <div style={styles.boxTitle}>
              <p>Kota Asal</p>
              <p>Kota Tujuan</p>
              <p>Alamat Tujuan</p>
            </div>
            <div style={styles.boxColon}>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div style={styles.boxValue}>
              <p>{props.kotaAsal}</p>
              <p>{props.tujuan}</p>
              <p>{props.detailAlamat}</p>
            </div>
          </div>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}>
          <Icon name="dropdown" />
          Bukti Pembayaran
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>kosong</Accordion.Content>
      </Accordion>
    </Container>
  )
}

export default CardLogTransaksi

const styles = {
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  boxColon: {
    marginLeft: 10,
  },
  boxValue: {
    marginLeft: 10,
  },
  titleMargin: {
    marginLeft: 18,
    padding: 0,
  },
  date: {
    marginLeft: 18,
    padding: 0,
  },
  floatRight: {
    textAlign: 'right',
  },
  h2: {
    padding: 10,
  },
}
