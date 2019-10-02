import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Container, Table, Button, Header, Divider, Checkbox } from 'semantic-ui-react'
import axios from 'axios'
import InputJumlah from './InputJumlah'
import { Link } from 'react-router-dom'

export default function Keranjang() {
  const context = useContext(UserContext)
  const [kumpulanKeranjang, setKumpulanKeranjang] = useState([])
  const [organizedData, setOrganizedData] = useState({})
  const [keys, setKeys] = useState([])

  useEffect(() => {
    getKeranjang()
  }, [])

  function getKeranjang() {
    axios
      .get('http://localhost:8000/keranjang', {
        headers: { Authorization: `Bearer ${context.token}` },
      })
      .then(response => {
        const { data } = response
        setKumpulanKeranjang(data)
        const dataOrganized = data.reduce((acc, keranjang) => {
          keranjang.checked = false
          if (!acc[keranjang.produk.id_usaha]) {
            acc[keranjang.produk.id_usaha] = [keranjang]
          } else {
            acc[keranjang.produk.id_usaha].push(keranjang)
          }
          return acc
        }, {})
        setOrganizedData(dataOrganized)
        console.log(dataOrganized)
        setKeys(Object.keys(dataOrganized))
      })
  }

  function changeJumlah(id_keranjang, jumlah) {
    axios
      .put(
        `http://localhost:8000/keranjang/${id_keranjang}`,
        { jumlah },
        {
          headers: { Authorization: `Bearer ${context.token}` },
        },
      )
      .then(() => getKeranjang())
  }

  function getTotalHarga(key) {
    return organizedData[key]
      .map(item => item.produk.harga * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  function getTotalBerat(key) {
    return organizedData[key]
      .map(item => item.produk.berat * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  return (
    <Container>
      {kumpulanKeranjang.length !== 0 ? (
        <React.Fragment>
          {
            keys.map(key => (
              <React.Fragment key={key}>
                <Link to={{
                  pathname: '/usaha',
                  state: organizedData[key][0].produk.usaha
                }}>
                  <Header as="h3">{organizedData[key][0].produk.usaha.nama}</Header>
                </Link>
                <Table celled fixed>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Checklist</Table.HeaderCell>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Nama Produk</Table.HeaderCell>
                      <Table.HeaderCell>Harga</Table.HeaderCell>
                      <Table.HeaderCell>Jumlah</Table.HeaderCell>
                      <Table.HeaderCell>Sub Total</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {organizedData[key].map((keranjang, index) => (
                      <Table.Row key={keranjang.id_keranjang}>
                        <Table.Cell>
                          <Checkbox
                            checked={keranjang.checked}
                          />
                        </Table.Cell>
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
                      <Table.HeaderCell>{getTotalHarga(key)}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
                <Link
                  to={{
                    pathname: '/ongkir',
                    state: {
                      kotaAsal: organizedData[key][0].produk.usaha.kota,
                      namaKotaAsal: organizedData[key][0].produk.usaha.nama_kota,
                      totalBerat: getTotalBerat(key),
                      totalHarga: getTotalHarga(key),
                      idUsaha: key
                    },
                  }}
                >
                  <Button primary style={{ marginBottom: "30px" }}>Lanjutkan</Button>
                </Link>
                <Divider />
              </React.Fragment>
            )
            )}
        </React.Fragment>
      ) : (
          <Header>Keranjang Kosong</Header>
        )}
    </Container>
  )
}
