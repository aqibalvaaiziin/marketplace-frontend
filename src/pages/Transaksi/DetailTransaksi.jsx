import React, { Component } from 'react'
import {
  Header,
  Icon,
  Table,
  Container,
  Input,
  TableCell,
  Button,
  Modal,
  Image,
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

  fileSelectHandler(files) {
    let reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (event) => {
      this.setState({
        fileSelected: event.target.result,
      })
    }
  }

  uploadFileHandler() {
    axios
      .put(
        `https://marketplace-express.herokuapp.com/transaksi/${
          this.props.location.state
        }`,
        {
          bukti_bayar: this.state.fileSelected,
        },
      )
      .then((res) => this.setState({ fileSelected: null }))
      .catch((err) => console.log(err))
  }

  render() {
    const { open } = this.state

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="cart" circular />
          <Header.Content>Id Transaksi</Header.Content>
          <Header.Content>{this.props.location.state}</Header.Content>
        </Header>
        <Input
          label="Pilih File"
          type="file"
          onChange={(event) => this.fileSelectHandler(event.target.files)}
        />
        &nbsp; &nbsp;
        {this.state.fileSelected && (
          <Button primary onClick={() => this.uploadFileHandler()}>
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

const styles = {
  timesFolated: {
    marginLeft: '78%',
    cursor: 'pointer',
  },
  inputStyle: {
    display: 'none',
  },
}
