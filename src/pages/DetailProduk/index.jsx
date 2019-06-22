import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Image,
  Grid,
  Segment,
  Button,
  Icon,
  Input,
} from 'semantic-ui-react'

class DetailProduk extends Component {
  state = {
    produk: this.props.location.state,
    jumlah: 1,
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

  render() {
    return (
      <Container>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <p>
                <Image src="https://pngimage.net/wp-content/uploads/2018/05/barang-png-2.png" />
              </p>
            </Grid.Column>
            <Grid.Column>
              <p>
                <h3> Nama Barang: {this.state.produk.nama} </h3>
                <h3> Harga: {this.state.produk.harga} </h3>
                <h3> Stok: {this.state.produk.stok} </h3>
              </p>
              <p>
                Jumlah:
                <Input
                  type="number"
                  placeholder="Jumlah"
                  value={this.state.jumlah}
                  onChange={(event, { value }) => this.changeJumlah(value)}
                  min="1"
                />
              </p>
              <Button primary fluid onClick={() => this.addKeranjang()}>
                <Icon name="shopping cart" />
                Beli
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

export default DetailProduk
