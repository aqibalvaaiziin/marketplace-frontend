import React, { useState, useEffect, useContext } from 'react'
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
import { UserContext } from '../../App'

export default function Ongkir(props) {
  
  if (props.location.state.totalBerat === 0 || props.location.state.totalBerat === 0) {
    props.history.push('/keranjang')
  }

  const context = useContext(UserContext)

  const [kumpulanProvinsi, setKumpulanProvinsi] = useState([])
  const [kumpulanKota, setKumpulanKota] = useState([])
  const [idKota, setIdKota] = useState()
  const [idProvinsi, setIdProvinsi] = useState()
  const [detailAlamat, setDetailAlamat] = useState("")
  const [ongkos, setOngkos] = useState()
  const [kotaTujuan, setKotaTujuan] = useState("")
  const [error, setError] = useState(false)

  const optionProvinsi = kumpulanProvinsi.map(provinsi => ({
    key: provinsi.id_provinsi,
    text: provinsi.provinsi,
    value: provinsi.id_provinsi,
  }))

  const optionKota = kumpulanKota.map(kota => ({
    key: kota.id_kota,
    value: kota.id_kota,
    text: kota.tipe === 'Kabupaten' ? `${kota.tipe} ${kota.kota}` : kota.kota,
  }))

  useEffect(() => {
    getProvinsi()
  }, [])

  function changeDetailAlamat(event) {
    setDetailAlamat(event.target.value)
  }

  function getProvinsi() {
    axios
      .get('http://localhost:8000/provinsi')
      .then(response => setKumpulanProvinsi(response.data))
  }

  function getKota(e, { value }) {
    setIdProvinsi(value)
    axios
      .get(`http://localhost:8000/provinsi/${value}/kota`)
      .then(response => {
        setKumpulanKota(response.data)
      })
  }

  function getSelectedKota(e, { value }) {
    const kota = kumpulanKota.find((town) => town.id_kota == value)
    setKotaTujuan(`${kota.tipe} ${kota.kota}`)
    setIdKota(value)
  }

  function hitungOngkir() {
    axios
      .post('http://localhost:8000/ongkir', {
        kota_asal: props.location.state.kotaAsal,
        kota_tujuan: idKota,
        berat: props.location.state.totalBerat,
      })
      .then(response => {
        if (response.data.error) {
          setError(true)
          setOngkos(0)
        } else {
          setOngkos(response.data.cost[0].value)
          setError(false)
        }
      })
  }

  function bayar(id) {
    axios
      .post(
        'http://localhost:8000/transaksi',
        {
          id_usaha: id,
          id_keranjang: props.location.state.idKeranjang,
          ongkir: ongkos,
          kota_asal: props.location.state.kotaAsal,
          kota_tujuan: idKota,
          detail_alamat: detailAlamat,
          nama_kota_asal: props.location.state.namaKotaAsal,
          nama_kota_tujuan: kotaTujuan
        },
        { headers: { Authorization: `Bearer ${context.token}` } },
      )
      .then(() => props.history.push('/transaksi'))
  }

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
                value={idProvinsi}
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
                value={idKota}
              />
            </Grid.Column>
            <Grid.Column width="3">
              <Button primary onClick={hitungOngkir}>
                Cek Ongkir
              </Button>
            </Grid.Column>
          </Grid.Row>
          {ongkos && (
            <>
              <Grid.Row>
                <Grid.Column>
                  <Header content="JNE REGULAR" subheader={`Rp. ${ongkos}`} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    type="text"
                    label="Alamat"
                    value={detailAlamat}
                    onChange={changeDetailAlamat}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button primary onClick={bayar.bind(this, props.location.state.idUsaha)}>
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
