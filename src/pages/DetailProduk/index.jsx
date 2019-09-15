import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import {
  Container,
  Image,
  Grid,
  Input,
  Header,
  Divider,
  Form,
  Button
} from 'semantic-ui-react'
import axios from 'axios'

function DetailProduk(props) {
  const context = useContext(UserContext)
  console.log(context)
  const [produk] = useState(props.location.state)
  const [jumlah, setJumlah] = useState(1)

  function addKeranjang() {
    axios
      .post(
        'http://localhost:8000/keranjang',
        {
          id_produk: produk.id_produk,
          jumlah,
        },
        { headers: { Authorization: `Bearer ${context.token}` } },
      )
      .then(() => props.history.push('/keranjang'))
  }

  return (
    <Container>
      <Grid columns={2} relaxed="very">
        <Grid.Column width="8">
          <Image fluid src="https://placeimg.com/250/200/any" />
        </Grid.Column>
        <Grid.Column>
          <Header size="huge" content={produk.nama} />
          <Divider horizontal>Detail Produk</Divider>
          <Grid celled columns="3">
            <Grid.Column>
              <Header
                size="small"
                icon="dollar"
                content="Harga"
                subheader={`Rp. ${produk.harga}`}
              />
            </Grid.Column>
            <Grid.Column>
              <Header
                size="small"
                icon="box"
                content="Stok"
                subheader={produk.stok}
              />
            </Grid.Column>
            <Grid.Column>
              <Header
                size="small"
                icon="weight"
                content="Berat"
                subheader={`${produk.berat} gr`}
              />
            </Grid.Column>
          </Grid>
          <p>{produk.deskripsi}</p>

          <Divider />

          <Form>
            <Form.Field>
              <label>Jumlah</label>
              <Input
                type="number"
                placeholder="Jumlah"
                value={jumlah}
                onChange={(event, { value }) => setJumlah(value)}
                min="1"
                action={{
                  color: 'blue',
                  labelPosition: 'right',
                  icon: 'cart',
                  content: 'Beli',
                  onClick: addKeranjang,
                }}
              />
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
      <Grid columns={2} >
        <Grid.Column />
        <Grid.Column>
          <Grid columns={2} celled="internally" verticalAlign="middle">
            <Grid.Column>
                  <Header
                    size="tiny"
                    icon="warehouse"
                    content={produk.usaha.nama}
                    floated="right"
                  />
                </Grid.Column>
                <Grid.Column>
                <Button color="instagram" size="medium" floated='left'>Kunjungi Toko</Button>
              </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default DetailProduk
