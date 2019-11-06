import React, { useState } from 'react'
import {
  Container,
  Accordion,
  Icon,
  Grid,
  Header,
  Button,
  Segment,
  Input,
  Table,
  TableCell
} from 'semantic-ui-react'
import ItemReview from './ItemReview'

function CardLogTransaksi(props) {
  const [activeIndex, setActiveIndex] = useState(null)
  console.log(props)

  function handleClick(event, titleProps) {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }
  return (
    <Container>
      
      <Segment style={styles.verticalSpace}>
      <Header as="h2">Usaha : {props.transaksi.usaha.nama}</Header>
        <Grid columns={2} celled verticalAlign="middle" textAlign="center">
          <Grid.Column width={11} textAlign="left">
            <Header size="medium">
              <Icon name="file alternate outline" />
              <Header.Content style={styles.h2}>
                {props.transaksi.id_transaksi}
                <Header.Subheader>{props.tanggal}</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header size="huge">
              <Header.Content>
                <Header.Subheader>Total Transaksi :</Header.Subheader>
                Rp.{props.transaksi.total_harga + props.transaksi.ongkir}
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid>
        <Table celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nama Produk</Table.HeaderCell>
              <Table.HeaderCell>Jumlah Produk</Table.HeaderCell>
              <Table.HeaderCell>Berat Produk</Table.HeaderCell>
              <Table.HeaderCell>Subtotal</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.transaksi.detail_transaksis.map(detail =>(
              <Table.Row key={detail.id_detiltransaksi}>
                <TableCell>{detail.produk.nama}</TableCell>
                <TableCell>{detail.jumlah}</TableCell>
                <TableCell>{detail.berat}</TableCell>
                <TableCell>{detail.subtotal}</TableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Accordion fluid styled>
          {props.transaksi.selesai &&(
            <>
          <Accordion.Title active={activeIndex === 4} index={4} onClick={handleClick}>
            <Icon name="dropdown" />
            Ulasan
          </Accordion.Title>
          
          <Accordion.Content active={activeIndex=== 4}><ItemReview
          transaksi={props.transaksi}/></Accordion.Content>
          
          </>
          )}
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
                <p>{props.transaksi.total_berat} g</p>
                <p>Rp. {props.transaksi.total_harga}</p>
                <p>Rp. {props.transaksi.ongkir}</p>
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
                <p>{props.transaksi.nama_kota_asal}</p>
                <p>{props.transaksi.nama_kota_tujuan}</p>
                <p>{props.transaksi.detail_alamat}</p>
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
          {
              props.transaksi.konfirmasi ? (
                  <Accordion.Content active={activeIndex === 2}>
                      <Icon name="check" />
                      Terkonfirmasi
                  </Accordion.Content>
              ) : (
                <Accordion.Content active={activeIndex === 2}>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Input label="Pilih file" type="file" />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button basic color="yellow" content='Upload' size="big"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Accordion.Content>
              )
          }
        
          {
            props.transaksi.kirim && (
              <>
              <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={handleClick}>
                  <Icon name="dropdown" />
                  Bukti Pengiriman
              </Accordion.Title>
              {!props.transaksi.selesai ? (

              <Accordion.Content active={activeIndex === 3}>
                <Grid columns={2} divided verticalAlign="middle" textAlign="center">
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Header>
                        <Icon name="shipping fast" />
                        <Header.Content style={styles.h2}>
                          No Resi: {props.transaksi.no_resi}
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign="center">
                      <Button color="green" size="huge" style={{ margin: '10px' }} onClick={(e) => props.selesai(props.transaksi.id_transaksi)}>
                        Diterima
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>

              ):(
                <Accordion.Content active={activeIndex === 3}>
                <Grid columns={2} divided verticalAlign="middle" textAlign="center">
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Header>
                        <Icon name="shipping fast" />
                        <Header.Content style={styles.h2}>
                          No Resi: {props.transaksi.no_resi}
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign="center">
                      Telah Diterima
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>
              )} 
              </> 
            )
        }
          
        </Accordion>
      </Segment>
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
  verticalSpace: {
    marginBottom: 20,
  },
  h2: {
    padding: 10,
  },
}