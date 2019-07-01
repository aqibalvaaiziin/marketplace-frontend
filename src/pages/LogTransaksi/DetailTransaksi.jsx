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
  Image
} from 'semantic-ui-react'
import axios from 'axios'

export default class DetailTransaksi extends Component {
  state = {
    detailTransaksi: [],
    open: false,
    fileSelected: null,
    visible: false
  }

  checkValue = () => {
    if (this.state.fileSelected == null) {
      this.setState({
        visible: !this.state.visible
      })
    }
  }

  show = dimmer => () => {
    this.setState({ dimmer, open: true })
  }
  close = () => this.setState({ open: false })

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

  fileSelectHandler = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (event) => {
      this.setState({
        fileSelected: event.target.result
      })
    }
    this.checkValue()
  }

  uploadFileHandler = () => {
    axios.put(`https://marketplace-express.herokuapp.com/transaksi/${this.props.location.state}`, {
      bukti_bayar: this.state.fileSelected
    })
      .then((res) => {
        console.log('data : ', res.data)
      })
      .catch(error => {
        console.log('error :', error)
      })
    this.close()
  }



  render() {

    const { open, dimmer } = this.state

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
          onChange={this.fileSelectHandler}
        />
        <br /><br />
        {
          this.state.visible
          &&
          <Button onClick={this.show('blurring')}>View & upload</Button>
        }

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

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Bukti Pembayaran <Icon name="times" style={styles.timesFolated} onClick={this.close} /></Modal.Header>
          <Modal.Content>
            <Image centered size='large' src={this.state.fileSelected} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Upload Gambar"
              onClick={this.uploadFileHandler}
            />
          </Modal.Actions>
        </Modal>

      </Container>
    )
  }
}

const styles = {
  timesFolated: {
    marginLeft: '78%',
    cursor: 'pointer'
  },
  inputStyle: {
    display: 'none'
  }
}