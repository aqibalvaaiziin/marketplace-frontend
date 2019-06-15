import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Image,
  Grid,
  Segment,
  Button,
  Icon,
  Input
} from "semantic-ui-react";

class DetailProduct extends Component {
  state = {
    produk: {
      id_produk: null,
      nama: null,
      stok: null,
      harga: null
    },
    value: 1,
    error: false,
    loading: true
  };

  componentDidMount = () => {
    axios
      .get("https://marketplace-express.herokuapp.com/produk/1")
      .then(response => {
        this.setState({
          produk: response.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  };

  changeValue = value => {
    this.setState({
      value
    });
  };

  addToCart() {
    axios
      .post("https://marketplace-express.herokuapp.com/keranjang", {
        id_produk: this.state.produk.id_produk,
        jumlah: this.state.value
      })
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    return (
      <Container>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <p>
                <Image src="https://pngimage.net/wp-content/uploads/2018/05/barang-png-2.png" />
              </p>{" "}
            </Grid.Column>{" "}
            <Grid.Column>
              <p>
                <h3> Nama Barang: {this.state.produk.nama} </h3>{" "}
                <h3> Harga: {this.state.produk.harga} </h3>{" "}
                <h3> Stok: {this.state.produk.stok} </h3>{" "}
              </p>{" "}
              <p>
                Jumlah:
                <Input
                  type="number"
                  placeholder="Jumlah"
                  value={this.state.value}
                  onChange={(event, { value }) => this.changeValue(value)}
                  min="1"
                />
              </p>{" "}
              <Button primary fluid onClick={() => this.addToCart()}>
                <Icon name="shopping cart" />
                Add to Chart{" "}
              </Button>{" "}
            </Grid.Column>{" "}
          </Grid>{" "}
        </Segment>{" "}
      </Container>
    );
  }
}

export default DetailProduct;
