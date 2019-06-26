import React, { Component } from 'react'
import { Container, Table, Button, Header } from 'semantic-ui-react'
import axios from 'axios'
import InputJumlah from './InputJumlah'

export default class Home extends Component {
  state = {
    keranjang: [],
  }

  componentDidMount() {
    this.getKeranjang()
  }

  getKeranjang() {
    axios
      .get('https://marketplace-express.herokuapp.com/keranjang')
      .then((response) => this.setState({ keranjang: response.data }))
  }

  changeJumlah(id_keranjang, jumlah) {
    axios
      .put(
        `https://marketplace-express.herokuapp.com/keranjang/${id_keranjang}`,
        { jumlah },
      )
      .then(() => this.getKeranjang())
  }

  getTotal() {
    return this.state.keranjang
      .map((item) => item.produk.harga * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  render() {
    return (
      <Container>
        <Header
          size="large"
          content="Keranjang"
          subheader="Daftar produk yang akan dipesan"
        />
        {this.state.keranjang.length ? (
          <>
            <Table celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No</Table.HeaderCell>
                  <Table.HeaderCell>Nama Produk</Table.HeaderCell>
                  <Table.HeaderCell>Harga</Table.HeaderCell>
                  <Table.HeaderCell>Jumlah</Table.HeaderCell>
                  <Table.HeaderCell>Sub Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.keranjang.map((item, index) => (
                  <Table.Row key={item.id_keranjang}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.produk.nama}</Table.Cell>
                    <Table.Cell>{item.produk.harga}</Table.Cell>
                    <Table.Cell>
                      <InputJumlah
                        initialValue={item.jumlah}
                        onSubmit={(value) =>
                          this.changeJumlah(item.id_keranjang, value)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{item.produk.harga * item.jumlah}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell textAlign="right" colSpan="4">
                    Total
                  </Table.HeaderCell>
                  <Table.HeaderCell>{this.getTotal()}</Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>

            <Button primary>Bayar</Button>
          </>
        ) : (
          <Header>Keranjang Kosong</Header>
        )}
      </Container>
    )
  }
}
