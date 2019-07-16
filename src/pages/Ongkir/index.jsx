import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Header,
  Icon,
  Segment,
  Dropdown,
  Button,
  Grid,
  Input,
} from 'semantic-ui-react'

export default class Ongkir extends Component {
  state = {
    provinsi: [],
    kota: [],
    selectedProvinsi: null,
    selectedKota: null,
    idKota: null,
    idProvinsi: null,
    detail_alamat: '',
    ongkos: 0,
    error: false,
  }

  componentDidMount() {
    this.getProvinsi()
  }

  changeJumlah(jumlah) {
    this.setState({ jumlah })
  }

  changeDetailAlamat = (event) => {
    this.setState({ detail_alamat: event.target.value })
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
    this.setState({ selectedKota: e.target.textContent, idKota: value }, () => {
      this.hitungOngkir()
    })
  }

  hitungOngkir = () => {
    const isi = {
      asal: 256,
      tujuan: this.state.idKota,
      berat: this.props.location.state.totalBerat,
    }
    axios
      .post('https://marketplace-express.herokuapp.com/ongkir', isi)
      .then((response) => {
        if (response.data.error) {
          this.setState({
            error: true,
            ongkos: 0,
          })
        } else {
          this.setState({
            ongkos: response.data.cost[0].value,
            error: false,
          })
        }
      })
  }

  bayar = () => {
    axios
      .post('https://marketplace-express.herokuapp.com/transaksi', {
        ongkir: this.state.ongkos,
        kota_asal: 256,
        kota_tujuan: this.state.idKota,
        detail_alamat: this.state.detail_alamat,
      })
      .then(() => this.props.history.push('/transaksi'))
  }

  render() {
    const { provinsi, kota } = this.state
    const optionProvinsi = provinsi.map((provinsi) => ({
      key: provinsi.id_provinsi,
      text: provinsi.provinsi,
      value: provinsi.id_provinsi,
    }))

    const optionKota = kota.map((kota) => {
      if (kota.tipe === 'Kabupaten') {
        return {
          key: kota.id_kota,
          text: kota.tipe + ' ' + kota.kota,
          value: kota.id_kota,
        }
      } else {
        return {
          key: kota.id_kota,
          text: kota.kota,
          value: kota.id_kota,
        }
      }
    })

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="truck" circular />
          <Header.Content>Ongkir</Header.Content>
        </Header>
        <Segment textAlign="center">
          <Grid textAlign="center">
            <Grid.Row>
              <Grid.Column width="5">Provinsi</Grid.Column>
              <Grid.Column width="5">Kota</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width="5">
                <Dropdown
                  placeholder="Provinsi"
                  fluid
                  search
                  selection
                  options={optionProvinsi}
                  onChange={this.getKota}
                />
              </Grid.Column>

              <Grid.Column width="5">
                <Dropdown
                  placeholder="Kota"
                  fluid
                  search
                  selection
                  options={optionKota}
                  onChange={this.getSelectedKota}
                />
              </Grid.Column>
            </Grid.Row>
            {this.state.ongkos > 0 && (
              <>
                <Grid.Row>
                  <Grid.Column>
                    <Header
                      content="JNE REGULAR"
                      subheader={'Rp. ' + this.state.ongkos}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Input
                      type="text"
                      label="Alamat"
                      value={this.state.detail_alamat}
                      onChange={this.changeDetailAlamat}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button primary onClick={this.bayar}>
                      Bayar
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </>
            )}

            {this.state.error && (
              <Grid.Row>
                <Grid.Column>
                  <Header content="JNE REG Tidak Tersedia" />
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Segment>
      </Container>
    )
  }
}
