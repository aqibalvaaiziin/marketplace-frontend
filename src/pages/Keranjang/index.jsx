import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Header } from 'semantic-ui-react'
import axios from 'axios'
import InputJumlah from './InputJumlah'
import { Link } from 'react-router-dom'

export default function Keranjang() {
  const [keranjang, setKeranjang] = useState([])

  useEffect(() => {
    getKeranjang()
  }, [])

  function getKeranjang() {
    axios
      .get('https://marketplace-express.herokuapp.com/keranjang')
      .then((response) => setKeranjang(response.data))
  }

  function changeJumlah(id_keranjang, jumlah) {
    axios
      .put(
        `https://marketplace-express.herokuapp.com/keranjang/${id_keranjang}`,
        { jumlah },
      )
      .then(() => getKeranjang())
  }

  function getTotalHarga() {
    return keranjang
      .map((item) => item.produk.harga * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  function getTotalBerat() {
    return keranjang
      .map((item) => item.produk.berat * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  return (
    <Container>
      {keranjang.length ? (
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
              {keranjang.map((item, index) => (
                <Table.Row key={item.id_keranjang}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item.produk.nama}</Table.Cell>
                  <Table.Cell>{item.produk.harga}</Table.Cell>
                  <Table.Cell>
                    <InputJumlah
                      initialValue={item.jumlah}
                      onSubmit={(value) =>
                        changeJumlah(item.id_keranjang, value)
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
                <Table.HeaderCell>{getTotalHarga()}</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

          <Link
            to={{
              pathname: '/ongkir',
              state: {
                totalBerat: getTotalBerat(),
                totalHarga: getTotalHarga(),
              },
            }}>
            <Button primary>Lanjutkan</Button>
          </Link>
        </>
      ) : (
        <Header>Keranjang Kosong</Header>
      )}
    </Container>
  )
}
