import React, { useState, useEffect } from 'react'
import {
  Header,
  Icon,
  Table,
  Container,
  Input,
  TableCell,
  Button,
} from 'semantic-ui-react'
import axios from 'axios'

function DetailTransaksi(props) {
  const [kumpulanDetailTransaksi, setKumpulanDetailTransaksi] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://marketplace-express.herokuapp.com/transaksi/${
          props.location.state
        }/detail`,
      )
      .then(res => setKumpulanDetailTransaksi(res.data))
  })

  function uploadFileHandler() {
    const fd = new FormData()
    fd.append('bukti_bayar', selectedFile)
    axios
      .put(
        `https://marketplace-express.herokuapp.com/transaksi/${
          props.location.state
        }`,
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(() => {
        document.getElementById('input-bukti').value = ''
        setSelectedFile(null)
      })
  }

  return (
    <Container>
      <Header as="h1" icon textAlign="center">
        <Icon name="cart" circular />
        <Header.Content>Id Transaksi</Header.Content>
        <Header.Content>{props.location.state}</Header.Content>
      </Header>
      <Input
        id="input-bukti"
        label="Pilih File"
        type="file"
        onChange={e => setSelectedFile(e.target.files[0])}
      />
      &nbsp; &nbsp;
      {selectedFile && (
        <Button primary onClick={uploadFileHandler()}>
          Upload
        </Button>
      )}
      <Table singleLine>
        <Table.Header>
          <Table.HeaderCell>Nama Produk</Table.HeaderCell>
          <Table.HeaderCell>Jumlah Produk</Table.HeaderCell>
          <Table.HeaderCell>Berat Produk</Table.HeaderCell>
          <Table.HeaderCell>Subtotal</Table.HeaderCell>
        </Table.Header>

        <Table.Body>
          {kumpulanDetailTransaksi.map(detailTransaksi => (
            <Table.Row key={detailTransaksi.id_produk}>
              <TableCell>{detailTransaksi.produk.nama}</TableCell>
              <TableCell>{detailTransaksi.jumlah}</TableCell>
              <TableCell>{detailTransaksi.berat}</TableCell>
              <TableCell>{detailTransaksi.subtotal}</TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default DetailTransaksi
