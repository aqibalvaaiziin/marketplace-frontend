import React, { useState, useContext, useEffect } from 'react'
import {
  Container,
  Header,
  Icon,
  Card,
  Form,
  Dropdown,
  Input,
  Segment,
  Dimmer,
  Loader,
  Image,
} from 'semantic-ui-react'
import { UserContext, HOSTNAME } from '../../App'
import axios from 'axios'

function TambahProduk(props) {
  const context = useContext(UserContext)
  const [input, setInput] = useState({
    nama: '',
    stok: 0,
    id_kategori: '',
    harga: 0,
    berat: 0,
    deskripsi: '',
  })
  const [kumpulanKategori, setKumpulanKategori] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
    axios.get(`${HOSTNAME}/kategori`).then(res => {
      const kategoriOptions = res.data.map(kategori => {
        const katOption = {
          key: kategori.id_kategori,
          text: kategori.nama_kategori,
          value: kategori.id_kategori,
        }
        return katOption
      })
      setKumpulanKategori(kategoriOptions)
      setloading(false)
    })
  }, [])

  function changeValue(value, name) {
    setInput({ ...input, [name]: value })
  }

  function handleKategoriChange(e, { value }) {
    setInput({ ...input, id_kategori: value })
  }

  function addBarang() {
    console.log(input)
    if (context.getPengguna().usaha) {
      axios
        .post(
          `${HOSTNAME}/usaha/${context.getPengguna().usaha.id_usaha}/produk`,
          input,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(res => {
          props.history.push('/usaha')
        })
    }
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      {!loading ? (
        <React.Fragment>
          <Header as="h1" icon textAlign="center">
            <Icon name="box" circular />
            <Header.Content>Tambah Produk</Header.Content>
          </Header>
          <Card fluid>
            <Card.Content>
              <div style={styles.card}>
                <Form size="large">
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      id="nama"
                      label="Nama Produk"
                      onChange={event =>
                        changeValue(event.target.value, 'nama')
                      }
                      value={input.nama}
                    />
                    <Form.Field>
                      <label>Kategori</label>
                      <Dropdown
                        selection
                        id="kategori"
                        options={kumpulanKategori}
                        onChange={handleKategoriChange}
                        value={input.id_kategori}
                        placeholder="Pilih kategori"
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      id="harga"
                      label="Harga Produk"
                      icon="dollar sign"
                      iconPosition="left"
                      onChange={event =>
                        changeValue(event.target.value, 'harga')
                      }
                      value={input.harga}
                    />
                    <Form.Input
                      fluid
                      id="stok"
                      label="Stok Produk"
                      onChange={event =>
                        changeValue(event.target.value, 'stok')
                      }
                      value={input.stok}
                    />
                    <Form.Input
                      fluid
                      id="berat"
                      label="Berat Produk"
                      onChange={event =>
                        changeValue(event.target.value, 'berat')
                      }
                      value={input.berat}
                    />
                  </Form.Group>
                  <Form.TextArea
                    label="Deskripsi Produk"
                    placeholder="Deskripsi produk anda..."
                    onChange={event =>
                      changeValue(event.target.value, 'deskripsi')
                    }
                    value={input.deskripsi}
                  />
                  <Form.Input label="Gambar Produk" type="file" />
                  <Form.Button color="green" size="medium" onClick={addBarang}>
                    Tambah Produk
                  </Form.Button>
                </Form>
              </div>
            </Card.Content>
          </Card>
        </React.Fragment>
      ) : (
        <Segment>
          <Loader active inline="centered" />
        </Segment>
      )}
    </Container>
  )
}

const styles = {
  card: {
    margin: '15px 50px 10px 50px',
  },
}

export default TambahProduk
