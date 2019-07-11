import React, { useState, useEffect } from 'react'
import {
  Header,
  Icon,
  Table,
  Container,
  Input,
  TableCell,
  Button
} from 'semantic-ui-react'
import axios from 'axios'


function DetailTransaksi(props) {
  const [detailTransaksi, setDetailTransaksi] = useState([])
  const [fileSelected, setFileSelected] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://marketplace-express.herokuapp.com/transaksi/${
        props.location.state
        }/detail`,
      )
      .then((res) => setDetailTransaksi(res.data))
  })


  function uploadFileHandler() {
    const fd = new FormData()
    fd.append('bukti_bayar', fileSelected)
    axios.put(`https://marketplace-express.herokuapp.com/transaksi/${props.location.state}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        document.getElementById('input-bukti').value = ''
        setFileSelected(null)
      })
      .catch((err) => console.log(err))

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
        onChange={ e => setFileSelected(e.target.files[0])}
      />
      &nbsp; &nbsp;
            {fileSelected && (
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
          {detailTransaksi.map((dt) => {
            return (
              <Table.Row key={dt.id_produk}>
                <TableCell>{dt.produk.nama}</TableCell>
                <TableCell>{dt.jumlah}</TableCell>
                <TableCell>{dt.berat}</TableCell>
                <TableCell>{dt.subtotal}</TableCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Container>
  )
}



export default DetailTransaksi