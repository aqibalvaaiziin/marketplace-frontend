import React, { Component } from 'react'
import {
  Header,
  Icon,
  Table,
  Container,
  Input,
  TableCell,
} from 'semantic-ui-react'
import axios from 'axios'

export default class DetailTransaksi extends Component {
  state = {
    detailTransaksi: [],
    image: {
      preview: '',
    },
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

  changeImage(file) {
    URL.revokeObjectURL(this.state.preview)
    this.setState({ preview: URL.createObjectURL(file) })
  }

  encodeImageFileAsURL(element) {
    let file = element.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
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
          type="file"
          onChange={(event) => this.changeImage(event.target.files[0])}
          label="Upload Bukti Transaksi"
        />

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
                <Table.Row>
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
