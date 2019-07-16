import React, { useState, useEffect } from 'react'
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

export default function Ongkir(props) {
  const [provinsi, setProvinsi] = useState([])
  const [kota, setKota] = useState([])
  const [selectedProvinsi, setSelectedProvinsi] = useState()
  const [selectedKota, setSelectedKota] = useState()
  const [idKota, setIdKota] = useState([])
  const [idProvinsi, setIdProvinsi] = useState()
  const [detail_alamat, setDetailAlamat] = useState()
  const [ongkos, setOngkos] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    getProvinsi()
  }, [])

  // function changeJumlah(jumlah) {
  //   this.setState({ jumlah })
  // }

  function changeDetailAlamat(event) {
    setDetailAlamat(event.target.value)
  }

  // function addKeranjang() {
  //   axios
  //     .post('https://marketplace-express.herokuapp.com/keranjang', {
  //       id_produk: this.state.produk.id_produk,
  //       jumlah: this.state.jumlah,
  //     })
  //     .then((response) => this.props.history.push('/keranjang'))
  // }

  function getProvinsi() {
    axios
      .get('https://marketplace-express.herokuapp.com/provinsi')
      .then((response) => setProvinsi(response.data))
  }

  function getKota(e, { value }) {
    setSelectedProvinsi(e.target.textContent)
    setIdProvinsi(value)

    axios
      .get(`http://marketplace-express.herokuapp.com/provinsi/${value}/kota`)
      .then((response) => {
        setKota(response.data)
      })
  }

  function getSelectedKota(e, { value }) {
    setSelectedKota(e.target.textContent)
    setIdKota(value)
  }

  function hitungOngkir() {
    const isi = {
      asal: 256,
      tujuan: idKota,
      berat: props.location.state.totalBerat,
    }
    axios
      .post('https://marketplace-express.herokuapp.com/ongkir', isi)
      .then((response) => {
        if (response.data.error) {
          setError(true)
          setOngkos(0)
        } else {
          setOngkos(response.data.cost[0].value)
          setError(false)
        }
      })
  }

  function bayar() {
    axios
      .post('https://marketplace-express.herokuapp.com/transaksi', {
        ongkir: ongkos,
        kota_asal: 256,
        kota_tujuan: idKota,
        detail_alamat: detail_alamat,
      })
      .then(() => props.history.push('/transaksi'))
  }

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
                onChange={getKota}
              />
            </Grid.Column>

            <Grid.Column width="5">
              <Dropdown
                placeholder="Kota"
                fluid
                search
                selection
                options={optionKota}
                onChange={getSelectedKota}
              />
            </Grid.Column>
            <Grid.Column width="3">
              <Button primary onClick={hitungOngkir}>
                Cek Ongkir
              </Button>
            </Grid.Column>
          </Grid.Row>
          {ongkos > 0 && (
            <>
              <Grid.Row>
                <Grid.Column>
                  <Header content="JNE REGULAR" subheader={'Rp. ' + ongkos} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    type="text"
                    label="Alamat"
                    value={detail_alamat}
                    onChange={changeDetailAlamat}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button primary onClick={bayar}>
                    Bayar
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </>
          )}

          {error && (
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
