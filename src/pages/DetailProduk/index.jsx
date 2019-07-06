import React, { Component } from 'react'
import {
  Container,
  Image,
  Grid,
  Segment,
  Button,
  Icon,
  Input,
} from 'semantic-ui-react'
import axios from 'axios'

class DetailProduk extends Component {
  state = {
    produk: this.props.location.state,
    jumlah: 1,
    provinsi: [],
    kota: [],
    selectedProvinsi: null,
    selectedKota: null,
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
      .catch((err) => console.log(err))
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
              <h3> Nama Barang: {this.state.produk.nama} </h3>
              <h3> Harga: {this.state.produk.harga} </h3>
              <h3> Stok: {this.state.produk.stok} </h3>
              <h3> Berat: {this.state.produk.berat} gram</h3>
              <h3> Deskripsi:</h3> <p>{this.state.produk.deskripsi}</p>
              <p>
                Jumlah:{' '}
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
