import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Header,
  Icon,
  Segment,
  Dropdown,
  Button,
  Card,
} from 'semantic-ui-react'

export default class Ongkir extends Component {
  state = {
    provinsi: [],
    kota: [],
    selectedProvinsi: null,
    selectedKota: null,
    idKota: null,
    idProvinsi: null,
    ongkos: null,
  }

  componentDidMount() {
    this.getProvinsi()
  }

  changeJumlah(jumlah) {
    this.setState({ jumlah })
  }

  addKeranjang() {
    axios
      .post('https://marketplace-express.herokuapp.com/keranjang', {
        id_produk: this.state.produk.id_produk,
        jumlah: this.state.jumlah,
      })
      .then((response) => this.props.history.push('/keranjang'))
  }

  getProvinsi = () => {
    axios
      .get('https://marketplace-express.herokuapp.com/provinsi')
      .then((response) => this.setState({ provinsi: response.data }))
  }

  getKota = (e, { value }) => {
    this.setState({ selectedProvinsi: e.target.textContent, idProvinsi: value })
    axios
      .get(`http://marketplace-express.herokuapp.com/provinsi/${value}/kota`)
      .then((response) => {
        this.setState({ kota: response.data })
      })
  }

  getSelectedKota = (e, { value }) => {
    this.setState({ selectedKota: e.target.textContent, idKota: value })
  }

  hitungOngkir = () => {
    const isi = {
      asal: 256,
      tujuan: this.state.idKota,
      berat: 5,
    }
    axios
      .post('https://marketplace-express.herokuapp.com/ongkir', isi)
      .then((response) => {
        let harga = response.data.rajaongkir.results[0].costs.find(
          (cost) => cost.service === 'REG',
        )
        console.log(harga)

        this.setState({ ongkos: harga })
      })
  }

  render() {
    const { provinsi, kota } = this.state

    const optionProvinsi = provinsi.map((provinsi) => ({
      key: provinsi.id_provinsi,
      text: provinsi.nama,
      value: provinsi.id_provinsi,
    }))

    const optionKota = kota.map((kota) => ({
      key: kota.id_kota,
      text: kota.kota,
      value: kota.id_kota,
    }))

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="truck" circular />
          <Header.Content>Ongkir</Header.Content>
          <Header.Content>{}</Header.Content>
        </Header>
        <Segment textAlign="center">
          <p>
            Provinsi:
            <Dropdown
              placeholder="Provinsi"
              search
              selection
              options={optionProvinsi}
              onChange={this.getKota}
            />{' '}
            Kota:
            <Dropdown
              placeholder="Kota"
              search
              selection
              options={optionKota}
              onChange={this.getSelectedKota}
            />
          </p>
          <Button primary onClick={this.hitungOngkir}>
            Hitung Ongkir
          </Button>
          {this.state.ongkos && (
            <Card.Group>
              <Card>
                <Card.Content>
                  <Card.Header>JNE</Card.Header>
                  <Card.Meta>Service: {this.state.ongkos.service}</Card.Meta>
                  <Card.Description>
                    Deskripsi: {this.state.ongkos.description}
                    <br />
                    Harga: {this.state.ongkos.cost[0].value}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      Approve
                    </Button>
                    <Button basic color="red">
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Card.Group>
          )}
        </Segment>
      </Container>
    )
  }
}
