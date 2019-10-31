import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Container, Table, Button, Header, Divider, Checkbox, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import InputJumlah from './InputJumlah'
import { Link } from 'react-router-dom'

export default function Keranjang() {
  const context = useContext(UserContext)
  const [kumpulanKeranjang, setKumpulanKeranjang] = useState([])
  const [organizedData, setOrganizedData] = useState({})
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [berat, setBerat] = useState(0)
  const [harga, setHarga] = useState(0)
  const [idKeranjang, setIdKeranjang] = useState([])

  useEffect(() => {
    getKeranjang()
  }, [])

  function getKeranjang() {
    setLoading(true)
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
        setKeys(Object.keys(dataOrganized))
        setLoading(false)
      })
  }

  function changeJumlah(id_keranjang, jumlah) {
    if(jumlah <= 0) {
      axios
        .delete(
          `http://localhost:8000/keranjang/${id_keranjang}`,
          {
            headers: { Authorization: `Bearer ${context.token}` },
          },
        )
        .then(() => getKeranjang())
    } else {
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
  }

  function getTotalHarga(key) {
    if ((organizedData[key].filter(item => item.checked)).length > 0) {
      setHarga(organizedData[key]
        .filter(item => item.checked)
        .map(item => item.produk.harga * item.jumlah)
        .reduce((prev, next) => prev + next))
    }
    return 0
  }

  function getSubtotalHarga(key) {
    return organizedData[key]
      .map(item => item.produk.harga * item.jumlah)
      .reduce((prev, next) => prev + next)
  }

  function getTotalBerat(key) {
    if ((organizedData[key].filter(item => item.checked)).length > 0) {
      setBerat(organizedData[key]
        .filter(item => item.checked)
        .map(item => item.produk.berat * item.jumlah)
        .reduce((prev, next) => prev + next))
    }
    return 0
  }

  function getIdKeranjang(key) {
    let arrId = []
    organizedData[key].forEach(item => {
      if (item.checked) {
        arrId.push(item.id_keranjang)
      }
    })
    setIdKeranjang(arrId)
  }

  function checkDetail(key, index) {
    let data = organizedData;
    data[key][index].checked = !data[key][index].checked
    getTotalBerat(key)
    getTotalHarga(key)
    getIdKeranjang(key)
    setOrganizedData(data)
  }

  return (
    <Container>
      {
        (loading) ? (
          <>
            <Placeholder fluid>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
            <Placeholder fluid>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </>
        ) : [
          kumpulanKeranjang.length !== 0 ? (
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
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={1}/>
                          <Table.HeaderCell>No</Table.HeaderCell>
                          <Table.HeaderCell>Nama Produk</Table.HeaderCell>
                          <Table.HeaderCell>Harga</Table.HeaderCell>
                          <Table.HeaderCell width={3}>Jumlah</Table.HeaderCell>
                          <Table.HeaderCell>Sub Total</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
    
                      <Table.Body>
                        {organizedData[key].map((keranjang, index) => (
                          <Table.Row key={keranjang.id_keranjang}>
                            <Table.Cell collapsing textAlign="center">
                              <Checkbox
                                value={keranjang.checked}
                                onChange={() => checkDetail(key, index)}
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
    
                      <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell textAlign="right" colSpan="5">
                            Total
                          </Table.HeaderCell>
                          <Table.HeaderCell>{getSubtotalHarga(key)}</Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                    <Link
                      to={{
                        pathname: '/ongkir',
                        state: {
                          kotaAsal: organizedData[key][0].produk.usaha.kota,
                          namaKotaAsal: organizedData[key][0].produk.usaha.nama_kota,
                          totalBerat: berat,
                          totalHarga: harga,
                          idKeranjang: idKeranjang,
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
            )  
        ]
      }
    </Container>
  )
}
