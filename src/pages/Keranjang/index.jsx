import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Container, Table, Button, Header } from 'semantic-ui-react'
import axios from 'axios'
import InputJumlah from './InputJumlah'
import { Link } from 'react-router-dom'

export default function Keranjang() {
  const context = useContext(UserContext)
  const [kumpulanKeranjang, setKumpulanKeranjang] = useState([])

  useEffect(() => {
    getKeranjang()
  }, [])

  function getKeranjang() {
    axios
      .get('https://marketplace-express.herokuapp.com/keranjang', {
        headers: { Authorization: `Bearer ${context.token}` },
      })
      .then(response => setKumpulanKeranjang(response.data))
  }

  function changeJumlah(id_keranjang, jumlah) {
    axios
      .put(
        `https://marketplace-express.herokuapp.com/keranjang/${id_keranjang}`,
        { jumlah },
        {
          headers: { Authorization: `Bearer ${context.token}` },
        },
      )
      .then(() => getKeranjang())
  }

  function getTotalHarga() {
    return kumpulanKeranjang
      .map(item => item.produk.harga * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  function getTotalBerat() {
    return kumpulanKeranjang
      .map(item => item.produk.berat * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  return (
    <Container>
      {kumpulanKeranjang.length ? (
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
              {kumpulanKeranjang.map((keranjang, index) => (
                <Table.Row key={keranjang.id_keranjang}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{keranjang.produk.nama}</Table.Cell>
                  <Table.Cell>{keranjang.produk.harga}</Table.Cell>
                  <Table.Cell>
                    <InputJumlah
                      initialValue={keranjang.jumlah}
                      onSubmit={value =>
                        changeJumlah(keranjang.id_keranjang, value)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {keranjang.produk.harga * keranjang.jumlah}
                  </Table.Cell>
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
