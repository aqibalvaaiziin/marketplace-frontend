import React, { useState } from 'react'
import {
  Container,
  Image,
  Grid,
  Input,
  Header,
  Divider,
  Form,
} from 'semantic-ui-react'
import axios from 'axios'

function DetailProduk(props) {
  const [produk] = useState(props.location.state)
  const [jumlah, setJumlah] = useState(1)

  function addKeranjang() {
    axios
      .post('https://marketplace-express.herokuapp.com/keranjang', {
        id_produk: produk.id_produk,
        jumlah,
      })
      .then((response) => props.history.push('/keranjang'))
  }

  return (
    <Container>
      <Grid columns={2} celled="internally" relaxed="very">
        <Grid.Column width="8">
          <Image fluid src="https://placeimg.com/250/200/any" />
        </Grid.Column>
        <Grid.Column>
          <Header size="huge" content={produk.nama} />

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
    </Container>
  )
}

export default DetailProduk
