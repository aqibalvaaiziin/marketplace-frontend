import React, { Component } from 'react'
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

export default class DetailTransaksi extends Component {
  state = {
    detailTransaksi: [],
    fileSelected: null,
  }

  componentDidMount() {
    axios
      .get(
        `https://marketplace-express.herokuapp.com/transaksi/${
        this.props.location.state
        }/detail`,
      )
      .then((res) => {
        this.setState({
          detailTransaksi: res.data,
        })
      })
  }

  changeFile = (event) => {
    console.log('gambarku ', event.target.files[0])
    this.setState({
      fileSelected: event.target.files[0]
    })
  }

  uploadFileHandler = () => {
    const fd = new FormData()
    fd.append('bukti_bayar', this.state.fileSelected)
    axios.put(`https://marketplace-express.herokuapp.com/transaksi/${this.props.location.state}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        document.getElementById('input-bukti').value = ''
        this.setState({ fileSelected: null })
      })
      .catch((err) => console.log(err))

  }

  render() {

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="cart" circular />
          <Header.Content>Id Transaksi</Header.Content>
          <Header.Content>{this.props.location.state}</Header.Content>
        </Header>
        <Input
          id="input-bukti"
          label="Pilih File"
          type="file"
          onChange={this.changeFile}
        />
        &nbsp; &nbsp;
        {this.state.fileSelected && (
          <Button primary onClick={this.uploadFileHandler}>
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
            {this.state.detailTransaksi.map((dt) => {
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
}


